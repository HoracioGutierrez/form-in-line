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
import { useTranslations } from "next-intl"

type JoinQueueModalProps = {
    loggedUser: users
    space: spaces & {
        queue_members: any[]
        spaces_activation_times: spaces_activation_times[]
        queues: queues[]
    }
}

function JoinQueueModal({ loggedUser, space }: JoinQueueModalProps) {
    //const t = useI18n()
    const t = useTranslations("spaces")

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async (formData: FormData) => {
        toast.promise(joinUserToQueueFromSpace(formData, space.id, space.queues[0].id, loggedUser.id, space.slug), {
            loading: t("queue.joining"),
            success: () => {
                handleCloseModal()
                return t("queue.joined")
            },
            error: t("queue.error_joining")
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{t("queue.join_waitlist")}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("queue.join_title")}</DialogTitle>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>{t("queue.name_label")}</Label>
                            <Input type='text' id='name' name='name' placeholder={t("queue.name_placeholder")} defaultValue={loggedUser.name || loggedUser.email} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='subject'>{t("queue.subject_label")}</Label>
                            <Textarea id='subject' name='subject' placeholder={t("queue.subject_placeholder")} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">{t("form.cancel")}</Button>
                        </DialogClose>
                        <JoinQueueButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default JoinQueueModal