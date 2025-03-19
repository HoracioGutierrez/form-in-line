"use server";

import { prisma } from "@/prisma/prisma-client";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { getI18n } from "@/locales/server";

export const handleSignUp = async (formData: FormData) => {
    //const t = await getI18n();
    
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            //throw new Error(t("errors.email_password_required"));
            throw new Error("Email and password are required");
        }

        const supabase = await createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            //throw new Error(t("errors.signup_failed"));
            throw new Error("Sign up failed");
        }

        const newUser = await prisma.users.create({
            data: {
                email: email,
                name: email
            }
        });

        if (!newUser) {
            //throw new Error(t("errors.creating_user"));
            throw new Error("Error creating user");
        }

        redirect("/dashboard");

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        //throw new Error(t("errors.signup_generic"));
        throw new Error("Sign up failed");
    }
};