"use server"

import { prisma as client } from "@/prisma/prisma-client"
import { getI18n } from "@/locales/server"

export const getUserByEmail = async (email: string) => {
    const t = await getI18n();
    
    try {
        if (!email) throw new Error(t("errors.email_required"));

        const user = await client.users.findUnique({
            where: {
                email: email
            }
        })

        if (!user) throw new Error(t("errors.user_not_found"));

        return {
            data: user,
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
            errorMessage: t("errors.getting_user"),
            hasError: true
        }
    }
}