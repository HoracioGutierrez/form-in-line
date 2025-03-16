"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Form from "next/form"
import { useRef, useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SpaceFormButton from "./space-form-button"
import toast from "react-hot-toast"
import { handleCreateSpace } from "@/actions/handleCreateSpace"
import unique from "unique-slug"
import { spaces, spaces_activation_times } from "@/prisma/generated/prisma-client-js"
import { handleEditSpace } from "@/actions/handleEditSpace"
import { Plus } from "lucide-react"
import ActivationTimeItem from "./activation-time-item"
import { ActivationDay } from "@/lib/types"


type SpaceFormProps = {
    buttonText?: string
    edit?: boolean
    space?: spaces & {
        spaces_activation_times: spaces_activation_times[]
    }
    icon?: React.ReactNode
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

function SpaceForm({ buttonText = 'create space', edit = false, space, icon, variant }: SpaceFormProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const initialActivationDays = space ? space.spaces_activation_times.map(time => {
        return {
            day: time.day_of_week,
            start: time.start_time,
            id: time.id + ""
        }
    }) : []
    const [activationDays, setActivationDays] = useState<ActivationDay[]>(initialActivationDays || [])

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async (formData: FormData) => {
        handleCloseModal()
        if (edit && space) {
            toast.promise(handleEditSpace(formData, space.id, activationDays), {
                loading: 'Editing space...',
                success: 'Space edited',
                error: error => error.message
            })
        } else {
            toast.promise(handleCreateSpace(formData, activationDays), {
                loading: 'Creating space...',
                success: () => {
                    setActivationDays([])
                    return 'Space created'
                },
                error: error => error.message
            })
        }
    }

    const addActivationDay = () => {
        const newActivationDay: ActivationDay = {
            day: "",
            start: "",
            id: unique()
        }
        setActivationDays([...activationDays, newActivationDay])
    }

    const removeActivationDay = (id: string) => {
        setActivationDays(activationDays.filter(day => day.id !== id))
    }

    const handleChangeActivationDay = (id: string, day: string) => {
        const updatedActivationDays = activationDays.map(item => {
            if (item.id === id) {
                return { ...item, day }
            }
            return item
        })
        setActivationDays(updatedActivationDays)
    }

    const handleChangeActivationStart = (id: string, start: string) => {
        const updatedActivationDays = activationDays.map(item => {
            if (item.id === id) {
                return { ...item, start }
            }
            return item
        })
        setActivationDays(updatedActivationDays)
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
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='is_active'>Activation Times</Label>
                            {activationDays.map((day, index) => (
                                <ActivationTimeItem
                                    key={index}
                                    id={day.id}
                                    day={day}
                                    removeActivationDay={removeActivationDay}
                                    handleChangeActivationDay={handleChangeActivationDay}
                                    handleChangeActivationStart={handleChangeActivationStart}
                                />
                            ))}
                            <Button type="button" variant="outline" onClick={addActivationDay}>
                                <Plus />
                                add time
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">cancelar</Button>
                        </DialogClose>
                        <SpaceFormButton edit={edit} />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default SpaceForm