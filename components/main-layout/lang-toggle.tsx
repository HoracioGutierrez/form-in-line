"use client"
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { useTranslations } from "next-intl"

function LangToggle() {

    const changeLocale = useChangeLocale()
    const currentLocale = useCurrentLocale()
    //const t = useI18n()
    const t = useTranslations("layout")


    const handleLocaleChange = () => {
        toast.loading(t("locale.loading"), { duration: 1000 })
        changeLocale(currentLocale === "en" ? "es" : "en")
    }

    return (
        <Button variant="link" className="cursor-pointer p-0" onClick={handleLocaleChange}>
            {currentLocale === "en" ? "ES" : "EN"}
        </Button>
    )
}

export default LangToggle