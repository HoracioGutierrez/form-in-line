"use client"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { useLocale, useTranslations } from "next-intl"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useParams } from "next/navigation"
import { startTransition } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"

function LangToggle() {

    const t = useTranslations("layout")
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const params = useParams()


    const handleLocaleChange = (e: any) => {
        toast.loading(t("locale.loading"), { duration: 1000 })
        const newLocale = e.currentTarget.dataset.value
        startTransition(() => {
            router.replace(
                { pathname },
                { locale: newLocale }
            )
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" className="cursor-pointer p-0" onClick={handleLocaleChange}>
                    {locale}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLocaleChange} data-value="en">
                    EN
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLocaleChange} data-value="es">
                    ES
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLocaleChange} data-value="pt">
                    PT
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LangToggle