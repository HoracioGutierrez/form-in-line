import { getI18n } from "@/locales/server"
import Image from "next/image"
import Link from "next/link"
import packageInfo from '@/package.json'
import { getTranslations } from "next-intl/server"
import { Github } from "lucide-react"

async function Footer() {
  //const t = await getI18n()
  const t = await getTranslations("layout")


  return (
    <footer className="text-xs text-center dark:text-muted text-black/20 p-2 md:p-4 flex flex-col items-center gap-2">
        <p>&copy; {new Date().getFullYear()} Next.js Boilerplate v{packageInfo.version}. {t("footer.copyright")}</p>
        <p className="inline-flex items-center gap-1">
            <Image src="/logo.svg" alt="Form In Line" width={14} height={14} className="dark:invert" />
            <span>Form In Line - {t("footer.created_by")} Horacio Gutierrez</span>
        </p>
        <Link href="https://github.com/HoracioGutierrez/form-in-line" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <Github size={14} />
            <span>GitHub</span>
        </Link>
    </footer>
  )
}

export default Footer