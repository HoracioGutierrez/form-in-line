"use server"

import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"

export const joinUserToQueueFromSpace = async (formData: FormData, spaceId: number, queueId: number, userId: number, slug: string) => {
    try {

        const subject = formData.get('subject') as string
        const name = formData.get('name') as string

        const user = await prisma.users.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("User not found")
        }

        const queue = await prisma.queues.findFirst({
            where : {
                id: queueId,
                space_id: spaceId,
                is_active: true
            }
        })

        if (!queue) {
            throw new Error("No active queue found for this space.")
        }

        if(user.email !== name) {
            await prisma.users.update({
                where: {
                    id: userId
                },
                data: {
                    name: name
                }
            })
        }

        const currentQueueMembers = await prisma.queue_members.findMany({
            where: {
                space_id: spaceId,
                queue_id: queueId,
                has_spoken: false,
                position: {
                    gt: 0
                },
                queue: {
                    is_active: true
                },
                space: {
                    is_active: true
                }
            },
        })

        if (!currentQueueMembers || currentQueueMembers.length === 0) {
            await prisma.queue_members.create({
                data: {
                    position: 1,
                    space_id: spaceId,
                    queue_id: queueId,
                    user_id: userId,
                    is_current: true,
                    subject: subject,
                }
            })
        } else {
            const lastPosition = currentQueueMembers.reduce((acc, member) => {
                if (member.position > acc) {
                    return member.position
                }
                return acc
            }, 0)

            await prisma.queue_members.create({
                data: {
                    position: lastPosition + 1,
                    space_id: spaceId,
                    queue_id: queueId,
                    user_id: userId,
                    subject: subject
                }
            })
        }

        revalidatePath("/spaces/" + slug)

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Error joining the waitlist")
    }
}