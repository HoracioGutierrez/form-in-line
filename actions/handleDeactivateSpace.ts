"use server"
import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"

export const handleDeactivateSpace = async (spaceId: number) => {
    try {

        const date = new Date()
        const day = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date).toLowerCase()
        const hours = new Intl.DateTimeFormat("en-GB", { hour: "numeric" }).format(date)
        const minutes = new Intl.DateTimeFormat("en-GB", { minute: "numeric" }).format(date)

        const deactivatedSpace = await prisma.spaces.update({
            where: {
                id: spaceId
            },
            data: {
                is_active: false
            }
        })

        if (!deactivatedSpace) throw new Error('Error deactivating space')

        const activeQueueForSpace = await prisma.queues.findFirst({
            where: {
                space_id: spaceId,
                is_active: true
            }
        })

        if (!activeQueueForSpace) throw new Error('Error finding active queue for space')

        const endedQueueForSpace = await prisma.queues.update({
            where : {
                space_id: spaceId,
                id : activeQueueForSpace.id
            },
            data : {
                end_at_time : `${hours}:${minutes}`,
                is_active : false,
            }
        })

        if (!endedQueueForSpace) throw new Error('Error ending queue for space')

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