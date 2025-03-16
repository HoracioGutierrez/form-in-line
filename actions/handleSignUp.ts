"use server";

import { userSchema } from "@/lib/schemas";
import client from "@/prisma/prisma-client";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export const handleSignUp = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const newUserData = { email, password };


    if (!userSchema.isValidSync(newUserData)) {
        throw new Error('Invalid user data');
    }

    const supabase = await createClient()
    const { error: authError } = await supabase.auth.signUp(newUserData);

    if (authError) {
        throw new Error(authError.message);
    }

    const newUser = await client.users.create({
        data: { email }
    })

    if (!newUser) {
        throw new Error('Error creating user profile');
    }

    return redirect("/login");
}