"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Loader, Trash } from "lucide-react"
import { useState } from "react"
import Form from "next/form"
import { spaces } from "@/prisma/generated/prisma-client-js"
import toast from "react-hot-toast"
import { handleDeleteSpace } from "@/actions/handleDeleteSpace"
import DeleteFormButton from "./delete-form-button"

type DeleteSpaceButtonProps = {
    space: spaces
}

function DeleteSpaceButton({ space }: DeleteSpaceButtonProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async () => {
        toast.promise(handleDeleteSpace(space.id), {
            loading: 'Deleting space...',
            success: () => {
                handleCloseModal()
                return 'Space deleted successfully'
            },
            error: error => error.message
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0">
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete space : {space.name}
                    </DialogTitle>
                    <DialogDescription>Once the space is deleted, all of its data will be lost.</DialogDescription>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">cancel</Button>
                        </DialogClose>
                        <DeleteFormButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteSpaceButton