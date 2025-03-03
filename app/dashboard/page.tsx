import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CreateSpaceButton from "@/components/spaces/CreateSpaceButton";
import SpacesSkeleton from "@/components/spaces/SpacesSkeleton";
import SpacesList from "@/components/spaces/SpacesList";
import ActiveQueuesList from "@/components/queues/ActiveQueuesList";
import ActiveQueuesSkeleton from "@/components/queues/ActiveQueuesSkeleton";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="mb-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xl font-semibold">Tus Espacios</h2>
                        <p className="text-sm text-muted-foreground text-balance">Estos espacios son los que vos creaste. Podes compartir la URL de cualquier espacio con otro usuario de la aplicación para que puedan unirse a tu lista de espera.</p>
                    </div>
                    <CreateSpaceButton userId={user.id} />
                </div>

                <Suspense fallback={<SpacesSkeleton />}>
                    <SpacesList userId={user.id} />
                </Suspense>
            </div>
            <div className="mb-10">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Tus Espacios activos</h2>
                    <p className="text-sm text-muted-foreground text-balance">Estos son los espacios a los que te uniste y estan actualmente activos.</p>
                </div>
                <Suspense fallback={<ActiveQueuesSkeleton />}>
                    <ActiveQueuesList userId={user.id} />
                </Suspense>
            </div>

        </div>
    )
}