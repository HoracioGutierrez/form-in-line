import { handleSignOut } from "@/actions/handleSignOut"
import { Button } from "../ui/button"
import { getI18n } from "@/locales/server"
import { getTranslations } from "next-intl/server"

async function SignOutButton() {
    
    //const t = await getI18n()
    const t = await getTranslations("layout")


    return (
        <Button variant="link" className="cursor-pointer p-0" onClick={handleSignOut}>{t("links.logout")}</Button>
    )
}

export default SignOutButton