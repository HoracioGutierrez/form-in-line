"use server"

import { prisma } from "@/prisma/prisma-client"
import { DateTime } from "luxon"
import { revalidatePath } from "next/cache"

export const handleTransferQueue = async (queueId: number, spaceId: number, currentUserId: number, newSpaceId: number) => {

    try {

        if (!queueId) throw new Error("Queue ID is required");
        if (!spaceId) throw new Error("Space ID is required");
        if (!currentUserId) throw new Error("Logged user ID is required");
        if (!newSpaceId) throw new Error("You haven't selected a new space to transfer the queue to. Please select a new space from the dropdown and try again.");


        /// Check if the queue exists and is active
        const queue = await prisma.queues.findUnique({
            where: {
                id: queueId,
                is_active: true
            },
            include: {
                space: {
                    select: {
                        users_id: true
                    }
                }
            }
        });

        if (!queue) {
            throw new Error("The queue you are trying to transfer does not exist or is not active anymore. Please refresh the page and try again.");
        }

        // Check if the current space exists
        const currentSpace = await prisma.spaces.findUnique({
            where: {
                id: spaceId
            }
        });

        if (!currentSpace) {
            throw new Error("The queue's space you are trying to transfer does not exist or is not active anymore. Please refresh the page and try again.");
        }

        // Check if the new space exists
        const newSpace = await prisma.spaces.findUnique({
            where: {
                id: newSpaceId
            }
        });

        if (!newSpace) {
            throw new Error("The space you are trying to transfer the queue to does not exist. Please refresh the page and try again.");
        }

        // Check if the queue has members
        const queueMembers = await prisma.queue_members.findMany({
            where: {
                queue_id: queueId,
                has_spoken: false,
            }
        });

        if (queueMembers.length === 0) {
            throw new Error("The queue you are trying to transfer does not have any members. Please add members to the queue and try again.");
        }

        // Check if the current user is the owner of the queue
        if (queue.space.users_id !== currentUserId) {
            throw new Error("You do not have permission to transfer this queue. Please contact the owner of the queue to transfer it.");
        }

        // Check if the new space belongs to a different user
        if (newSpace.users_id === currentUserId) {
            throw new Error("You cannot transfer the queue to your own spaces. Please select a different space to transfer the queue to.");
        }

        // Check if new space already has an active queue
        const newSpaceActiveQueue = await prisma.queues.findFirst({
            where: {
                space_id: newSpaceId,
                is_active: true
            },
            include: {
                space: {
                    select: {
                        users_id: true
                    }
                }
            }
        });

        const date = new Date()
        const day = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date).toLowerCase()
        const hours = new Intl.DateTimeFormat("en-GB", { hour: "numeric" }).format(date)
        const minutes = new Intl.DateTimeFormat("en-GB", { minute: "numeric" }).format(date)
        //format local time "HH:mm" to UTC time
        const localDateTime = DateTime.fromObject(
            { hour: parseInt(hours), minute: parseInt(minutes) },
            { zone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        );

        const utcForStorage = localDateTime.toUTC().toFormat("HH:mm");

        const updatedClosedQueue = await prisma.queues.update({
            where: {
                id: queue.id,
            },
            data: {
                end_at_time: utcForStorage,
                is_active: false,
                space: {
                    update: {
                        is_active: false,
                    }
                }
            },
            include: {
                space: {
                    select: {
                        users_id: true
                    }
                }
            }
        });


        if (!updatedClosedQueue) {
            throw new Error("Error updating the current queue. The transfer could not be completed. Please try again later.");
        }


        let newQueueId: number;

        if (newSpaceActiveQueue) {

            newQueueId = newSpaceActiveQueue.id;

            const highestPositionMember = await prisma.queue_members.findFirst({
                where: { queue_id: newQueueId },
                orderBy: { position: 'desc' }
            });

            const startPosition = highestPositionMember ? highestPositionMember.position + 1 : 1;

            const oldMembers = await prisma.queue_members.updateMany({
                where: {
                    queue_id: queue.id
                },
                data: {
                    is_paused: false,
                    is_current: startPosition === 1 ? true : false,
                    has_spoken: true,
                    queue_ended: true,
                    position: 0
                }
            })

            await Promise.all(queueMembers.map((member, index) => {
                return prisma.queue_members.create({
                    data: {
                        queue_id: newQueueId,
                        space_id: newSpaceId,
                        user_id: member.user_id,
                        position: startPosition + index,
                        is_current: false,
                        is_paused: member.is_paused,
                        subject: member.subject,
                    }
                })
            }))


        } else {

            const newQueue = await prisma.queues.create({
                data: {
                    space_id: newSpaceId,
                    is_active: true,
                    start_at_time: utcForStorage,
                    start_at_day: day,
                }
            });

            if (!newQueue) {
                throw new Error("Error creating the new queue for the selected space. The transfer could not be completed. Please try again later.");
            }

            newQueueId = newQueue.id;

            const oldMembers = await prisma.queue_members.updateMany({
                where: {
                    queue_id: queueId
                },
                data: {
                    is_paused: false,
                    is_current: false,
                    has_spoken: true,
                    queue_ended: true,
                    position: 0
                }
            })

            await Promise.all(queueMembers.map((member, index) => {
                return prisma.queue_members.create({
                    data: {
                        queue_id: newQueueId,
                        space_id: newSpaceId,
                        user_id: member.user_id,
                        position: member.position,
                        is_current: member.is_current,
                        is_paused: member.is_paused,
                    }
                })
            }))

        }

        revalidatePath('/spaces')

        return { success: true, message: "Queue successfully transferred" };

    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                errorMessage: error.message,
                hasError: true
            }
        }

        return {
            data: null,
            errorMessage: 'Error transferring queue. Please try again later',
            hasError: true
        }
    }
}