import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimePickerInput } from "../ui/timepicker-input"
import { useRef, useState } from "react"
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

type ActivationTimeItemProps = {
    removeActivationDay: (id: string) => void
    id: string
    handleChangeActivationDay: (id: string, day: string) => void
    handleChangeActivationStart: (id: string, start: string) => void
    day: any
}

function ActivationTimeItem({ removeActivationDay, id, handleChangeActivationDay, handleChangeActivationStart, day }: ActivationTimeItemProps) {

    const formattedDate = new Date()
    formattedDate.setHours(day.start.split(":")[0])
    formattedDate.setMinutes(day.start.split(":")[1])

    const [date, setDates] = useState(formattedDate)
    const minuteRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);

    const setDate = (date: Date | undefined) => {
        if (date) {
            setDates(date)
            handleChangeActivationStart(id, date.getHours() + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes()))
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
            <Select onValueChange={handleDayChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Days of the week" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
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
                    hs
                </div>
            </div>
            <Button variant="outline" size="icon" className="p-0" onClick={handleRemove} type="button">
                <Trash />
            </Button>
        </div>
    )
}
export default ActivationTimeItem