"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Trash, ZapIcon, ZapOff } from "lucide-react"
import { useState } from "react"
import Form from "next/form"
import toast from "react-hot-toast"
import { spaces } from "@/prisma/generated/prisma-client-js"
import ActivateButton from "./activate-button"

type ActivateFormButtonProps = {
    space: spaces
}

function ActivateFormButton({ space }: ActivateFormButtonProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async () => { }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0">
                    {space.is_active ? <ZapOff /> : <ZapIcon />}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {space.is_active ? "Deactivate" : "Activate"} space : {space.name}
                    </DialogTitle>
                    <DialogDescription>Once the space is {space.is_active ? "deactivated" : "activated"}, other users can join to it's virtual wait list.</DialogDescription>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">cancel</Button>
                        </DialogClose>
                        <ActivateButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default ActivateFormButton