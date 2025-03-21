import { queue_members, users } from "@/prisma/generated/prisma-client-js"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import MoveUpSpeakerForm from "./moveup-speaker-form"
import MoveDownSpeakerForm from "./movedown-speaker-form"

type QueueMemberItemProps = {
    member: queue_members & {
        user: users
    }
    membersLength: number
}

function QueueMemberItem({ member, membersLength }: QueueMemberItemProps) {
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
                    <Button variant="ghost" size="icon" className="p-0" data-tooltip-id="tooltip" data-tooltip-content="Remove from queue">
                        <Trash />
                    </Button>
                    {member.is_current === true && member.position == 1 && (
                        <MoveDownSpeakerForm speaker={member} />
                    )}
                    {member.is_current === false && member.position > 1 && member.position < membersLength && (
                        <MoveDownSpeakerForm speaker={member} />
                    )}
                    {member.is_current === false && member.position > 1 && (
                        <MoveUpSpeakerForm speaker={member} />
                    )}
                </div>
            </div>
        </div>
    )
}
export default QueueMemberItem