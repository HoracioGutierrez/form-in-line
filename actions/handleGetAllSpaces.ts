"use server"

import { prisma as client, prisma } from "@/prisma/prisma-client"

export const handleGetAllSpaces = async (type: string, queueType: string, page: string, limit: string) => {

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
            },
            take: Number(limit),
            skip: Number(page) === 1 ? 0 : Number(page) * Number(limit) - Number(limit),
        })

        if (!spaces) {
            //throw new Error(t('errors.no_spaces_found'));
            throw new Error("No spaces found");
        }

        const spacesTotal = await client.spaces.count({
            where: whereFilters,
        })

        return {
            data: {
                spaces,
                total: spacesTotal,
            },
            hasError: false,
            errorMessage: "",
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: {
                    spaces: [],
                    total: 0,
                },
                hasError: true,
                errorMessage: error.message,
            }
        }
        return {
            data: {
                spaces: [],
                total: 0,
            },
            hasError: true,
            //errorMessage: t('errors.getting_spaces'),
            errorMessage: "Error getting spaces",
        }
    }
}