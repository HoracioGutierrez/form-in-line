"use server"
import { spaceSchema } from "@/lib/schemas"
import { ActivationDay } from "@/lib/types"
import { prisma as client } from "@/prisma/prisma-client"
import { createClient } from "@/supabase/server"
import { revalidatePath } from "next/cache"
import { getTranslations } from "next-intl/server"
import { ValidationError } from "yup"
import { formatError } from "@/lib/errors"

export const handleCreateSpace = async (formData: FormData, activationDays: ActivationDay[]) => {
    const t = await getTranslations("errors")

    try {
        const name = formData.get('name') as string
        const subject = formData.get('subject') as string
        const slug = formData.get('slug') as string

        const space = { name, subject, slug }

        await spaceSchema.validate(space, { abortEarly: true })

        const supabase = await createClient()

        const { data: authUser, error } = await supabase.auth.getUser()
        const loggedUser = await client.users.findFirst({
            where: {
                email: authUser.user?.email
            }
        })

        if (error) throw new Error(t("getting_user_supabase"));
        if (!loggedUser) throw new Error(t("user_not_found_db"));

        const newSpace = await client.spaces.create({
            data: {
                name: name,
                subject: subject,
                is_active: false,
                slug: slug,
                created_by: {
                    connect: {
                        email: loggedUser.email
                    }
                }
            }
        })

        if (activationDays.length > 0) {
            for (const day of activationDays) {
                await client.spaces_activation_times.create({
                    data: {
                        day_of_week: day.day,
                        start_time: day.utcForStorage,
                        space: {
                            connect: {
                                id: newSpace.id
                            }
                        }
                    }
                })
            }
        }

        if (!newSpace) throw new Error(t("creating_space_try_later"));

        revalidatePath('/spaces')

        return {
            data: newSpace,
            errorMessage: '',
            hasError: false
        }

    } catch (error) {
        if (error instanceof ValidationError) {
            return formatError({ error: t(`${error.errors[0]}`) })
        }

        if (error instanceof Error) {
            return formatError({ error: error.message })
        }

        return {
            data: null,
            errorMessage: "Error creating space",
            hasError: true
        }
    }
}