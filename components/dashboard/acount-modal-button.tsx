"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useI18n } from "@/locales/client";
import { useTranslations } from "next-intl";

function AccountModalButton() {

    const { pending } = useFormStatus()
    //const t = useI18n()
    const t = useTranslations("dashboard")


    return (
        <Button type="submit" disabled={pending} className="flex items-center gap-2">
            {pending && <Loader className="animate-spin" />}
            {pending ? `${t("account-modal.buttons.loading")}...` : t("account-modal.buttons.submit")}
        </Button>
    )
}

export default AccountModalButton