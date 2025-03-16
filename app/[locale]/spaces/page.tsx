import SpaceItemSkeleton from "@/components/spaces/space-item-skeleton"
import SpaceForm from "@/components/spaces/SpaceForm"
import SpacesList from "@/components/spaces/SpacesList"
import { getI18n } from "@/locales/server"
import { createClient } from "@/supabase/server"
import { Suspense } from "react"

async function SpacesPage() {

  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const t = await getI18n()

  return (
    <section className="grow flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-2xl">{t("spaces.title")}</h2>
        {data.user && <SpaceForm />}
      </div>
      <Suspense fallback={<SpaceItemSkeleton />}>
        <SpacesList />
      </Suspense>
    </section>
  )
}
export default SpacesPage