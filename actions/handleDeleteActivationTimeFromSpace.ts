"use server"

import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"

export const handleDeleteActivationTimeFromSpace = async (activationTimeId: number) => {
    try {

        const deletedActivationTime = await prisma.spaces_activation_times.delete({
            where: {
                id: activationTimeId
            }
        })

        if (!deletedActivationTime) throw new Error('Error deleting activation time')

        revalidatePath('/spaces')

        return {
            data: deletedActivationTime,
            errorMessage: '',
            hasError: false
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("An error occurred while deleting the activation time from the space")
    }
}