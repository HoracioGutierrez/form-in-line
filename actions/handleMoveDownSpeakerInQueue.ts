"use server"

import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"

export const handleMoveDownSpeakerInQueue = async (speakerId: number, queueId: number, spaceId: number) => {
    try {

        //speaker position should be less than the highest member position in the queue
        //interchange the positions of the current speaker and the speaker below it

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

        const highestMember = await prisma.queue_members.findFirst({
            where: {
                queue_id: queueId,
            },
            orderBy: {
                position: 'desc'
            }
        })

        if (!highestMember) {
            throw new Error("Highest member not found")
        }

        if (currentSpeaker.position === highestMember.position) {
            throw new Error("Speaker is already at the bottom of the queue")
        }

        const speakerBelow = await prisma.queue_members.findFirst({
            where: {
                queue_id: queueId,
                position: currentSpeaker.position + 1
            }
        })

        if (!speakerBelow) {
            throw new Error("Speaker below not found")
        }

        await prisma.queue_members.update({
            where: {
                id: currentSpeaker.id
            },
            data: {
                position: currentSpeaker.position + 1,
                is_current : currentSpeaker.position + 1 === 1
            }
        })

        await prisma.queue_members.update({
            where: {
                id: speakerBelow.id
            },
            data: {
                position: speakerBelow.position - 1,
                is_current : speakerBelow.position - 1 === 1
            }
        })

        revalidatePath(`/spaces/${currentSpeaker.space.slug}`)

    } catch (error) {
        console.log("🚀 ~ handleMoveDownSpeakerInQueue ~ error:", error)
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Error moving up the speaker")
    }
}