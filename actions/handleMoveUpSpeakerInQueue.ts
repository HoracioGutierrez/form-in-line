"use server"

import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"

export const handleMoveUpSpeakerInQueue = async (speakerId: number, queueId: number, spaceId: number) => {
    try {

        const currentSpeaker = await prisma.queue_members.findFirst({
            where: {
                id: speakerId
            },
            include : {
                space : true
            }
        })

        if (!currentSpeaker) {
            throw new Error("Speaker not found")
        }

        if (currentSpeaker.position === 1) {
            throw new Error("Speaker is already at the top of the queue")
        }

        const speakerAbove = await prisma.queue_members.findFirst({
            where: {
                queue_id: queueId,
                position: currentSpeaker.position - 1
            }
        })

        if (!speakerAbove) {
            throw new Error("Speaker above not found")
        }

        await prisma.queue_members.update({
            where: {
                id: currentSpeaker.id
            },
            data: {
                position: currentSpeaker.position - 1,
                is_current : currentSpeaker.position - 1 === 1
            }
        })

        await prisma.queue_members.update({
            where: {
                id: speakerAbove.id
            },
            data: {
                position: speakerAbove.position + 1,
                is_current : speakerAbove.position + 1 === 1
            }
        })


        revalidatePath(`/spaces/${currentSpeaker.space.slug}`)


    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Error moving up the speaker")
    }
}