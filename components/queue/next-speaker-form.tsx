"use client";
import Form from "next/form"
import NextSpeakerButton from "./next-speaker-button"
import { spaces } from "@/prisma/generated/prisma-client-js";
import { handleNextSpeaker } from "@/actions/handleNextSpeaker";
import toast from "react-hot-toast";

type NextSpeakerFormProps = {
    space: spaces
}

function NextSpeakerForm({ space }: NextSpeakerFormProps) {

    const handleNextClick = async () => {
        toast.promise(handleNextSpeaker(space), {
            loading: "Moving to the next speaker...",
            success: "Next speaker moved successfully",
            error: "There was an error moving to the next speaker"
        })
    }

    return (
        <Form action={handleNextClick}>
            <NextSpeakerButton />
        </Form>
    )
}
export default NextSpeakerForm