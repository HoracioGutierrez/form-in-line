"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { useI18n } from "@/locales/client"

type ActivateButtonProps = {
    isActive: boolean
}

function ActivateButton({ isActive }: ActivateButtonProps) {
    const t = useI18n()
    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending 
                ? isActive 
                    ? t("spaces.activate.deactivating_button") 
                    : t("spaces.activate.activating_button")
                : isActive 
                    ? t("spaces.activate.deactivate_button") 
                    : t("spaces.activate.activate_button")
            }
        </Button>
    )
}
export default ActivateButton