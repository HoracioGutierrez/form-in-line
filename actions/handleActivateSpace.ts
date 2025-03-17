"use server"
import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"

export const handleActivateSpace = async (spaceId: number) => {
    try {
        const deactivatedSpace = await prisma.spaces.update({
            where: {
                id: spaceId
            },
            data: {
                is_active: true
            }
        })

        if (!deactivatedSpace) throw new Error('Error activating space')

        revalidatePath('/spaces')

        return {
            data: deactivatedSpace,
            errorMessage: '',
            hasError: false
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("An error occurred while activating the space")
    }
}