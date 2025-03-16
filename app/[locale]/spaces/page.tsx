import SpaceForm from "@/components/spaces/SpaceForm"
import SpacesList from "@/components/spaces/SpacesList"
import { getI18n } from "@/locales/server"
import { createClient } from "@/supabase/server"

async function SpacesPage() {

  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  const t = await getI18n()

  return (
    <section className="grow flex flex-col">
      <h2 className="font-bold text-2xl mb-10">{t("spaces.title")}</h2>
      <SpacesList />
    </section>
  )
}
export default SpacesPage