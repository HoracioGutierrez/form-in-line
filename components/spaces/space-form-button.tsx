"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useI18n } from "@/locales/client";

function SpaceFormButton({ edit = false }) {
    const t = useI18n();
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="flex items-center gap-2" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending 
                ? edit 
                    ? t("spaces.form.loading_edit") 
                    : t("spaces.form.loading_create") 
                : edit 
                    ? t("spaces.form.edit") 
                    : t("spaces.form.create")
            }
        </Button>
    )
}
export default SpaceFormButton