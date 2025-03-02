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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Active Queues</h2>
                </div>
                <Suspense fallback={<ActiveQueuesSkeleton />}>
                    <ActiveQueuesList userId={user.id} />
                </Suspense>
            </div>
            
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Spaces</h2>
                <CreateSpaceButton userId={user.id} />
            </div>
            
            <Suspense fallback={<SpacesSkeleton />}>
                <SpacesList userId={user.id} />
            </Suspense>
        </div>
    )
}