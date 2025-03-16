"use client"

import { Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"

function DeleteFormButton() {

    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? 'Deleting...' : 'Confirm delete'}
        </Button>
    )
}
export default DeleteFormButton