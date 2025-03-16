"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useI18n } from "@/locales/client";

function AccountModalButton() {

    const { pending } = useFormStatus()
    const t = useI18n()

    return (
        <Button type="submit" disabled={pending} className="flex items-center gap-2">
            {pending && <Loader className="animate-spin" />}
            {pending ? `${t("dashboard.account-modal.buttons.loading")}...` : t("dashboard.account-modal.buttons.submit")}
        </Button>
    )
}

export default AccountModalButton