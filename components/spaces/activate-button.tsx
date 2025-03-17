"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"

type ActivateButtonProps = {
    isActive: boolean
}

function ActivateButton({ isActive }: ActivateButtonProps) {

    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? isActive ? "Deactivating" : "Activating" : isActive ? "Deactivate" : "Activate"}
        </Button>
    )
}
export default ActivateButton