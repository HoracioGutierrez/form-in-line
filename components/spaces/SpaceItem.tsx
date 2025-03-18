import { cn } from "@/lib/utils"
import { queue_members, spaces, spaces_activation_times } from "@/prisma/generated/prisma-client-js"
import { Edit, LogIn, Users } from "lucide-react"
import { createClient } from "@/supabase/server"
import { getUserByEmail } from "@/actions/getUserByEmail"
import DeleteSpaceButton from "./delete-space-button"
import SpaceForm from "./SpaceForm"
import ActivateFormButton from "./activate-form-button"
import Link from "next/link"
import { Button } from "../ui/button"

type SpaceItemProps = {
    space: spaces & {
        spaces_activation_times: spaces_activation_times[]
        queue_members: queue_members[]
    }
}

async function SpaceItem({ space }: SpaceItemProps) {

    const supabase = await createClient()
    const { data: authUser } = await supabase.auth.getUser()
    const { data: loggedUser } = await getUserByEmail(authUser.user?.email || "")

    return (
        <div key={space.id} className="border dark:border-muted p-4 rounded-lg bg-background shadow-sm shadow-accent hover:shadow-lg transition duration-200">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-start gap-2 leading-none mb-1">
                        {space.name}
                    </h2>
                    <p className="text-muted-foreground mb-8 flex gap-1 items-center">
                        {space.subject}
                    </p>
                    <div className="flex gap-2">
                        {space.spaces_activation_times.map((time, index) => {
                            return (
                                <div key={index} className="rounded-full px-2 py-1 text-xs bg-muted flex items-center justify-center">
                                    {time.day_of_week}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col justify-between gap-2 items-end">
                    <div className="flex gap-2 items-center">
                        <div className={cn(
                            "rounded-full px-2 py-1 text-xs",
                            space.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        )}>
                            {space.is_active ? "active" : "inactive"}
                        </div>
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
                        {loggedUser && space.users_id == loggedUser.id && (
                            <>
                                <DeleteSpaceButton space={space} />
                                <SpaceForm icon={<Edit />} variant="ghost" space={space} edit />
                                <ActivateFormButton space={space} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SpaceItem