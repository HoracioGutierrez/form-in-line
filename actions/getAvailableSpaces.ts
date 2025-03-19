"use server"

import { prisma } from "@/prisma/prisma-client"
import { getI18n } from "@/locales/server"

export const getAvailableSpaces = async (spaceId: number, userId: number) => {
    const t = await getI18n();
    
    try {
        const spaces = await prisma.spaces.findMany({
            where: {
                id: {
                    not: spaceId
                },
                //is_active: true,
                is_deleted: false,
                users_id: {
                    not: userId
                }
            }
        })

        if (spaces.length === 0) {
            throw new Error(t("errors.no_available_spaces"));
        }

        return spaces

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error(t("errors.getting_available_spaces"));
    }
}