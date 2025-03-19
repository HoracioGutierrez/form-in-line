import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimePickerInput } from "../ui/timepicker-input"
import { useRef, useState } from "react"
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useI18n } from "@/locales/client";
import { useTranslations } from "next-intl";

type ActivationTimeItemProps = {
    removeActivationDay: (id: string) => void
    id: string
    handleChangeActivationDay: (id: string, day: string) => void
    handleChangeActivationStart: (id: string, start: string) => void
    day: any
}

function ActivationTimeItem({ removeActivationDay, id, handleChangeActivationDay, handleChangeActivationStart, day }: ActivationTimeItemProps) {
    //const t = useI18n();
    const t = useTranslations("spaces")


    const formattedDate = new Date()
    formattedDate.setHours(day.start ? day.start.split(":")[0] : 0)
    formattedDate.setMinutes(day.start ? day.start.split(":")[1] : 0)

    const [date, setDates] = useState(formattedDate)
    const minuteRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);

    const setDate = (date: Date | undefined) => {
        if (date) {
            setDates(date)
            handleChangeActivationStart(id,
                date.getHours().toString().padStart(2, "0")
                + ":" +
                date.getMinutes().toString().padStart(2, "0")
            )
        }
    }

    const handleRemove = () => {
        removeActivationDay(id)
    }

    const handleDayChange = (day: string) => {
        handleChangeActivationDay(id, day)
    }

    return (
        <div className="flex items-center gap-2">
            <Select onValueChange={handleDayChange} defaultValue={day.day}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("form.days_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="monday">{t("form.days.monday")}</SelectItem>
                    <SelectItem value="tuesday">{t("form.days.tuesday")}</SelectItem>
                    <SelectItem value="wednesday">{t("form.days.wednesday")}</SelectItem>
                    <SelectItem value="thursday">{t("form.days.thursday")}</SelectItem>
                    <SelectItem value="friday">{t("form.days.friday")}</SelectItem>
                    <SelectItem value="saturday">{t("form.days.saturday")}</SelectItem>
                    <SelectItem value="sunday">{t("form.days.sunday")}</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex items-end gap-2 w-full">
                <div className="grid gap-1 text-center">
                    <TimePickerInput
                        picker="hours"
                        date={date}
                        setDate={setDate}
                        ref={hourRef}
                        onRightFocus={() => minuteRef.current?.focus()}
                        defaultValue={day.start_time}
                    />
                </div>
                <div className="grid gap-1 text-center">
                    <TimePickerInput
                        picker="minutes"
                        date={date}
                        setDate={setDate}
                        ref={minuteRef}
                        onLeftFocus={() => hourRef.current?.focus()}
                        onRightFocus={() => secondRef.current?.focus()}
                    />
                </div>
                <div className="flex h-10 items-center gap-1">
                    {t("form.hours_abbr")}
                </div>
            </div>
            <Button variant="outline" size="icon" className="p-0" onClick={handleRemove} type="button">
                <Trash />
            </Button>
        </div>
    )
}
export default ActivationTimeItem