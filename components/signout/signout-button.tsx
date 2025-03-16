import { handleSignOut } from "@/actions/handleSignOut"
import { Button } from "../ui/button"
import { getI18n } from "@/locales/server"

async function SignOutButton() {
    
    const t = await getI18n()

    return (
        <Button variant="link" className="cursor-pointer p-0" onClick={handleSignOut}>{t("layout.links.logout")}</Button>
    )
}

export default SignOutButton