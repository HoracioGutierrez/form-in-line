"use server"

import { createClient } from "@/supabase/server"

export const handleResetPassword = async (formData: FormData) => {
    try {
        const email = formData.get('email') as string

        if (!email) {
            //throw new Error("Email is required")
            return {
                data: null,
                hasError: true,
                errorMessage: "Email is required",
            }
        }

        const supabase = await createClient()

        const { error , data } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
        })

        if (error) {
            throw new Error(error.message)
        }

        return {
            data: null,
            hasError: false,
            errorMessage: null,
        }

    } catch (error) {
        if (error instanceof Error) {
            //throw new Error(error.message)
            return {
                data: null,
                hasError: true,
                errorMessage: error.message,
            }
        }

        //throw new Error("Reset password failed")
        return {
            data: null,
            hasError: true,
            errorMessage: "Reset password failed",
        }
    }
}