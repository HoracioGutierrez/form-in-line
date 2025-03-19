"use server"

import { prisma } from "@/prisma/prisma-client"
import { getI18n } from "@/locales/server"

export const getSpaceAndQueuesReport = async (userId: number) => {
    const t = await getI18n();

    try {
        const spaces = await prisma.spaces.findMany({
            where : {
                users_id : userId,
                is_deleted : false
            },
            include : {
                queues : {
                    include : {
                        queue_members : true,
                    },
                    orderBy : {
                        created_at : "desc"
                    }
                }
            }
        })

        if(!spaces) {
            throw new Error(t("errors.no_spaces_found"));
        }

        const report = spaces.map(space => {
            const queues = space.queues.map(queue => {
                return {
                    id : queue.id,
                    users : queue.queue_members.length,
                    start : queue.start_at_time,
                    end : queue.end_at_time,
                    day : queue.start_at_day,
                    created_at : queue.created_at
                }
            })

            return {
                id : space.id,
                name : space.name,
                users : space.queues.reduce((acc, queue) => acc + queue.queue_members.length, 0),
                queues
            }
        })
    
        return {
            errorMessage: "",
            hasError: false,
            data : report
        }

    } catch (error) {
        if(error instanceof Error) {
            return {
                errorMessage: error.message,
                hasError: true,
                data : null
            }
        }

        return {
            errorMessage: t("errors.getting_space_report"),
            hasError: true,
            data : null
        }
    }
}