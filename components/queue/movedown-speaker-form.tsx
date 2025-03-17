"use client"
import Form from "next/form"
import toast from "react-hot-toast"
import { queue_members, users } from "@/prisma/generated/prisma-client-js"
import MoveDownSpeakerButton from "./movedown-speaker-button"
import { handleMoveDownSpeakerInQueue } from "@/actions/handleMoveDownSpeakerInQueue"

type MoveDownSpeakerFormProps = {
    speaker: queue_members & {
        user: users
    }
}

function MoveDownSpeakerForm({ speaker }: MoveDownSpeakerFormProps) {

    const handleMoveUpClick = async () => {
        toast.promise(handleMoveDownSpeakerInQueue(speaker.id,speaker.queue_id, speaker.space_id), {
            loading: "Moving down the speaker...",
            success: "Moved down the speaker",
            error: "Error moving down the speaker"
        })
    }

    return (
        <Form action={handleMoveUpClick}>
            <MoveDownSpeakerButton />
        </Form>
    )
}
export default MoveDownSpeakerForm