"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"

function TransferSpaceButton() {

    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? 'Transfering...' : 'Confirm transfer'}
        </Button>
    )
}
export default TransferSpaceButton