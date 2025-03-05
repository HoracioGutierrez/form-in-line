import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { updateUserName } from "../actions";
import UpdateUserButton from "@/components/account/UpdateUserButton";

export default async function AccountPage() {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const handleSubmit = async (data: FormData) => {
        "use server";
        const nombre = data.get("nombre");
        updateUserName(nombre as string);
    }

    return (
        <div>
            <form action={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        defaultValue={user.email || ""}
                        placeholder="Tu email"
                        disabled
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        id="nombre"
                        name="nombre"
                        placeholder="Tu nombre o nombre"
                        defaultValue={user.user_metadata.full_name || ""}
                    />
                </div>
                <UpdateUserButton />
            </form>
        </div>
    )
}