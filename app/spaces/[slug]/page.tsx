import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getSpaceBySlug, getQueueForSpace } from "@/app/actions";
import SpaceHeader from "@/components/spaces/SpaceHeader";
import CurrentSpeaker from "@/components/spaces/CurrentSpeaker";
import QueueList from "@/components/spaces/QueueList";
import SpaceControls from "@/components/spaces/SpaceControls";
import JoinQueueButton from "@/components/spaces/JoinQueueButton";
import { Suspense } from "react";

export default async function SpaceDetailsPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const supabase = await createClient();
    const { slug } = await params;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    // Get space details
    const space = await getSpaceBySlug(slug, user.id);

    if (!space) {
        return notFound();
    }

    // Get queue for the space
    const queue = await getQueueForSpace(space.id);

    // Find the current speaker
    const currentSpeaker = queue.find(item => item.is_current_speaker);

    // Rest of the queue (not the current speaker)
    const waitingUsers = queue.filter(item => !item.is_current_speaker);

    // Check if current user is already in queue
    const isUserInQueue = queue.some(item => item.user_id === user.id);

    // Calculate active duration if space is active
    let activeDuration = null;
    if (space.is_active && space.activated_at) {
        const activeSince = new Date(space.activated_at);
        const now = new Date();
        const durationMs = now.getTime() - activeSince.getTime();
        const minutes = Math.floor(durationMs / (1000 * 60));
        activeDuration = `${minutes} min${minutes !== 1 ? 's' : ''}`;
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-6xl">
            {/* Space header with name and status */}
            <div className=" border border-gray-200 dark:border-muted rounded-lg bg-white dark:bg-muted/30">

                <SpaceHeader
                    space={space}

                    isOwner={space.is_owner}
                    currentUserId={user.id}
                    activeDuration={activeDuration}
                    isUserInQueue={isUserInQueue}
                    user={user}
                />

                {/* Current speaker section - only shown when space is active */}
                {space.is_active && (
                    <div className=" p-6 ">
                        <h2 className="text-xl font-semibold mb-4">Orador Actual</h2>
                        {currentSpeaker ? (
                            <CurrentSpeaker
                                speaker={currentSpeaker}
                                isOwner={space.is_owner}
                                spaceId={space.id}
                            />
                        ) : (
                            <div className="bg-gray-50 dark:bg-muted/30 p-6 rounded-lg text-center">
                                <p className="text-gray-500 dark:text-muted-foreground/30">
                                    Nadie está hablando en este momento.
                                </p>
                                {queue.length > 0 && space.is_owner && (
                                    <button
                                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                                        onClick={async () => {
                                            // This is just a placeholder - we'll create a client component instead
                                        }}
                                    >
                                        {/* Call next speaker */}
                                        Llamar al siguiente orador
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Join queue button - only for active spaces and non-owners who aren't already in queue */}
            {/* {space.is_active && !space.is_owner && !isUserInQueue && (
                <div className="mt-8">
                    <Suspense fallback={<div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>}>
                        <JoinQueueButton
                            spaceId={space.id}
                            userId={user.id}
                            email={user.email || ''}
                            isAlreadyInQueue={isUserInQueue}
                        />
                    </Suspense>
                </div>
            )} */}

            {/* Owner controls - only shown to space owner */}
            {/* {space.is_owner && (
                <SpaceControls
                    space={space}
                    hasQueue={queue.length > 0}
                />
            )} */}

            {/* Queue list - only shown when space is active */}
            {space.is_active && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Lista de Espera</h2>
                    <QueueList
                        users={queue} // Pass all users including current speaker
                        isOwner={space.is_owner}
                        currentUserId={user.id}
                        spaceId={space.id}
                    />
                </div>
            )}
        </div>
    );
}