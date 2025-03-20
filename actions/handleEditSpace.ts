"use server"

import { spaceSchema } from "@/lib/schemas"
import { ActivationDay } from "@/lib/types"
import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"
import { getI18n } from "@/locales/server"
import { getTranslations } from "next-intl/server"
import { ValidationError } from "yup"

export const handleEditSpace = async (formData: FormData, spaceId: number, activationDays: ActivationDay[]) => {
    const t = await getTranslations("errors")


    try {
        const name = formData.get('name') as string
        const subject = formData.get('subject') as string
        const slug = formData.get('slug') as string

        const space = { name, subject, slug }

        await spaceSchema.validate(space, { abortEarly: true })

        const editedSpace = await prisma.spaces.update({
            where: {
                id: spaceId
            },
            data: {
                name: name,
                subject: subject,
                slug: slug
            }
        })

        if (activationDays.length > 0) {
            for (const day of activationDays) {
                if (isNaN(parseInt(day.id))) {
                    await prisma.spaces_activation_times.create({
                        data: {
                            day_of_week: day.day,
                            start_time: day.utcForStorage,
                            space_id: spaceId,
                        }
                    })
                } else {
                    await prisma.spaces_activation_times.update({
                        where: {
                            id: parseInt(day.id)
                        },
                        data: {
                            day_of_week: day.day,
                            start_time: day.utcForStorage
                        }
                    })
                }

            }
        }

        if (!editedSpace) throw new Error(t('errors.editing_space'));

        revalidatePath('/spaces')

        return {
            data: editedSpace,
            errorMessage: '',
            hasError: false
        }

    } catch (error) {
        if (error instanceof ValidationError) {
            return {
                data: null,
                errorMessage: t(`${error.errors[0]}`),
                hasError: true
            }
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        //throw new Error(t("errors.editing_space_generic"))
        throw new Error("Error editing space")
    }
}