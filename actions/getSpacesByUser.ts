"use server"

import { prisma } from "@/prisma/prisma-client"
import { getI18n } from "@/locales/server"

export const getSpacesByUser = async (userId: number) => {
    const t = await getI18n();
    
    try {
        const spaces = await prisma.spaces.findMany({
            where: {
                users_id: userId,
                is_deleted: false
            },
            include: {
                spaces_activation_times: true,
                queues: {
                    where: {
                        is_active: true
                    }
                },
                queue_members: {
                    where: {
                        queue_ended: false,
                        has_spoken: false,
                        position: {
                            gt: 0
                        }
                    },
                    orderBy: {
                        position: 'asc'
                    },
                    include: {
                        user: true
                    }
                }
            }
        })

        if (!spaces) {
            throw new Error(t("errors.no_spaces_found"));
        }

        return {
            data: spaces,
            errorMessage: "",
            hasError: false
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                errorMessage: error.message,
                hasError: true
            }
        }

        return {
            data: null,
            errorMessage: t("errors.getting_user_spaces"),
            hasError: true
        }
    }
}