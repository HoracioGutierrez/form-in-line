"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { ZapIcon, ZapOff } from "lucide-react"
import { useState } from "react"
import Form from "next/form"
import toast from "react-hot-toast"
import { spaces } from "@/prisma/generated/prisma-client-js"
import ActivateButton from "./activate-button"
import { handleDeactivateSpace } from "@/actions/handleDeactivateSpace"
import { handleActivateSpace } from "@/actions/handleActivateSpace"

type ActivateFormButtonProps = {
    space: spaces
}

function ActivateFormButton({ space }: ActivateFormButtonProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async () => {
        if (space.is_active) {
            toast.promise(handleDeactivateSpace(space.id), {
                loading: 'Deactivating space...',
                success: () => {
                    handleCloseModal()
                    return 'Space deactivated'
                },
                error: error => error.message
            })
        } else {
            toast.promise(handleActivateSpace(space.id), {
                loading: 'Activating space...',
                success: () => {
                    handleCloseModal()
                    return 'Space activated'
                },
                error: error => error.message
            })
        }
    }

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
                    <DialogDescription>Once the space is {space.is_active ? "deactivated" : "activated"}, {space.is_active ? "other users won't be able to join to it's virtual wait list" : "other users can join to it's virtual wait list."}</DialogDescription>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">cancel</Button>
                        </DialogClose>
                        <ActivateButton isActive={space.is_active} />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default ActivateFormButton