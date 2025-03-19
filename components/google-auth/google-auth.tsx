import { Button } from "../ui/button"
import { handleGoogleSignUp } from "@/actions/handleGoogleSignUp"
import GoogleIcon from "./google-icon";
import { getI18n } from "@/locales/server";
import { getTranslations } from "next-intl/server";


async function GoogleAuthButton() {

    //const t = await getI18n()
    const t = await getTranslations("google-auth")

    return (
        <Button onClick={handleGoogleSignUp} type="button">
            <GoogleIcon /> {t("")}
        </Button>
    )
}

export default GoogleAuthButton