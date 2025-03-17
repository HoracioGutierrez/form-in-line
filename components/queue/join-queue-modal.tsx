"use client"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Form from "next/form"
import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "@/components/ui/textarea"
import { users } from "@/prisma/generated/prisma-client-js"

type JoinQueueModalProps = {
    loggedUser: users
}

function JoinQueueModal({ loggedUser }: JoinQueueModalProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async (formData: FormData) => {
        handleCloseModal()
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
                        <Button type="submit">Join the wait list</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default JoinQueueModal