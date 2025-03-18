"use server"

import { prisma } from "@/prisma/prisma-client"
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";

export const handleActivateNewQueue = async (spaceId: number) => {
    try {

        if (!spaceId) throw new Error("Space ID is required");

        /// Check if the queue exists and is active
        const space = await prisma.spaces.findUnique({
            where: {
                id: spaceId,
            },
            include: {
                queues: {
                    where: {
                        is_active: true,
                    }
                }
            }
        })

        if (!space) {
            throw new Error("The space you are trying to activate a new queue for does not exist or is not active anymore. Please refresh the page and try again.");
        }

        if (space.is_active) {
            throw new Error("The space is already active. Please refresh the page and try again.");
        }

        if (space.queues.length > 0) {
            throw new Error("The space already has an active queue. Please refresh the page and try again.");
        }

        const date = new Date()
        const day = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date).toLowerCase()
        const hours = new Intl.DateTimeFormat("en-GB", { hour: "numeric" }).format(date)
        const minutes = new Intl.DateTimeFormat("en-GB", { minute: "numeric" }).format(date)
        //format local time "HH:mm" to UTC time
        const localDateTime = DateTime.fromObject(
            { hour: parseInt(hours), minute: parseInt(minutes) },
            { zone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        );

        const utcForStorage = localDateTime.toUTC().toFormat("HH:mm");

        // Create a new queue
        const newQueue = await prisma.queues.create({
            data: {
                space_id: spaceId,
                is_active: true,
                start_at_day: day,
                start_at_time: utcForStorage,
                /* user_activator_id : 1 */
            }
        })

        if (!newQueue) {
            throw new Error("An error occurred while creating the new queue. Please refresh the page and try again.");
        }

        revalidatePath(`/spaces/${spaceId}`)

        return {
            data: newQueue,
            hasError: false,
            errorMessage: ""
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                hasError: true,
                errorMessage: error.message,
                data: null
            }
        }

        return {
            hasError: true,
            errorMessage: "An error occurred while activating the new queue",
            data: null
        }
    }
}