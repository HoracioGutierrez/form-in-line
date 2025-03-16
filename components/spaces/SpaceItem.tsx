import { cn } from "@/lib/utils"
import { spaces } from "@/prisma/generated/prisma-client-js"
import { Button } from "../ui/button"
import { Edit, Trash } from "lucide-react"
import { createClient } from "@/supabase/server"
import { getUserByEmail } from "@/actions/getUserByEmail"
import DeleteSpaceButton from "./delete-space-button"
import SpaceForm from "./SpaceForm"
import ActivateFormButton from "./activate-form-button"

type SpaceItemProps = {
    space: spaces
}

async function SpaceItem({ space }: SpaceItemProps) {

    const supabase = await createClient()
    const { data: authUser } = await supabase.auth.getUser()
    const { data: loggedUser } = await getUserByEmail(authUser.user?.email || "")

    return (
        <div key={space.id} className="border dark:border-muted p-4 rounded-lg">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-bold">{space.name}</h2>
                    <p className="text-muted-foreground">{space.subject}</p>
                    <p className="text-muted-foreground">URL: {space.slug}</p>
                </div>
                <div className="flex flex-col justify-between gap-2 items-end">
                    <div className={cn(
                        "rounded-full px-2 py-1 text-xs",
                        space.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    )}>
                        {space.is_active ? "active" : "inactive"}
                    </div>
                    <div className="flex gap-2">
                        {loggedUser && space.users_id == loggedUser.id && (
                            <>
                                <DeleteSpaceButton space={space} />
                                <SpaceForm icon={<Edit />} variant="ghost" space={space} edit/>
                                <ActivateFormButton space={space}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SpaceItem