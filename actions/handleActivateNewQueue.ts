"use server"

import { prisma } from "@/prisma/prisma-client"
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";
import { getI18n } from "@/locales/server";

export const handleActivateNewQueue = async (spaceId: number) => {
    //const t = await getI18n();

    try {
        //if (!spaceId) throw new Error(t("errors.space_id_required"));
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
            //throw new Error(t("errors.space_not_exist_or_inactive"));
            throw new Error("Space not exist or inactive");
        }

        if (space.is_active) {
            //throw new Error(t("errors.space_already_active"));
            throw new Error("Space not exist or inactive");
        }

        if (space.queues.length > 0) {
            //throw new Error(t("errors.space_already_has_active_queue"));
            throw new Error("Space already has active queue");
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
            //throw new Error(t("errors.creating_new_queue"));
            throw new Error("Error creating new queue");
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
            //errorMessage: t("errors.activating_new_queue"),
            errorMessage: "Error activating new queue",
            data: null
        }
    }
}