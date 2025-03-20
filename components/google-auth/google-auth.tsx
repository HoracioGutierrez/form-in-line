import { Button } from "../ui/button"
import { handleGoogleSignUp } from "@/actions/handleGoogleSignUp"
import GoogleIcon from "./google-icon";
import { getTranslations } from "next-intl/server";


async function GoogleAuthButton() {

    const t = await getTranslations("google")

    return (
        <Button onClick={handleGoogleSignUp} type="button">
            <GoogleIcon /> {t("auth")}
        </Button>
    )
}

export default GoogleAuthButton