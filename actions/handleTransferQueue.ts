"use server"

import { prisma } from "@/prisma/prisma-client"
import { DateTime } from "luxon"
import { revalidatePath } from "next/cache"

export const handleTransferQueue = async (queueId: number, spaceId: number, currentUserId: number, newSpaceId: number) => {

    try {

        /* 
        
        - first we check if the queue, space and both current and new user exists, if not we throw an error
        - then we check if the queue is active, if not we throw an error
        - then we check if the queue is not member empty, if it is we throw an error
        - then we check if the current user is the owner of the queue, if not we throw an error
        - then we check if the new user is not the owner of the queue, if it is we throw an error
        - then we check if the new user has available active spaces to transfer the queue to, if not we throw an error
        - then we check if the new user is already a member of the queue, if it is we throw an error
        - if all checks pass, we update the queue to have a end_at_time, is_active = false and is_paused = false
        - then check if the new space has an active queue
        - if it does not, we create a new queue for the new space and add the current queue members to the new queue and update their new space id and queue id
        - if it does, we add the current queue members to the new queue and update their position based on the last queue member position
        - then we update the queue_members to have the new space id and queue id
        
        */
       

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
            throw new Error("Active queue not found");
        }

        // Check if the current space exists
        const currentSpace = await prisma.spaces.findUnique({
            where: {
                id: spaceId
            }
        });

        if (!currentSpace) {
            throw new Error("Current space not found");
        }

        // Check if the new space exists
        const newSpace = await prisma.spaces.findUnique({
            where: {
                id: newSpaceId
            }
        });

        if (!newSpace) {
            throw new Error("New space not found");
        }

        // Check if the queue has members
        const queueMembers = await prisma.queue_members.findMany({
            where: { queue_id: queueId }
        });

        if (queueMembers.length === 0) {
            throw new Error("Queue has no members to transfer");
        }

        // Check if the current user is the owner of the queue
        if (queue.space.users_id !== currentUserId) {
            throw new Error("You do not have permission to transfer this queue");
        }

        // Check if the new space belongs to a different user
        if (newSpace.users_id === currentUserId) {
            throw new Error("Cannot transfer queue to your own space");
        }

        // Check if new space already has an active queue
        const newSpaceActiveQueue = await prisma.queues.findFirst({
            where: {
                space_id: newSpaceId,
                is_active: true
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

        // Close the current queue
        await prisma.queues.update({
            where: { id: queueId },
            data: {
                end_at_time: utcForStorage,
                is_active: false,
            }
        });

        let newQueueId : number;

        // If new space doesn't have an active queue, create one
        if (!newSpaceActiveQueue) {
            const newQueue = await prisma.queues.create({
                data: {
                    space_id: newSpaceId,
                    is_active: true,
                    start_at_time: utcForStorage,
                    start_at_day: day,
                }
            });
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

            await Promise.all(queueMembers.map((member, index) =>{
                return prisma.queue_members.create({
                    data: {
                        queue_id: newQueueId,
                        space_id: newSpaceId,
                        user_id: member.user_id,
                        position: member.position,
                        is_current : member.is_current,
                        is_paused : member.is_paused,
                    }
                })
            }))
        } else {
            // If new space already has an active queue
            newQueueId = newSpaceActiveQueue.id;

            // Get the highest position in the destination queue
            const highestPositionMember = await prisma.queue_members.findFirst({
                where: { queue_id: newQueueId },
                orderBy: { position: 'desc' }
            });

            const startPosition = highestPositionMember ? highestPositionMember.position + 1 : 1;

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

            await Promise.all(queueMembers.map((member, index) =>{
                return prisma.queue_members.create({
                    data: {
                        queue_id: newQueueId,
                        space_id: newSpaceId,
                        user_id: member.user_id,
                        position: startPosition + index,
                        is_current : false,
                        is_paused : member.is_paused,
                    }
                })
            }))
        }

        revalidatePath('/spaces')

        return { success: true, message: "Queue successfully transferred" };

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("An error occurred while transferring the queue")
    }
}