"use server"

import { prisma as client, prisma } from "@/prisma/prisma-client"

export const handleGetAllSpaces = async (type: string, queueType: string) => {

    const whereFilters: { [key: string]: any } = {
        is_deleted: false,
    }

    if (type === "active") {
        whereFilters.is_active = true
    }

    if (type === "inactive") {
        whereFilters.is_active = false
    }

    if (queueType === "active") {
        whereFilters.queues = {
            some: {
                is_active: true,
            }
        }
    }

    if (queueType === "inactive") {
        whereFilters.queues = {
            every: {
                is_active: false,
            }
        }
    }

    try {

        const spaces = await client.spaces.findMany({
            where: whereFilters,
            include: {
                spaces_activation_times: true,
                queue_members: {
                    where: {
                        has_spoken: false,
                        position: {
                            gt: 0
                        },
                        queue_ended: false
                    }
                },
                queues: {
                    where: {
                        is_active: true,
                    }
                }
            }
        })
        console.log("🚀 ~ handleGetAllSpaces ~ spaces:", spaces)

        if (!spaces) {
            //throw new Error(t('errors.no_spaces_found'));
            throw new Error("No spaces found");
        }

        return {
            data: spaces,
            hasError: false,
            errorMessage: "",
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: [],
                hasError: true,
                errorMessage: error.message,
            }
        }
        return {
            data: [],
            hasError: true,
            //errorMessage: t('errors.getting_spaces'),
            errorMessage: "Error getting spaces",
        }
    }
}