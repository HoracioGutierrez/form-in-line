"use server"
import { prisma } from "@/prisma/prisma-client";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

export const handleDeleteSpace = async (spaceId: number) => {
    const t = await getTranslations("errors")

    try {
        const space = await prisma.spaces.findUnique({
            where: {
                id: spaceId
            }
        })

        if (!space) throw new Error(t('delete_space_not_found'));

        const deletedSpace = await prisma.spaces.update({
            where: {
                id: spaceId
            },
            data: {
                is_active : false,
                is_deleted: true,
                deleted_at: new Date()
            }
        })

        if (!deletedSpace) throw new Error(t('delete_space_update_failed'));

        revalidatePath("/spaces");
        return space;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error(t('deleting_space'));
    }
}