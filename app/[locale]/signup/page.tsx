import { handleSignUp } from '@/actions/handleSignUp';
import GoogleAuthButton from '@/components/google-auth/google-auth';
import SignUpButton from '@/components/signup/signup-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getI18n } from '@/locales/server';
import type { Metadata } from "next";
import Form from 'next/form'

export const metadata: Metadata = {
    title : "Sign Up",
}

async function SignupPage() {

    const t = await getI18n()

    return (
        <section className="grow flex flex-col justify-center items-center">
            <h2 className="mb-16 font-bold text-2xl">{t("signup.title")}</h2>
            <Form action={handleSignUp} className="max-w-sm w-full flex gap-4 flex-col">
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='email'>{t("signup.email.label")}</Label>
                    <Input type='email' id='email' name='email' placeholder={t("signup.email.placeholder")} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='password'>{t("signup.password.label")}</Label>
                    <Input type='password' id='password' name="password" placeholder={t("signup.password.placeholder")} />
                </div>
                <SignUpButton />
                <GoogleAuthButton/>
            </Form>
        </section>
    )
}

export default SignupPage