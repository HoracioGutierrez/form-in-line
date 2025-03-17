"use server"

import { prisma } from "@/prisma/prisma-client"

export const getSpaceBySlug = async (slug: string) => {
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
                queue_members : true
            }
        })

        if (!space) {
            throw new Error("Espacio no encontrado")
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
            errorMessage: "Error al obtener el espacio",
            hasError: true
        }
    }
}