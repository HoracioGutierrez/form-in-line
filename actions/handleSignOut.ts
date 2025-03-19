"use server"

import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"

export const handleSignOut = async () => {
    const t = await getI18n();
    
    try {
        const supabase = await createClient()
        const { error } = await supabase.auth.signOut()

        if (error) {
            throw new Error(t("errors.signout_failed"))
        }

        redirect("/")

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error(t("errors.signout_generic"))
    }
}