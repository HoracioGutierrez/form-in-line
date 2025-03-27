"use server"

import { createClient } from "@/supabase/server"

export const handleResetPasswordConfirm = async (formData: FormData) => {
    try {
        const password = formData.get('password') as string

        const supabase = await createClient()

        const { error } = await supabase.auth.updateUser({
            password: password,
        })

        if (error) {
            return {
                data: null,
                hasError: true,
                errorMessage: error.message,
            }
        }

        return {
            data: null,
            hasError: false,
            errorMessage: null,
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                hasError: true,
                errorMessage: error.message,
            }
        }

        return {
            data: null,
            hasError: true,
            errorMessage: "Reset password failed",
        }
    }
}