"use server";

import { userSchema } from "@/lib/schemas";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export const handleSignIn = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const newUserData = { email, password };


    if (!userSchema.isValidSync(newUserData)) {
        throw new Error('Invalid user data');
    }

    const supabase = await createClient()
    const { error: authError } = await supabase.auth.signInWithPassword(newUserData);

    if (authError) {
        throw new Error(authError.message);
    }

    return redirect("/dashboard");
}