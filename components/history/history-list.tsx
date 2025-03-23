import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSpaceAndQueuesReport } from "@/actions/getSpaceAndQueuesReport"
import { getTranslations } from "next-intl/server"
import { DateTime } from "luxon"
import PaginationFilter from "../spaces/pagination-filter"

type HistoryListProps = {
    userId: number
    type: string
    queueType: string
    page?: string
    limit?: string
}

async function HistoryList({ userId, type = "all", queueType = "all", page = "1", limit = "10" }: HistoryListProps) {

    const { data: { /* report: history, */ total, queues } } = await getSpaceAndQueuesReport(userId, page, limit)
    console.log("🚀 ~ HistoryList ~ total:", total)
    const t = await getTranslations("history")

    const formatFromUTC = (date: string | null) => {
        if (!date) return t("not_available")
        const localDateTime = DateTime.fromISO(date, { zone: "utc" }).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        return localDateTime.toFormat("HH:mm")
    }

    const calculateDuration = (start: string | null, end: string | null) => {
        if (!start || !end) return t("not_available")
        const startDateTime = DateTime.fromISO(start, { zone: "utc" });
        const endDateTime = DateTime.fromISO(end, { zone: "utc" });
        const duration = endDateTime.diff(startDateTime, ["hours", "minutes"]);
        return t("duration_format", { hours: duration.hours, minutes: duration.minutes })
    }

    return (
        <div className="overflow-x-auto grow flex flex-col">
            <Table className="grow">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">{t("table.queue_id")}</TableHead>
                        <TableHead>{t("table.status")}</TableHead>
                        <TableHead>{t("table.space")}</TableHead>
                        <TableHead>{t("table.created_at")}</TableHead>
                        <TableHead>{t("table.started_at")}</TableHead>
                        <TableHead>{t("table.ended_at")}</TableHead>
                        <TableHead>{t("table.duration")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {queues.map((queue, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{queue.id}</TableCell>
                                <TableCell>{!queue.is_active ? t("status.ended") : t("status.active")}</TableCell>
                                <TableCell>{queue.space.name}</TableCell>
                                <TableCell>{new Intl.DateTimeFormat("en-US").format(new Date(queue.created_at))}</TableCell>
                                <TableCell>{formatFromUTC(queue.start_at_time)}</TableCell>
                                <TableCell>{formatFromUTC(queue.end_at_time)}</TableCell>
                                <TableCell>{calculateDuration(queue.start_at_time, queue.end_at_time)}</TableCell>
                            </TableRow>
                        )
                    })
                    }
                </TableBody>
            </Table>
            <PaginationFilter dataLength={total} />
        </div>
    )
}
export default HistoryList