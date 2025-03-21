"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Form from "next/form"
import { useEffect, useState } from "react"
import { ArrowLeftRight } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { getAvailableSpaces } from "@/actions/getAvailableSpaces"
import { spaces } from "@/prisma/generated/prisma-client-js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TransferSpaceButton from "./transfer-space-button"
import toast from "react-hot-toast"
import { handleTransferQueue } from "@/actions/handleTransferQueue"
import { useTranslations } from "next-intl"

type TransferSpaceFormProps = {
    spaceId: number
    userId: number
    queueId: number
}

function TransferSpaceForm({ spaceId, userId, queueId }: TransferSpaceFormProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [availableSpaces, setAvailableSpaces] = useState<spaces[]>([])
    const [selectedSpace, setSelectedSpace] = useState("")
    const t = useTranslations("tooltip")

    const handleGetAvailableSpaces = async () => {
        const spaces = await getAvailableSpaces(spaceId, userId)
        if (spaces) {
            setAvailableSpaces(spaces)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleToggleModal = () => {
        const newState = !isModalOpen
        if (newState) {
            handleGetAvailableSpaces()
        }
        setIsModalOpen(newState)
    }

    const handleChange = (value: string) => {
        setSelectedSpace(value)
    }

    const handleSubmit = async () => {
        // Handle form submission logic here
        console.log("Selected space", selectedSpace)
        toast.promise(handleTransferQueue(queueId, spaceId, userId, parseInt(selectedSpace)), {
            loading: "Transferring queue...",
            success: (response) => {
                
                if (response.hasError) throw new Error(response.errorMessage)

                handleCloseModal()
                return "Queue transferred successfully"
            },
            error: error => error.message
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleToggleModal}>
            <DialogTrigger asChild>
                <Button variant="ghost" data-tooltip-id="tooltip" data-tooltip-content={t("queue.transfer")}>
                    <ArrowLeftRight />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Transfer remaining queue</DialogTitle>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>New space</Label>
                            <Select onValueChange={handleChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select new space" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableSpaces.map((space) => {
                                        return (
                                            <SelectItem key={space.id} value={space.id.toString()}>
                                                {space.name}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">cancelar</Button>
                        </DialogClose>
                        <TransferSpaceButton />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default TransferSpaceForm