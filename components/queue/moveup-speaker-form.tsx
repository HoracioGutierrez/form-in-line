"use client"
import Form from "next/form"
import MoveUpSpeakerButton from "./moveup-speaker-button"
import toast from "react-hot-toast"
import { handleMoveUpSpeakerInQueue } from "@/actions/handleMoveUpSpeakerInQueue"
import { queue_members, users } from "@/prisma/generated/prisma-client-js"

type MoveUpSpeakerFormProps = {
    speaker: queue_members & {
        user: users
    }
}

function MoveUpSpeakerForm({ speaker }: MoveUpSpeakerFormProps) {

    const handleMoveUpClick = async () => {
        toast.promise(handleMoveUpSpeakerInQueue(speaker.id,speaker.queue_id, speaker.space_id), {
            loading: "Moving up the speaker...",
            success: "Moved up the speaker",
            error: "Error moving up the speaker"
        })
    }

    return (
        <Form action={handleMoveUpClick}>
            <MoveUpSpeakerButton />
        </Form>
    )
}
export default MoveUpSpeakerForm