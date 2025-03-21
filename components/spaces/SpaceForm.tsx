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
import { handleDeleteActivationTimeFromSpace } from "@/actions/handleDeleteActivationTimeFromSpace"
import { DateTime } from "luxon"
/* import { useI18n } from "@/locales/client" */
import { useTranslations } from "next-intl"


type SpaceFormProps = {
    buttonText?: string
    edit?: boolean
    space?: spaces & {
        spaces_activation_times: spaces_activation_times[]
    }
    icon?: React.ReactNode
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

function SpaceForm({ buttonText, edit = false, space, icon, variant }: SpaceFormProps) {
    //const t = useI18n()
    const t = useTranslations("spaces")

    const defaultButtonText = t('form.create')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const initialActivationDays = space ? space.spaces_activation_times.map(time => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const localDateTime = DateTime.fromISO(time.start_time, { zone: "utc" }).setZone(userTimeZone);
        const start = localDateTime.toFormat("HH:mm");

        return {
            day: time.day_of_week,
            start: start,
            id: time.id + "",
            utcForStorage: time.start_time
        }
    }) : []
    const [activationDays, setActivationDays] = useState<ActivationDay[]>(initialActivationDays || [])

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setActivationDays([])
    }

    const handleSubmit = async (formData: FormData) => {

        if (edit && space) {
            toast.promise(handleEditSpace(formData, space.id, activationDays), {
                loading: 'Editing space...',
                success: 'Space edited',
                error: error => error.message
            })
        } else {
            toast.promise(handleCreateSpace(formData, activationDays), {
                loading: 'Creating space...',
                success: (response) => {
                    if (response.hasError) throw new Error(response.errorMessage)

                    handleCloseModal()
                    setActivationDays([])
                    return 'Space created'
                },
                error: error => error.message
            })
        }
    }

    const addActivationDay = () => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const localDateTime = DateTime.fromObject(
            { hour: 10, minute: 0 },
            { zone: userTimeZone }
        );
        const utcForStorage = localDateTime.toUTC().toFormat("HH:mm");
        const newActivationDay: ActivationDay = {
            day: "monday",
            start: "10:00",
            utcForStorage,
            id: unique()
        }
        setActivationDays([...activationDays, newActivationDay])
    }

    const removeActivationDay = async (id: string) => {
        if (edit) {
            toast.promise(handleDeleteActivationTimeFromSpace(parseInt(id)), {
                loading: 'Deleting activation time...',
                success: () => {
                    setActivationDays(activationDays.filter(day => day.id !== id))
                    return 'Activation time deleted'
                },
                error: error => error.message
            })
        } else {
            setActivationDays(activationDays.filter(day => day.id !== id))
        }
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

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const writtenHour = start.split(":")[0]
        const writtenMinute = start.split(":")[1]

        const localDateTime = DateTime.fromObject(
            { hour: parseInt(writtenHour), minute: parseInt(writtenMinute) },
            { zone: userTimeZone }
        );

        const utcForStorage = localDateTime.toUTC().toFormat("HH:mm");

        const updatedActivationDays = activationDays.map(item => {
            if (item.id === id) {
                return { ...item, start, utcForStorage }
            }
            return item
        })
        setActivationDays(updatedActivationDays)
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant={variant} data-tooltip-id="tooltip" data-tooltip-content={`${edit ? t('form.edit') : t('form.create')}`} >
                    {icon ? icon : buttonText || defaultButtonText}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {edit ? t('form.edit') : t('form.create')}
                    </DialogTitle>
                    <DialogDescription>
                        {edit ? t('form.edit_description') : t('form.create_description')}
                    </DialogDescription>
                </DialogHeader>
                <Form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>{t('form.name_label')}</Label>
                            <Input type='name' id='name' name='name' placeholder={t('form.name_placeholder')} defaultValue={edit && space ? space.name : ""} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='subject'>{t('form.subject_label')}</Label>
                            <Input type='subject' id='subject' name='subject' placeholder={t('form.subject_placeholder')} defaultValue={edit && space ? space.subject : ""} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='slug'>{t('form.url_label')}</Label>
                            <Input type='slug' id='slug' name='slug' placeholder={t('form.url_placeholder')} defaultValue={edit && space ? space.slug : unique()} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='is_active'>{t('form.activation_times')}</Label>
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
                                {t('form.add_time')}
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">{t('form.cancel')}</Button>
                        </DialogClose>
                        <SpaceFormButton edit={edit} />
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default SpaceForm