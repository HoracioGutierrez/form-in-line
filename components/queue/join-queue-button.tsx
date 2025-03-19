"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { useI18n } from "@/locales/client"
import { useTranslations } from "next-intl"

function JoinQueueButton() {
    //const t = useI18n()
    const t = useTranslations("spaces")

    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? t("queue.joining_button") : t("queue.join_button")}
        </Button>
    )
}
export default JoinQueueButton