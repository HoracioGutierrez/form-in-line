"use client"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Form from "next/form"
import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "@/components/ui/textarea"
import { queues, spaces, spaces_activation_times, users } from "@/prisma/generated/prisma-client-js"
import toast from "react-hot-toast"
import { joinUserToQueueFromSpace } from "@/actions/joinUserToQueueFromSpace"
import JoinQueueButton from "./join-queue-button"

type JoinQueueModalProps = {
    loggedUser: users
    space: spaces & {
        queue_members: any[]
        spaces_activation_times: spaces_activation_times[]
        queues: queues[]
    }
}

function JoinQueueModal({ loggedUser, space }: JoinQueueModalProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async (formData: FormData) => {
        toast.promise(joinUserToQueueFromSpace(formData, space.id, space.queues[0].id, loggedUser.id, space.slug), {
            loading: "Joining the waitlist...",
            success: () => {
                handleCloseModal()
                return "Joined the waitlist"
            },
            error: "Error joining the waitlist"
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Join the waitlist</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join the wait list</DialogTitle>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input type='text' id='name' name='name' placeholder="Jhon's space" defaultValue={loggedUser.name || loggedUser.email} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='subject'>Subject</Label>
                            <Textarea id='subject' name='subject' placeholder="Math related questions" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">cancelar</Button>
                        </DialogClose>
                        <JoinQueueButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default JoinQueueModal