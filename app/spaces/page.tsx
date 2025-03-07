import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAllSpaces } from "../actions";
import PublicSpaceCard from "@/components/spaces/PublicSpaceCard";
import Form from "next/form"
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default async function SpacesPage({ searchParams }: { searchParams: Promise<{ spaceType?: string }> }) {

    const params = await searchParams;
    const supabase = await createClient();
    const spaces = await getAllSpaces(params.spaceType || "all");

    const keyString = `spaceType=${params?.spaceType || "all"}`;

    console.log("🚀 ~ SpacesPage ~ keyString:", keyString)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Espacios</h1>
            <Form action={"/spaces"} className="flex gap-2 mb-4">
                <div className="flex gap-2">
                    <input
                        type="radio"
                        name="spaceType"
                        value="active"
                        id="active"
                        className="hidden peer/active"
                        defaultChecked={params.spaceType === 'active'}
                    />
                    <label
                        htmlFor="active"
                        className="px-3 py-1 rounded-full border cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 peer-checked/active:bg-primary peer-checked/active:text-primary-foreground"
                    >
                        Activos
                    </label>

                    <input
                        type="radio"
                        name="spaceType"
                        value="inactive"
                        id="inactive"
                        className="hidden peer/inactive"
                        defaultChecked={params.spaceType === 'inactive'}
                    />
                    <label
                        htmlFor="inactive"
                        className="px-3 py-1 rounded-full border cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 peer-checked/inactive:bg-primary peer-checked/inactive:text-primary-foreground"
                    >
                        Inactivos
                    </label>

                    <input
                        type="radio"
                        name="spaceType"
                        value="all"
                        id="all"
                        className="hidden peer"
                        defaultChecked={!params.spaceType || params.spaceType === 'all'}
                    />
                    <label
                        htmlFor="all"
                        className="px-3 py-1 rounded-full border cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 peer-checked:bg-primary peer-checked:text-primary-foreground"
                    >
                        Todos
                    </label>
                </div>
                <Button type="submit" variant="outline" size="sm">Filtrar</Button>
            </Form>
            {spaces.length === 0 && (
                <div className="text-center py-12 rounded-lg border-dashed dark:border-muted border-2">
                    <p className="text-gray-500 dark:text-muted-foreground/50 text-sm">
                        No hay espacios disponibles.
                        ¡Crea tu primer espacio para comenzar!
                    </p>
                </div>
            )}
            <Suspense key={keyString} fallback={<div>Loading...</div>}>
                <div className="grid grid-cols-1 gap-4">
                    {spaces.map((space) => (
                        <PublicSpaceCard key={space.id} space={space} />
                    ))}
                </div>
            </Suspense>
        </div>
    )
}