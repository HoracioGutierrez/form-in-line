import { getSpaceBySlug } from "@/actions/getSpaceBySlug"
import { getUserByEmail } from "@/actions/getUserByEmail"
import JoinQueueModal from "@/components/queue/join-queue-modal"
import NextSpeakerForm from "@/components/queue/next-speaker-form"
import QueueMemberItem from "@/components/queue/queue-member-item"
import ActivateFormButton from "@/components/spaces/activate-form-button"
import SpaceForm from "@/components/spaces/SpaceForm"
import { getI18n } from "@/locales/server"
import { createClient } from "@/supabase/server"
import { Edit } from "lucide-react"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

type SpaceDetailsPageProps = {
    params: Promise<{ slug: string }>,
}

async function SpaceDetailsPage({ params }: SpaceDetailsPageProps) {
    const t = await getTranslations("spaces")
    const { slug } = await params
    const { data } = await getSpaceBySlug(slug)
    const supabase = await createClient()
    const { data: authUser } = await supabase.auth.getUser()
    const { data: loggedUser } = await getUserByEmail(authUser.user?.email || "")

    if (!data) {
        redirect("/spaces")
    }

    const currentSpeaker = data.queue_members.find(member => member.is_current)
    const hasActiveQueue = data.queues.length > 0 && data.queues[0].is_active

    return (
        <section className="grow flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="font-bold text-2xl capitalize">{data.name}</h2>
                    <p className="text-muted-foreground">{data.subject}</p>
                    {loggedUser && loggedUser.id == data.users_id && (
                        <>
                            <SpaceForm icon={<Edit />} variant="ghost" space={data} edit />
                            <ActivateFormButton space={data} />
                        </>
                    )}
                </div>
            </div>
            <div className="mb-10">
                <h3 className="font-bold text-2xl mb-2">{t("detail.current_speaker")}</h3>
                <div className="border dark:border-muted p-4 rounded-lg flex items-center justify-between mb-4 bg-secondary">
                    {currentSpeaker ? (
                        <div className="flex justify-between w-full">
                            <div>
                                <h4 className="font-bold text-xl">{currentSpeaker.user.name || currentSpeaker.user.email}</h4>
                                <p className="text-secondary-foreground">{currentSpeaker.subject}</p>
                            </div>
                            <NextSpeakerForm space={data} />
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center">{t("detail.no_current_speaker")}</p>
                    )}
                </div>
            </div>
            <div>
                <h3 className="font-bold text-2xl mb-2">{t("detail.members_queue")}</h3>
                {loggedUser
                    && hasActiveQueue
                    && !data.queue_members.find(member => member.user_id === loggedUser.id)
                    && (
                        <JoinQueueModal loggedUser={loggedUser} space={data} />
                    )}
                {data.queue_members.length === 0 && (
                    <div className="border-dashed border dark:border-muted p-4 rounded-lg">
                        <p className="text-muted-foreground text-center">{t("detail.no_people_waitlist")}</p>
                        <p className="text-muted-foreground text-center mb-8">{t("detail.be_first")}</p>
                        {loggedUser && data.queues.length > 0 && (
                            <div className="flex justify-center">
                                <JoinQueueModal loggedUser={loggedUser} space={data} />
                            </div>
                        )}
                        {!hasActiveQueue && (
                            <p className="text-muted-foreground text-center">{t("detail.waitlist_not_active")}</p>
                        )}
                    </div>
                )}
                {data.queue_members.length > 0 && data.queue_members.map((member) => {
                    return (
                        <QueueMemberItem key={member.id} member={member} membersLength={data.queue_members.length} />
                    )
                })}
            </div>
        </section>
    )
}
export default SpaceDetailsPage