"use client"
import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"

function NextSpeakerButton() {

    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? "Changing speaker..." : "Next Speaker"}
        </Button>
    )
}
export default NextSpeakerButton