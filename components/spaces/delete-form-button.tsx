"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { useI18n } from "@/locales/client"

function DeleteFormButton() {
    const t = useI18n()
    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? t("spaces.delete.loading") : t("spaces.delete.confirm")}
        </Button>
    )
}
export default DeleteFormButton