"use server"

import { prisma } from "@/prisma/prisma-client"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"

export const handleGoogleSignUp = async () => {
    //const t = await getI18n();
    
    try {
        const supabase = await createClient()

        const { data: { user } } = await supabase.auth.getUser()
        //if (!user?.email) throw new Error(t("errors.google_login_failed"));
        if (!user?.email) throw new Error("Error getting user email from Supabase")

        const existingUser = await prisma.users.findUnique({
            where: {
                email: user.email
            }
        })

        if (existingUser) {
            redirect("/dashboard")
        }

        const newUser = await prisma.users.create({
            data: {
                email: user.email,
                name: user.user_metadata?.name || user.email
            }
        })

        //if (!newUser) throw new Error(t("errors.google_signup_failed"));
        if (!newUser) throw new Error("Error creating user in database")

        redirect("/dashboard")

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        //throw new Error(t("errors.google_auth_generic"))
        throw new Error("Error during Google authentication")
    }
}