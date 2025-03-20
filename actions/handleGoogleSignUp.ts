"use server"

import { prisma } from "@/prisma/prisma-client"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"

export const handleGoogleSignUp = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL
        }
    })

    if (error) {
        throw new Error(error.message)
    }

    if (data.url) {
        redirect(data.url)
    }
}