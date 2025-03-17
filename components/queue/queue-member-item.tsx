import { queue_members, users } from "@/prisma/generated/prisma-client-js"
import { Button } from "../ui/button"
import { ArrowDown, ArrowUp, Trash } from "lucide-react"

type QueueMemberItemProps = {
    member: queue_members & {
        user: users
    }
    membersLength: number
}

function QueueMemberItem({ member , membersLength }: QueueMemberItemProps) {
    return (
        <div className="border dark:border-muted p-4 rounded-lg flex items-center justify-between mb-4">
            <div>
                <h4 className="font-bold text-xl">
                    {member.user.name || member.user.email}
                    {member.is_current && <span className="text-muted text-sm"> (current)</span>}
                </h4>
                <p className="text-muted">{member.subject}</p>
            </div>
            <div className="flex gap-2 flex-col items-end">
                <p className="text-muted px-2 py-1 bg-blue-300 rounded-md">{`#${member.position}`}</p>
                <div className="flex gap-2 items-center">
                    <Button variant="ghost" size="icon" className="p-0">
                        <Trash />
                    </Button>
                    {member.is_current === true && member.position == 1 && (
                        <Button variant="ghost" size="icon" className="p-0">
                            <ArrowDown />
                        </Button>
                    )}
                    {member.is_current === false && member.position > 1 && member.position < membersLength && (
                        <Button variant="ghost" size="icon" className="p-0">
                            <ArrowDown />
                        </Button>
                    )}
                    {member.is_current === false && member.position > 1 && (
                        <Button variant="ghost" size="icon" className="p-0">
                            <ArrowUp />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
export default QueueMemberItem