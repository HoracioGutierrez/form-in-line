"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useI18n } from "@/locales/client";
import { useTranslations } from "next-intl";

function SpaceFormButton({ edit = false }) {
    //const t = useI18n();
    const t = useTranslations("spaces")

    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="flex items-center gap-2" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending
                ? edit
                    ? t("form.loading_edit")
                    : t("form.loading_create")
                : edit
                    ? t("form.edit")
                    : t("form.create")
            }
        </Button>
    )
}
export default SpaceFormButton