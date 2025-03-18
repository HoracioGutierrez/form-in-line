"use server"

import { prisma as client, prisma } from "@/prisma/prisma-client"

export const handleGetAllSpaces = async () => {
    try {

        const spaces = await client.spaces.findMany({
            where: {
                is_deleted: false
            },
            include: {
                spaces_activation_times: true,
                queue_members: {
                    where: {
                        has_spoken: false,
                        position : {
                            gt: 0
                        },
                        queue_ended : false
                    }
                },
                queues : {
                    where : {
                        is_active : true,
                    }
                }
            }
        })

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
            errorMessage: "An error occurred",
        }
    }
}