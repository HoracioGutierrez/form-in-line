"use server"
import { spaces } from "@/prisma/generated/prisma-client-js";
import { prisma } from "@/prisma/prisma-client";
import { revalidatePath } from "next/cache";
import { getI18n } from "@/locales/server"

export const handleNextSpeaker = async (space: spaces) => {
    //const t = await getI18n();
    
    try {

        const queueMembers = await prisma.queue_members.findMany({
            where: {
                space_id: space.id,
                queue: {
                    is_active: true
                },
                space: {
                    is_active: true
                }
            },
            orderBy: {
                position: "asc"
            }
        })

        if (queueMembers.length === 0) {
            //throw new Error(t("errors.no_queue_members"))
            throw new Error("No queue members found")
        }

        const currentSpeaker = await prisma.queue_members.findFirst({
            where: {
                space_id: space.id,
                is_current: true,
                position: 1,
                has_spoken: false
            }
        })

        if (!currentSpeaker) {
            //throw new Error(t("errors.no_current_speaker"))
            throw new Error("No current speaker found")
        }

        const removedCurrentSpeaker = await prisma.queue_members.update({
            where: {
                id: currentSpeaker.id
            },
            data: {
                is_current: false,
                position: 0,
                has_spoken: true
            }
        })

        const nextSpeaker = await prisma.queue_members.findFirst({
            where: {
                space_id: space.id,
                is_current: false,
                position: 2
            }
        })

        if (nextSpeaker) {
            const updatedSpeakers = await prisma.queue_members.updateMany({
                where: {
                    space_id: space.id,
                    position: {
                        gt: 1
                    }
                },
                data: {
                    position: {
                        decrement: 1
                    }
                }
            })

            const updatedNextSpeaker = await prisma.queue_members.update({
                where: {
                    id: nextSpeaker.id
                },
                data: {
                    is_current: true,
                }
            })
        }

        
        revalidatePath(`/spaces/${space.slug}`)

    } catch (error) {
        console.log("🚀 ~ handleNextSpeaker ~ error:", error)
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        //throw new Error(t("errors.next_speaker_generic"))
        throw new Error("Error moving to next speaker")
    }
}