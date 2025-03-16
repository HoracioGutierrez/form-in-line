import { handleSignIn } from "@/actions/handleSignIn"
import GoogleAuthButton from "@/components/google-auth/google-auth"
import SignInButton from "@/components/signin/signin-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getI18n } from "@/locales/server"
import Form from "next/form"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title : "Sign In",
}


async function LoginPage() {

    const t = await getI18n()

    return (
        <section className="grow flex flex-col justify-center items-center">
            <h2 className="mb-16 font-bold text-2xl">{t("signin.title")}</h2>
            <Form action={handleSignIn} className="max-w-sm w-full flex gap-4 flex-col">
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='email'>{t("signin.email.label")}</Label>
                    <Input type='email' id='email' name='email' placeholder={t("signin.email.placeholder")} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='password'>{t("signin.password.label")}</Label>
                    <Input type='password' id='password' name="password" placeholder={t("signin.password.placeholder")} />
                </div>
                <SignInButton />
                <GoogleAuthButton/>
            </Form>
        </section>
    )
}

export default LoginPage