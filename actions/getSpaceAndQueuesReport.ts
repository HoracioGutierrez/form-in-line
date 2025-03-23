"use server"

import { prisma } from "@/prisma/prisma-client"
import { getI18n } from "@/locales/server"

export const getSpaceAndQueuesReport = async (userId: number, page: string, limit: string) => {
    //const t = await getI18n();

    try {
        /* const spaces = await prisma.spaces.findMany({
            where: {
                users_id: userId,
                is_deleted: false
            },
            include: {
                queues: {
                    include: {
                        queue_members: true,
                    },
                    orderBy: {
                        created_at: "desc"
                    }
                }
            },
            take: Number(limit),
            skip: Number(page) === 1 ? 0 : Number(page) * Number(limit) - Number(limit)
        })

        if (!spaces) {
            //throw new Error(t("errors.no_spaces_found"));
            throw new Error("No spaces found");
        } */

        /* const report = spaces.map(space => {
            const queues = space.queues.map(queue => {
                return {
                    id: queue.id,
                    users: queue.queue_members.length,
                    start: queue.start_at_time,
                    end: queue.end_at_time,
                    day: queue.start_at_day,
                    created_at: queue.created_at
                }
            })

            return {
                id: space.id,
                name: space.name,
                users: space.queues.reduce((acc, queue) => acc + queue.queue_members.length, 0),
                queues
            }
        }) */

        const queues = await prisma.queues.findMany({
            where: {
                space: {
                    users_id: userId,
                    is_deleted: false
                }
            },
            include: {
                queue_members: true,
                space: true,
            },
            orderBy: {
                created_at: "desc"
            },
            take: Number(limit),
            skip: Number(page) === 1 ? 0 : Number(page) * Number(limit) - Number(limit)
        })
    
        const queuesTotal = await prisma.queues.count({
            where: {
                space: {
                    users_id: userId,
                    is_deleted: false
                }
            }
        })

        return {
            errorMessage: "",
            hasError: false,
            data: {
                /* report, */
                queues,
                total: queuesTotal 
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                errorMessage: error.message,
                hasError: true,
                data: {
                    /* report: [], */
                    total: 0,
                    queues: []
                }
            }
        }

        return {
            //errorMessage: t("errors.getting_space_report"),
            errorMessage: "Error getting space report",
            hasError: true,
            data: {
                /* report: [], */
                total: 0,
                queues: []
            }
        }
    }
}