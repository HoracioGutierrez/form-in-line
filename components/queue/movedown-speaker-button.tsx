"use client"

import { ArrowDown, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"

function MoveDownSpeakerButton() {

    const { pending } = useFormStatus()
    return (
        <Button type="submit" variant="ghost" data-tooltip-id="tooltip" data-tooltip-content="Bajar de posición">
            {pending ? <Loader className="animate-spin" /> : <ArrowDown />}
        </Button>
    )
}
export default MoveDownSpeakerButton