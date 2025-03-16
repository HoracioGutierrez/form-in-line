"use server"

import { spaceSchema } from "@/lib/schemas"
import { prisma } from "@/prisma/prisma-client"
import { revalidatePath } from "next/cache"

export const handleEditSpace = async (formData: FormData, spaceId: number, activationDays: any) => {
    try {

        const name = formData.get('name') as string
        const subject = formData.get('subject') as string
        const slug = formData.get('slug') as string

        const space = { name, subject, slug }

        if (!spaceSchema.isValidSync(space)) throw new Error('Invalid space data');


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
                await prisma.spaces_activation_times.update({
                    where: {
                        id: parseInt(day.id)
                    },
                    data: {
                        day_of_week: day.day,
                        start_time: day.start
                    }
                })
            }
        }

        if (!editedSpace) throw new Error('Error editing space');

        revalidatePath('/spaces')

        return {
            data: editedSpace,
            errorMessage: '',
            hasError: false
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("An error occurred while editing the space")
    }
}