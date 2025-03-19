import SpaceItemSkeleton from "@/components/spaces/space-item-skeleton"
import SpaceForm from "@/components/spaces/SpaceForm"
import SpacesList from "@/components/spaces/SpacesList"
/* import { getI18n, getStaticParams } from "@/locales/server" */
import { createClient } from "@/supabase/server"
/* import { setStaticParamsLocale } from "next-international/server" */
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

/* export function generateStaticParams() {
  return getStaticParams()
} */

async function SpacesPage(/* { params }: { params: Promise<{ locale: string }> } */) {
  /* const { locale } = await params
  setStaticParamsLocale(locale) */
  const t = await getTranslations("spaces")
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  /* const t = await getI18n() */

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
      <Suspense fallback={<SpaceItemSkeleton />}>
        <SpacesList />
      </Suspense>
    </section>
  )
}
export default SpacesPage