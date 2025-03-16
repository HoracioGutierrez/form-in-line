"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useI18n } from "@/locales/client";

function SpaceFormButton({ edit = false }) {

    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending} className="flex items-center gap-2" variant="outline">
            {pending && <Loader className="animate-spin" />}
            {pending ? edit ? `Editing...` : `Creating...` : edit ? "Edit space" : "Create space"}
        </Button>
    )
}
export default SpaceFormButton