"use client";

import { Loader, Save } from "lucide-react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function UpdateUserButton() {

    const { pending } = useFormStatus()

    return (
        <Button className="flex items-center gap-2" type="submit" disabled={pending}>
            {pending ? <Loader className="animate-spin"/> : <Save />}
            {pending ? 'Guardando...' : 'Guardar'}
        </Button>
    )
}
