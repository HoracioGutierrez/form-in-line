import { getI18n } from "@/locales/server"
import packageInfo from '@/package.json'

async function Footer() {
  const t = await getI18n()

  return (
    <footer className="text-xs text-center dark:text-muted text-black/20 p-2 md:p-4">
        <p>&copy; {new Date().getFullYear()} Next.js Boilerplate v{packageInfo.version}. {t("layout.footer.copyright")}</p>
        <p>{t("layout.footer.created_by")} - Horacio Gutierrez</p>
    </footer>
  )
}

export default Footer