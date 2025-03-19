"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useI18n } from "@/locales/client";
import { useTranslations } from "next-intl";

function SignUpButton() {

    const { pending } = useFormStatus()
    //const t = useI18n()
    const t = useTranslations("signup")


    return (
        <Button disabled={pending}>
            {pending && <Loader className="animate-spin" />}
            {pending ? `${t("button-loading")}...` : t("button")}
        </Button>
    )
}

export default SignUpButton