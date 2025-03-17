"use client"

import { ArrowUp, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"

function MoveUpSpeakerButton() {

    const { pending } = useFormStatus()
    return (
        <Button type="submit" variant="ghost">
            {pending ? <Loader className="animate-spin" /> : <ArrowUp />}
        </Button>
    )
}
export default MoveUpSpeakerButton