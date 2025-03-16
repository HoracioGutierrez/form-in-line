"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useI18n } from "@/locales/client";

function SignInButton() {

    const { pending } = useFormStatus()
    const t = useI18n()

    return (
        <Button disabled={pending}>
            {pending && <Loader className="animate-spin" />}
            {pending ? t("signin.button-loading") : t("signin.button")}
        </Button>
    )
}

export default SignInButton