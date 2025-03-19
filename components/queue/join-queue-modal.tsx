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
import { useI18n } from "@/locales/client"

type JoinQueueModalProps = {
    loggedUser: users
    space: spaces & {
        queue_members: any[]
        spaces_activation_times: spaces_activation_times[]
        queues: queues[]
    }
}

function JoinQueueModal({ loggedUser, space }: JoinQueueModalProps) {
    const t = useI18n()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async (formData: FormData) => {
        toast.promise(joinUserToQueueFromSpace(formData, space.id, space.queues[0].id, loggedUser.id, space.slug), {
            loading: t("spaces.queue.joining"),
            success: () => {
                handleCloseModal()
                return t("spaces.queue.joined")
            },
            error: t("spaces.queue.error_joining")
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{t("spaces.queue.join_waitlist")}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("spaces.queue.join_title")}</DialogTitle>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>{t("spaces.queue.name_label")}</Label>
                            <Input type='text' id='name' name='name' placeholder={t("spaces.queue.name_placeholder")} defaultValue={loggedUser.name || loggedUser.email} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='subject'>{t("spaces.queue.subject_label")}</Label>
                            <Textarea id='subject' name='subject' placeholder={t("spaces.queue.subject_placeholder")} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">{t("spaces.form.cancel")}</Button>
                        </DialogClose>
                        <JoinQueueButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default JoinQueueModal