import { getSpaceAndQueuesReport } from "@/actions/getSpaceAndQueuesReport"
import { getUserByEmail } from "@/actions/getUserByEmail"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DateTime } from "luxon"


async function HistoryPage() {

    const test = DateTime.fromObject({ hour: 13, minute: 30 }, { zone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    const test2 = test.toUTC().toISO()
    
    console.log("🚀 ~ HistoryPage ~ test2:", test2)
    console.log("🚀 ~ test:", test)

    const supabase = await createClient()
    const { data: authUser, error: authError } = await supabase.auth.getUser()
    const { data: loggedUser, hasError } = await getUserByEmail(authUser.user?.email || "")

    if (authError || hasError || !loggedUser) {
        return redirect("/login")
    }

    const { data: history } = await getSpaceAndQueuesReport(loggedUser.id)

    return (
        <section className="grow flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="font-bold text-2xl">History</h2>
                    <p className="text-muted-foreground">
                        The history page will show the user's history of past and present spaces as well as the time spent in each space session and the number of users that were in the space.
                    </p>
                </div>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Queue ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Space</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead>Started at (24hs)</TableHead>
                            <TableHead>Ended at (24hs)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history?.map((space, index) => {
                            return space.queues.map((queue, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{queue.id}</TableCell>
                                        <TableCell>{queue.end ? "Ended" : "Active"}</TableCell>
                                        <TableCell>{space.name}</TableCell>
                                        <TableCell>{new Intl.DateTimeFormat("en-US").format(new Date(queue.created_at))}</TableCell>
                                        <TableCell>{queue.start}</TableCell>
                                        <TableCell>{queue.end}</TableCell>
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