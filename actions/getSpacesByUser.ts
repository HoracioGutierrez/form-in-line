"use server"

import { prisma } from "@/prisma/prisma-client"

export const getSpacesByUser = async (userId: number) => {
    try {

        const spaces = await prisma.spaces.findMany({
            where: {
                users_id: userId,
                is_deleted: false
            },
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
                }
            }
        })

        return {
            hasError: false,
            errorMessage: "",
            data: spaces
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                hasError: true,
                errorMessage: error.message,
                data: null
            }
        }

        return {
            hasError: true,
            errorMessage: "An error occurred",
            data: null
        }
    }
}