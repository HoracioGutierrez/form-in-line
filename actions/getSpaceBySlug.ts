"use server"

import { prisma } from "@/prisma/prisma-client"
import { getI18n } from "@/locales/server"

export const getSpaceBySlug = async (slug: string) => {
    //const t = await getI18n();
    
    try {
        const space = await prisma.spaces.findFirst({
            where: {
                slug : slug,
            },
            include : {
                spaces_activation_times : true,
                queues : {
                    where : {
                        is_active : true
                    }
                },
                queue_members : {
                    where : {
                        queue_ended : false,
                        has_spoken : false,
                        position : {
                            gt : 0
                        }
                    },
                    orderBy : {
                        position : 'asc'
                    },
                    include : {
                        user : true
                    }
                }
            }
        })

        if (!space) {
            //throw new Error(t("errors.space_not_found"))
            throw new Error("Space not found")
        }

        return {
            data: space,
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
            //errorMessage: t("errors.getting_space"),
            errorMessage: "Error getting space",
            hasError: true
        }
    }
}