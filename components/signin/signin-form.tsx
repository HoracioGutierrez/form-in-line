"use client"

import { handleSignIn } from "@/actions/handleSignIn"
import Form from "next/form"
import { useState } from "react"

type SignInFormProps = {
    children?: React.ReactNode
}

function SignInForm({ children }: SignInFormProps) {

    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (formData: FormData) => {
        const { data, hasError, errorMessage } = await handleSignIn(formData)
        setHasError(hasError)
        setErrorMessage(errorMessage)
    }

    return (
        <Form action={handleSubmit} className="max-w-sm w-full flex gap-4 flex-col">
            {hasError && (
                <div className="text-red-500 text-sm mb-4">
                    {errorMessage}
                </div>
            )}
            {children}
        </Form>
    )
}
export default SignInForm