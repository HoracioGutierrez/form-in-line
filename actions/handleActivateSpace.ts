"use server"
import { prisma } from "@/prisma/prisma-client"
import { DateTime } from "luxon"
import { revalidatePath } from "next/cache"

export const handleActivateSpace = async (spaceId: number) => {
    try {

        const date = new Date()
        const day = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date).toLowerCase()
        const hours = new Intl.DateTimeFormat("en-GB", { hour: "numeric" }).format(date)
        //const minutes = new Intl.DateTimeFormat("en-GB", { minute: "numeric" }).format(date)
        const minutes = new Intl.DateTimeFormat("en-GB", { minute: "2-digit" }).format(date)

        const localDateTime = DateTime.fromObject(
            { hour: parseInt(hours), minute: parseInt(minutes) },
            { zone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        );

        const utcForStorage = localDateTime.toUTC().toFormat("HH:mm")

        const activatedSpace = await prisma.spaces.update({
            where: {
                id: spaceId
            },
            data: {
                is_active: true,
            },
        })

        if (!activatedSpace) throw new Error('Error activating space')

        const newQueueForSpace = await prisma.queues.create({
            data: {
                //start_at_time: `${hours}:${minutes}`,
                start_at_time: utcForStorage,
                is_active: true,
                start_at_day: day,
                space_id: spaceId
            }
        })

        if (!newQueueForSpace) throw new Error('Error creating queue for space')

        revalidatePath('/spaces')

        return {
            data: activatedSpace,
            errorMessage: '',
            hasError: false
        }
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("An error occurred while activating the space")
    }
}