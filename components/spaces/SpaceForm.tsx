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
import { handleEditSpace } from "@/actions/handleEditSpace"

type SpaceFormProps = {
    buttonText?: string
    edit?: boolean
    space?: spaces
    icon?: React.ReactNode
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

function SpaceForm({ buttonText = 'create space', edit = false, space, icon, variant }: SpaceFormProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async (formData: FormData) => {
        handleCloseModal()
        if (edit && space) {
            toast.promise(handleEditSpace(formData, space.id), {
                loading: 'Editing space...',
                success: 'Space edited',
                error: error => error.message
            })
        } else {
            toast.promise(handleCreateSpace(formData), {
                loading: 'Creating space...',
                success: 'Space created',
                error: error => error.message
            })
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant={variant}>{icon ? icon : buttonText}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {edit ? 'Edit space' : 'Create new space'}
                    </DialogTitle>
                    <DialogDescription>
                        {edit ? 'Edit the space details. Once this is done, changes will be reflected' : "Once the space is created, you can share it's URL with someone else"}
                    </DialogDescription>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input type='name' id='name' name='name' placeholder="Jhon's space" defaultValue={edit && space ? space.name : ""} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='subject'>Subject</Label>
                            <Input type='subject' id='subject' name='subject' placeholder="Mathematics revision" defaultValue={edit && space ? space.subject : ""} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='slug'>Custom URL</Label>
                            <Input type='slug' id='slug' name='slug' placeholder="jhon-math-revision" defaultValue={edit && space ? space.slug : unique()} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">cancelar</Button>
                        </DialogClose>
                        <SpaceFormButton edit={edit}/>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default SpaceForm