"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { useI18n } from "@/locales/client"
import { useTranslations } from "next-intl"

type ActivateButtonProps = {
    isActive: boolean
}

function ActivateButton({ isActive }: ActivateButtonProps) {
    const t = useTranslations("spaces")
    //const t = useI18n()
    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending
                ? isActive
                    ? t("activate.deactivating_button")
                    : t("activate.activating_button")
                : isActive
                    ? t("activate.deactivate_button")
                    : t("activate.activate_button")
            }
        </Button>
    )
}
export default ActivateButton