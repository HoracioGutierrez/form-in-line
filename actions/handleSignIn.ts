"use server"

import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"

export const handleSignIn = async (formData: FormData) => {
    //const t = await getI18n();

    try {
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (!email || !password) {
            //throw new Error(t("errors.email_password_required"))
            throw new Error("Email and password are required")
        }

        const supabase = await createClient()
        
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            //throw new Error(t("errors.invalid_credentials"))
            //throw new Error("Invalid credentials")
            return {
                data : null,
                hasError : true,
                errorMessage : error.message
            }
        }

        redirect("/dashboard")

    } catch (error) {
        if (error instanceof Error) {
            //throw new Error(error.message)
            return {
                data : null,
                hasError : true,
                errorMessage : error.message
            }
        }

        //throw new Error(t("errors.signin_failed"))
        //throw new Error("Sign in failed")
        return {
            data : null,
            hasError : true,
            errorMessage : "Sign in failed"
        }
    }
}