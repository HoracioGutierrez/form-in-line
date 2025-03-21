"use client"

import { ArrowUp, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { useTranslations } from "next-intl"

function MoveUpSpeakerButton() {
    
    const t = useTranslations("tooltip")
    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="ghost" data-tooltip-id="tooltip" data-tooltip-content={t("queue.up")}>
            {pending ? <Loader className="animate-spin" /> : <ArrowUp />}
        </Button>
    )
}
export default MoveUpSpeakerButton