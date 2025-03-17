"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"

function JoinQueueButton() {

    const { pending } = useFormStatus()
    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? "Joining" : "Join the waitlist"}
        </Button>
    )
}
export default JoinQueueButton