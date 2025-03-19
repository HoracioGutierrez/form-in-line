"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { useI18n } from "@/locales/client"
import { useTranslations } from "next-intl"

function DeleteFormButton() {
    //const t = useI18n()
    const t = useTranslations("spaces")

    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? t("delete.loading") : t("delete.confirm")}
        </Button>
    )
}
export default DeleteFormButton