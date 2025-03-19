"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { useI18n } from "@/locales/client"

function JoinQueueButton() {
    const t = useI18n()
    const { pending } = useFormStatus()
    
    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? t("spaces.queue.joining_button") : t("spaces.queue.join_button")}
        </Button>
    )
}
export default JoinQueueButton