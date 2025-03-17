import { getSpaceBySlug } from "@/actions/getSpaceBySlug"
import { getUserByEmail } from "@/actions/getUserByEmail"
import JoinQueueModal from "@/components/queue/join-queue-modal"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

type SpaceDetailsPageProps = {
    params: Promise<{ slug: string }>,
}

async function SpaceDetailsPage({ params }: SpaceDetailsPageProps) {

    const { slug } = await params
    const { data } = await getSpaceBySlug(slug)
    const supabase = await createClient()
    const { data: authUser } = await supabase.auth.getUser()
    const { data: loggedUser } = await getUserByEmail(authUser.user?.email || "")

    if (!data) {
        redirect("/spaces")
    }

    const currentSpeaker = data.queue_members.find(member => member.is_current)

    return (
        <section className="grow flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="font-bold text-2xl capitalize">{data.name}</h2>
                    <p className="text-muted-foreground">{data.subject}</p>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-2xl mb-2">Current Speaker</h3>
                <div className="border dark:border-muted p-4 rounded-lg flex items-center justify-between mb-4">
                    {currentSpeaker ? (
                        <div>
                            <h4 className="font-bold text-xl">{currentSpeaker.user.name || currentSpeaker.user.email}</h4>
                            <p className="text-muted">{currentSpeaker.subject}</p>
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center">There is no current speaker</p>
                    )}
                </div>
            </div>
            <div>
                <h3 className="font-bold text-2xl mb-2">Members Queue</h3>
                {loggedUser
                    && data.queue_members.length > 0
                    && !data.queue_members.find(member => member.user_id === loggedUser.id)
                    && (
                        <JoinQueueModal loggedUser={loggedUser} space={data} />
                    )}
                {data.queue_members.length === 0 && (
                    <div className="border-dashed border dark:border-muted p-4 rounded-lg">
                        <p className="text-muted-foreground text-center">There are no people in the wait list</p>
                        <p className="text-muted-foreground text-center mb-8">Be the first one to join!</p>
                        {loggedUser && (
                            <div className="flex justify-center">
                                <JoinQueueModal loggedUser={loggedUser} space={data} />
                            </div>
                        )}
                    </div>
                )}
                {data.queue_members.length > 0 && data.queue_members.map((member) => {
                    return (
                        <div key={member.id} className="border dark:border-muted p-4 rounded-lg flex items-center justify-between mb-4">
                            <div>
                                <h4 className="font-bold text-xl">
                                    {member.user.name || member.user.email}
                                    {member.is_current && <span className="text-muted text-sm"> (current)</span>}
                                </h4>
                                <p className="text-muted">{member.subject}</p>
                            </div>
                            <div>
                                <p className="text-muted px-2 py-1 bg-blue-300 rounded-md">{`#${member.position}`}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
export default SpaceDetailsPage