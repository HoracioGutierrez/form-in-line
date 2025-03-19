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
import { useI18n } from "@/locales/client"

type DeleteSpaceButtonProps = {
    space: spaces
}

function DeleteSpaceButton({ space }: DeleteSpaceButtonProps) {
    const t = useI18n();
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => setIsModalOpen(false)

    const handleSubmit = async () => {
        toast.promise(handleDeleteSpace(space.id), {
            loading: t("spaces.delete.deleting"),
            success: () => {
                handleCloseModal()
                return t("spaces.delete.success")
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
                        {t("spaces.delete.title", {name: space.name})}
                    </DialogTitle>
                    <DialogDescription>{t("spaces.delete.description")}</DialogDescription>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">{t("spaces.form.cancel")}</Button>
                        </DialogClose>
                        <DeleteFormButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteSpaceButton