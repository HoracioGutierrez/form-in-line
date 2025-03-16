"use server"

import { prisma } from "@/prisma/prisma-client";
import { revalidatePath } from "next/cache";

export const handleDeleteSpace = async (spaceId: number) => {
    try {

        const space = await prisma.spaces.findUnique({
            where: {
                id: spaceId
            }
        })

        if (!space) throw new Error('Error deleting space. Space not found');

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

        if (!deletedSpace) throw new Error('Error deleting space. Space could not be updated');

        revalidatePath("/spaces");
        return space;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error('Error creating space');
    }
}