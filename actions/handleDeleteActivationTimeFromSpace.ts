"use server"

import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"
import { getI18n } from "@/locales/server"

export const handleDeleteActivationTimeFromSpace = async (activationTimeId: number) => {
    const t = await getI18n();
    
    try {
        const deletedActivationTime = await prisma.spaces_activation_times.delete({
            where: {
                id: activationTimeId
            }
        })

        if (!deletedActivationTime) throw new Error(t('errors.deleting_activation_time'))

        revalidatePath('/spaces')

        return {
            data: deletedActivationTime,
            errorMessage: '',
            hasError: false
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error(t("errors.deleting_activation_time_generic"))
    }
}