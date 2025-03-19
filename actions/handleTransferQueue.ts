"use server"

import { prisma } from "@/prisma/prisma-client"
import { DateTime } from "luxon"
import { revalidatePath } from "next/cache"
import { getI18n } from "@/locales/server"

export const handleTransferQueue = async (queueId: number, spaceId: number, currentUserId: number, newSpaceId: number) => {
    const t = await getI18n();

    try {

        if (!queueId) throw new Error(t("errors.queue_id_required"));
        if (!spaceId) throw new Error(t("errors.space_id_required"));
        if (!currentUserId) throw new Error(t("errors.logged_user_id_required"));
        if (!newSpaceId) throw new Error(t("errors.new_space_id_required"));


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
            throw new Error(t("errors.queue_not_found_or_inactive"));
        }

        // Check if the current space exists
        const currentSpace = await prisma.spaces.findUnique({
            where: {
                id: spaceId
            }
        });

        if (!currentSpace) {
            throw new Error(t("errors.current_space_not_found_or_inactive"));
        }

        // Check if the new space exists
        const newSpace = await prisma.spaces.findUnique({
            where: {
                id: newSpaceId
            }
        });

        if (!newSpace) {
            throw new Error(t("errors.new_space_not_found"));
        }

        // Check if the queue has members
        const queueMembers = await prisma.queue_members.findMany({
            where: {
                queue_id: queueId,
                has_spoken: false,
            }
        });

        if (queueMembers.length === 0) {
            throw new Error(t("errors.queue_no_members"));
        }

        // Check if the current user is the owner of the queue
        if (queue.space.users_id !== currentUserId) {
            throw new Error(t("errors.no_permission_to_transfer_queue"));
        }

        // Check if the new space belongs to a different user
        if (newSpace.users_id === currentUserId) {
            throw new Error(t("errors.cannot_transfer_to_own_space"));
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
            throw new Error(t("errors.updating_current_queue"));
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
                throw new Error(t("errors.creating_new_queue"));
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

        return { success: true, message: t("success.queue_transferred") };

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
            errorMessage: t("errors.transferring_queue_generic"),
            hasError: true
        }
    }
}