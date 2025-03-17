"use server"
import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"

export const handleDeactivateSpace = async (spaceId: number) => {
    try {
        const deactivatedSpace = await prisma.spaces.update({
            where: {
                id: spaceId
            },
            data: {
                is_active: false
            }
        })

        if (!deactivatedSpace) throw new Error('Error deactivating space')

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

        throw new Error("An error occurred while deactivating the space")
    }
}