"use server"

import { prisma } from "@/prisma/prisma-client"

export const getAvailableSpaces = async (spaceId: number, userId: number) => {
    try {

        const spaces = await prisma.spaces.findMany({
            where: {
                id: {
                    not: spaceId
                },
                //is_active: true,
                is_deleted: false,
                users_id: {
                    not: userId
                }
            }
        })

        if (spaces.length === 0) {
            throw new Error("No available spaces found")
        }

        return spaces

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("An error occurred while getting available spaces")
    }
}