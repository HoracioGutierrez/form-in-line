"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Form from "next/form"
import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SpaceFormButton from "./space-form-button"
import toast from "react-hot-toast"
import { handleCreateSpace } from "@/actions/handleCreateSpace"
import unique from "unique-slug"
import { spaces } from "@/prisma/generated/prisma-client-js"

type SpaceFormProps = {
    buttonText?: string
    edit?: boolean
    space?: spaces
}

function SpaceForm({ buttonText = 'create space', edit = false, space }: SpaceFormProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async (formData: FormData) => {
        handleCloseModal()
        toast.promise(handleCreateSpace(formData), {
            loading: 'Creating space...',
            success: 'Space created',
            error: error => error.message
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button>{buttonText}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new space</DialogTitle>
                    <DialogDescription>Once the space is created, you can share it's URL with someone else</DialogDescription>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input type='name' id='name' name='name' placeholder="Jhon's space" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='subject'>Subject</Label>
                            <Input type='subject' id='subject' name='subject' placeholder="Mathematics revision" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='slug'>Custom URL</Label>
                            <Input type='slug' id='slug' name='slug' placeholder="jhon-math-revision" defaultValue={edit ? "" : unique()} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button">cancelar</Button>
                        </DialogClose>
                        <SpaceFormButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default SpaceForm