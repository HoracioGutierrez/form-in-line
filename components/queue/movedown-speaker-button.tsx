"use client"

import { ArrowDown, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { useTranslations } from "next-intl"

function MoveDownSpeakerButton() {

    const { pending } = useFormStatus()
    const t = useTranslations("tooltip")

    return (
        <Button type="submit" variant="ghost" data-tooltip-id="tooltip" data-tooltip-content={t("queue.down")}>
            {pending ? <Loader className="animate-spin" /> : <ArrowDown />}
        </Button>
    )
}
export default MoveDownSpeakerButton