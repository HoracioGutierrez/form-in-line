"use server";
import { users } from "@/prisma/generated/prisma-client-js";
import client from "@/prisma/prisma-client";

export const getUsers = async () => {
    try {
        const result: users[] = await client.users.findMany()

        return {
            data: result,
            hasError: false,
            errorMessage: "",
        }
    } catch (error) {

        if (error instanceof Error) {
            return {
                data: [],
                hasError: true,
                errorMessage: error.message,
            }
        }

        return {
            data: [],
            hasError: true,
            errorMessage: "An error occurred while fetching data",
        }

    }

}