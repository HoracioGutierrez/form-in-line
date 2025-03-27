"use client"

import { handleResetPassword } from "@/actions/handleResetPassword"
import Form from "next/form"
import { useState } from "react"

type ForgotPasswordFormProps = {
    children?: React.ReactNode
}

function ForgotPasswordForm({ children }: ForgotPasswordFormProps) {

    const [hasEmailSent, setHasEmailSent] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        const { hasError } = await handleResetPassword(formData)

        if (!hasError) {
            setHasEmailSent(true)
        }
    }

    return (
        <Form action={handleSubmit} className="max-w-sm w-full flex gap-4 flex-col">
            {hasEmailSent && (
                <div className="text-green-500 text-sm mb-4 text-center">
                    Check your email for the reset password link.
                </div>
            )}
            {children}
        </Form>
    )
}
export default ForgotPasswordForm