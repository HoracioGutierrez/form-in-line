import SpaceFilters from "@/components/spaces/space-filters"
import SpaceItemSkeleton from "@/components/spaces/space-item-skeleton"
import SpaceForm from "@/components/spaces/SpaceForm"
import SpacesList from "@/components/spaces/SpacesList"
import { loadSearchParams } from "@/lib/searchParams"
import { createClient } from "@/supabase/server"
import { getTranslations } from "next-intl/server"
import { SearchParams } from "nuqs/server"
import { Suspense } from "react"

type SpaceProps = {
  searchParams: Promise<SearchParams>
}

async function SpacesPage({ searchParams }: SpaceProps) {
  const t = await getTranslations("spaces")
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const { type, queueType, page, limit } = await loadSearchParams(searchParams)

  return (
    <section className="grow flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-bold text-2xl">{t("title")}</h2>
          <p className="text-muted-foreground">
            {t("description")}
          </p>
        </div>
        {data.user && <SpaceForm />}
      </div>
      <SpaceFilters />
      <Suspense
        key={type}
        fallback={(
          <div className="flex flex-col gap-4">
            <SpaceItemSkeleton />
            <SpaceItemSkeleton />
            <SpaceItemSkeleton />
            <SpaceItemSkeleton />
          </div>
        )}>
        <SpacesList type={type} queueType={queueType} page={page} limit={limit} />
      </Suspense>
    </section>
  )
}
export default SpacesPage