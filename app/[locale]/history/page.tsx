import { getSpaceAndQueuesReport } from "@/actions/getSpaceAndQueuesReport"
import { getUserByEmail } from "@/actions/getUserByEmail"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"
import HistoryList from "@/components/history/history-list"
import { loadSearchParams } from "@/lib/searchParams"
import { SearchParams } from "nuqs/server"

type HistoryProps = {
    searchParams: Promise<SearchParams>
}

async function HistoryPage({ searchParams }: HistoryProps) {

    const supabase = await createClient()
    const { data: authUser, error: authError } = await supabase.auth.getUser()
    const { data: loggedUser, hasError } = await getUserByEmail(authUser.user?.email || "")
    const t = await getTranslations("history")
    const { type, queueType, page, limit } = await loadSearchParams(searchParams)

    if (authError || hasError || !loggedUser) {
        return redirect("/login")
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
            <Suspense fallback={"loading..."} key={type}>
                <HistoryList userId={loggedUser.id} type={type} queueType={queueType} page={page} limit={limit} />
            </Suspense>
        </section>
    )
}
export default HistoryPage