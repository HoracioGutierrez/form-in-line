import { getSpaceAndQueuesReport } from "@/actions/getSpaceAndQueuesReport"
import { getUserByEmail } from "@/actions/getUserByEmail"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DateTime } from "luxon"
import { getI18n } from "@/locales/server"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    const t = await getI18n();
    return {
        title: t("history.metadata_title"),
    };
}

async function HistoryPage() {
    const t = await getI18n()
    
    const supabase = await createClient()
    const { data: authUser, error: authError } = await supabase.auth.getUser()
    const { data: loggedUser, hasError } = await getUserByEmail(authUser.user?.email || "")

    if (authError || hasError || !loggedUser) {
        return redirect("/login")
    }

    const { data: history } = await getSpaceAndQueuesReport(loggedUser.id)

    const formatFromUTC = (date: string | null) => {
        if (!date) return t("history.not_available")
        const localDateTime = DateTime.fromISO(date, { zone: "utc" }).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        return localDateTime.toFormat("HH:mm")
    }

    const calculateDuration = (start: string | null, end: string | null) => {
        if (!start || !end) return t("history.not_available")
        const startDateTime = DateTime.fromISO(start, { zone: "utc" });
        const endDateTime = DateTime.fromISO(end, { zone: "utc" });
        const duration = endDateTime.diff(startDateTime, ["hours", "minutes"]);
        return t("history.duration_format", {hours: duration.hours, minutes: duration.minutes})
    }

    return (
        <section className="grow flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="font-bold text-2xl">{t("history.title")}</h2>
                    <p className="text-muted-foreground">
                        {t("history.description")}
                    </p>
                </div>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">{t("history.table.queue_id")}</TableHead>
                            <TableHead>{t("history.table.status")}</TableHead>
                            <TableHead>{t("history.table.space")}</TableHead>
                            <TableHead>{t("history.table.created_at")}</TableHead>
                            <TableHead>{t("history.table.started_at")}</TableHead>
                            <TableHead>{t("history.table.ended_at")}</TableHead>
                            <TableHead>{t("history.table.duration")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history?.map((space, index) => {
                            return space.queues.map((queue, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{queue.id}</TableCell>
                                        <TableCell>{queue.end ? t("history.status.ended") : t("history.status.active")}</TableCell>
                                        <TableCell>{space.name}</TableCell>
                                        <TableCell>{new Intl.DateTimeFormat("en-US").format(new Date(queue.created_at))}</TableCell>
                                        <TableCell>{formatFromUTC(queue.start)}</TableCell>
                                        <TableCell>{formatFromUTC(queue.end)}</TableCell>
                                        <TableCell>{calculateDuration(queue.start, queue.end)}</TableCell>
                                    </TableRow>
                                )
                            })
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}
export default HistoryPage