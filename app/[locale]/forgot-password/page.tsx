import ForgotPasswordForm from "@/components/signin/forgot-password-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getTranslations } from "next-intl/server"

async function ForgotPasswordPage() {

    const t = await getTranslations("signin")

    return (
        <section className="grow flex flex-col justify-center items-center">
            <h2 className="mb-16 font-bold text-2xl">Reset Password</h2>
            <ForgotPasswordForm>
                <p className="text-muted mb-8">Provide the email for the account you want to reset the password of</p>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='email'>{t("email.label")}</Label>
                    <Input type='email' id='email' name="email" placeholder={t("email.placeholder")} />
                </div>
                <Button>
                    Send reset email
                </Button>
            </ForgotPasswordForm>
        </section>
    )
}
export default ForgotPasswordPage