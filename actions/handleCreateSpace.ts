"use server"
import { spaceSchema } from "@/lib/schemas"
import { ActivationDay } from "@/lib/types"
import { prisma as client } from "@/prisma/prisma-client"
import { createClient } from "@/supabase/server"
import { revalidatePath } from "next/cache"

export const handleCreateSpace = async (formData: FormData, activationDays: ActivationDay[]) => {
    try {
        const name = formData.get('name') as string
        const subject = formData.get('subject') as string
        const slug = formData.get('slug') as string

        const space = { name, subject, slug }

        if (!spaceSchema.isValidSync(space)) throw new Error('Invalid space data');

        const supabase = await createClient()

        const { data: authUser, error } = await supabase.auth.getUser()
        const loggedUser = await client.users.findFirst({
            where: {
                email: authUser.user?.email
            }
        })

        if (error) throw new Error(error.message);
        if (!loggedUser) throw new Error('User not found');

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

        if(activationDays.length > 0) {
            for (const day of activationDays) {
                await client.spaces_activation_times.create({
                    data : {
                        day_of_week : day.day,
                        start_time : day.start,
                        space : {
                            connect : {
                                id : newSpace.id
                            }
                        }
                    }
                })
            }
        }

        if (!newSpace) throw new Error('Error creating space');

        revalidatePath('/spaces')

        return {
            data: newSpace,
            errorMessage: '',
            hasError: false
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error('Error creating space');
    }
}