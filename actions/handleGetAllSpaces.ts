"use server"

import { prisma as client, prisma } from "@/prisma/prisma-client"
import { getI18n } from "@/locales/server"

export const handleGetAllSpaces = async () => {
    //const t = await getI18n();
    
    try {

        const spaces = await client.spaces.findMany({
            where: {
                is_deleted: false
            },
            include: {
                spaces_activation_times: true,
                queue_members: {
                    where: {
                        has_spoken: false,
                        position : {
                            gt: 0
                        },
                        queue_ended : false
                    }
                },
                queues : {
                    where : {
                        is_active : true,
                    }
                }
            }
        })

        if (!spaces) {
            //throw new Error(t('errors.no_spaces_found'));
            throw new Error("No spaces found");
        }

        return {
            data: spaces,
            hasError: false,
            errorMessage: "",
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: [],
                hasError: true,
                errorMessage: error.message,
            }
        }
        return {
            data: [],
            hasError: true,
            //errorMessage: t('errors.getting_spaces'),
            errorMessage: "Error getting spaces",
        }
    }
}