import { getI18n } from "@/locales/server"
import packageInfo from '@/package.json'
import { getTranslations } from "next-intl/server"

async function Footer() {
  //const t = await getI18n()
  const t = await getTranslations("layout")


  return (
    <footer className="text-xs text-center dark:text-muted text-black/20 p-2 md:p-4">
        <p>&copy; {new Date().getFullYear()} Next.js Boilerplate v{packageInfo.version}. {t("footer.copyright")}</p>
        <p>{t("footer.created_by")} - Horacio Gutierrez</p>
    </footer>
  )
}

export default Footer