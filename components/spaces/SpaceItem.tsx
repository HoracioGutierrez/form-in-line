import { cn } from "@/lib/utils"
import { queue_members, queues, spaces, spaces_activation_times } from "@/prisma/generated/prisma-client-js"
import { Edit, LogIn, Users } from "lucide-react"
import { createClient } from "@/supabase/server"
import { getUserByEmail } from "@/actions/getUserByEmail"
import DeleteSpaceButton from "./delete-space-button"
import SpaceForm from "./SpaceForm"
import ActivateFormButton from "./activate-form-button"
import Link from "next/link"
import { Button } from "../ui/button"
import TransferSpaceForm from "./transfer-space-form"

type SpaceItemProps = {
    space: spaces & {
        spaces_activation_times: spaces_activation_times[]
        queue_members: queue_members[]
        queues: queues[]
    }
}

async function SpaceItem({ space }: SpaceItemProps) {

    const supabase = await createClient()
    const { data: authUser } = await supabase.auth.getUser()
    const { data: loggedUser } = await getUserByEmail(authUser.user?.email || "")

    const spaceBackground = space.is_active ? "hover:shadow-green-500/20" : "hover:shadow-red-500/20"

    return (
        <div key={space.id} className={cn("border dark:border-muted p-4 rounded-lg bg-background shadow-sm shadow-accent hover:shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-black/50" ,spaceBackground )}>
            <div className="flex justify-between items-start">
                <div className="truncate">
                    <h2 className="text-xl lg:text-2xl font-bold leading-none mb-1 truncate">
                        {space.name}
                    </h2>
                    <p className="text-muted-foreground mb-8 truncate text-sm lg:text-base">
                        {space.subject}
                    </p>
                </div>
                <div className="flex gap-2 items-center flex-col sm:flex-row">
                    {space.queues && space.queues.length > 0 && (
                        <div className="rounded-full px-2 py-1 text-xs bg-accent animate-pulse">active queue!</div>
                    )}
                    <div className={cn(
                        "rounded-full px-2 py-1 text-xs",
                        space.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    )}>
                        {space.is_active ? "active" : "inactive"}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 items-center flex-col xs:flex-row xs:justify-between">
                <div className="flex gap-2 items-center">
                    {loggedUser && space.users_id == loggedUser.id && (
                        <>
                            {space.queues && space.queues.length > 0 && (
                                <TransferSpaceForm spaceId={space.id} userId={loggedUser.id} queueId={space.queues[0].id} />
                            )}
                            <DeleteSpaceButton space={space} />
                            <SpaceForm icon={<Edit />} variant="ghost" space={space} edit />
                            <ActivateFormButton space={space} />
                        </>
                    )}
                </div>
                <div className="flex gap-2 items-center">
                    <Button variant="ghost" className="flex items-center gap-1">
                        {space.queue_members.length}
                        <Users className="size-4" />
                    </Button>|
                    <Button variant="ghost" size="icon" className="p-0">
                        <Link className="block" href={`/spaces/${space.slug}`}>
                            <LogIn className="size-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )

    return (
        <div key={space.id} className="border dark:border-muted p-4 rounded-lg bg-background shadow-sm shadow-accent hover:shadow-lg transition duration-200 hover:-translate-y-1">
            <div className="flex justify-between">
                <div className="flex flex-col justify-between gap-2 items-end">

                </div>
            </div>
        </div>
    )
}
export default SpaceItem