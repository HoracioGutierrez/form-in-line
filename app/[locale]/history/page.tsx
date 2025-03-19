import { getSpaceAndQueuesReport } from "@/actions/getSpaceAndQueuesReport"
import { getUserByEmail } from "@/actions/getUserByEmail"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DateTime } from "luxon"
import { getI18n, getStaticParams } from "@/locales/server"
import { setStaticParamsLocale } from "next-international/server"
import { getTranslations } from "next-intl/server"

/* export function generateStaticParams() {
  return getStaticParams()
}
 */

async function HistoryPage(/* { params }: { params: Promise<{ locale: string }> } */) {
    /* const { locale } = await params
    setStaticParamsLocale(locale) */
    
    const supabase = await createClient()
    const { data: authUser, error: authError } = await supabase.auth.getUser()
    const { data: loggedUser, hasError } = await getUserByEmail(authUser.user?.email || "")
    /* const t = await getI18n() */
    const t = await getTranslations("history")

    if (authError || hasError || !loggedUser) {
        return redirect("/login")
    }

    const { data: history } = await getSpaceAndQueuesReport(loggedUser.id)

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
        return t("duration_format", {hours: duration.hours, minutes: duration.minutes})
    }

    return (
        <section className="grow flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="font-bold text-2xl">{t("title")}</h2>
                    <p className="text-muted-foreground">
                        {t("description")}
                    </p>
                </div>
            </div>
            <div>
                <Table>
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
                        {history?.map((space, index) => {
                            return space.queues.map((queue, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{queue.id}</TableCell>
                                        <TableCell>{queue.end ? t("status.ended") : t("status.active")}</TableCell>
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