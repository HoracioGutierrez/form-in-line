"use server"

import { userWithProfile } from "@/lib/schemas"
import client from "@/prisma/prisma-client"
import { createClient } from "@/supabase/server"
import { revalidatePath } from "next/cache"

export const handleEditAccountDetails = async (formData: FormData) => {
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const first_name = formData.get('first_name') as string
    const last_name = formData.get('last_name') as string
    const userWithNewData = { email, phone, first_name, last_name }

    const t = userWithProfile.isValidSync(userWithNewData)

    if (!userWithProfile.isValidSync(userWithNewData)) {
        throw new Error('Invalid user data');
    }


    const supabase = await createClient()
    const { data : authUser , error } = await supabase.auth.updateUser({
        data: { email, phone, first_name, last_name }
    })

    if (error) {
        throw new Error(error.message);
    }

    const updatedUser = await client.users.update({
        where: { email },
        data: { name: first_name }
    })

    if (!updatedUser) {
        throw new Error('Error updating user profile');
    }

    return revalidatePath("/dashboard");

}