"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import { useState } from "react"
import Form from "next/form"
import { spaces } from "@/prisma/generated/prisma-client-js"
import toast from "react-hot-toast"
import { handleDeleteSpace } from "@/actions/handleDeleteSpace"
import DeleteFormButton from "./delete-form-button"
import { useTranslations } from "next-intl"

type DeleteSpaceButtonProps = {
    space: spaces
}

function DeleteSpaceButton({ space }: DeleteSpaceButtonProps) {
    const t = useTranslations("spaces")
    const q = useTranslations("tooltip")

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async () => {
        toast.promise(handleDeleteSpace(space.id), {
            loading: t("delete.deleting"),
            success: () => {
                handleCloseModal()
                return t("delete.success")
            },
            error: error => error.message
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0" data-tooltip-id="tooltip" data-tooltip-content={q("queue.deleteSpace")}>
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t("delete.title", { name: space.name })}
                    </DialogTitle>
                    <DialogDescription>{t("delete.description")}</DialogDescription>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">{t("form.cancel")}</Button>
                        </DialogClose>
                        <DeleteFormButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteSpaceButton