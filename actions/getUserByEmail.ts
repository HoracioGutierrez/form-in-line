"use server"

import { prisma } from "@/prisma/prisma-client"

export const getUserByEmail = async (email: string) => {
    try {

        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("User not found")
        }

        return {
            data: user,
            errorMessage: "",
            hasError: false
        }

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
            errorMessage: "An error occurred while fetching user by email",
            hasError: true
        }
    }
}