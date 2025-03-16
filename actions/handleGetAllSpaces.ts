"use server"

import { prisma as client } from "@/prisma/prisma-client"

export const handleGetAllSpaces = async () => {
    try {
        const spaces = await client.spaces.findMany({ where: { is_deleted: false }, include: { spaces_activation_times: true } })
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