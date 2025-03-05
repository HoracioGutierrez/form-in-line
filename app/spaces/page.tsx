import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAllSpaces } from "../actions";
import SpaceCard from "@/components/spaces/SpaceCard";
import PublicSpaceCard from "@/components/spaces/PublicSpaceCard";

export default async function SpacesPage() {

    const supabase = await createClient();
    const spaces = await getAllSpaces()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }
    console.log("🚀 ~ SpacesPage ~ user:", user)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Espacios</h1>
            {spaces.length === 0 && (
                <div className="text-center py-12 rounded-lg border-dashed dark:border-muted border-2">
                    <p className="text-gray-500 dark:text-muted-foreground/50 text-sm">
                        No hay espacios disponibles.
                        ¡Crea tu primer espacio para comenzar!
                    </p>
                </div>
            )}
            {/* a list of spaces instead of a grid */}
            <div className="grid grid-cols-1 gap-4">
                {spaces.map((space) => (
                    <PublicSpaceCard key={space.id} space={space} />
                ))}
            </div>
        </div>
    )
}