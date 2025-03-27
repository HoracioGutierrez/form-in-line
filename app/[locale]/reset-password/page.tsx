import { handleResetPasswordConfirm } from "@/actions/handleResetPasswordConfirm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getTranslations } from "next-intl/server"
import Form from "next/form"
import { redirect } from "next/navigation"

async function ResetPasswordPage() {

    const t = await getTranslations("signin")

    const handleSubmit = async (formData: FormData) => {
        "use server"
        const { hasError } = await handleResetPasswordConfirm(formData)

        if (hasError) {
            // Handle error (e.g., show a message to the user)
            console.error("Error resetting password")
        } else {
            // Handle success (e.g., redirect to login page or show a success message)
            console.log("Password reset successfully")
            redirect("/dashboard")
        }
    }

    return (
        <section className="grow flex flex-col justify-center items-center">
            <h2 className="mb-16 font-bold text-2xl">Reset Password</h2>
            <Form action={handleSubmit} className="max-w-sm w-full flex gap-4 flex-col">
                <p className="text-muted mb-8">Provide your new password</p>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='password'>New Password</Label>
                    <Input type='password' id='password' name='password' placeholder={"New Password"} />
                </div>
                <Button>
                    Confirm
                </Button>
            </Form>
        </section>
    )
}
export default ResetPasswordPage