import { getSpaceBySlug } from "@/actions/getSpaceBySlug"
import { redirect } from "next/navigation"

type SpaceDetailsPageProps = {
    params: Promise<{ slug: string }>,
}

async function SpaceDetailsPage({ params }: SpaceDetailsPageProps) {

    const { slug } = await params
    const { data } = await getSpaceBySlug(slug)
    console.log("🚀 ~ SpaceDetailsPage ~ data:", data)

    if (!data) {
        redirect("/spaces")
    }

    return (
        <section className="grow flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="font-bold text-2xl capitalize">{data.name}</h2>
                    <p className="text-muted-foreground">{data.subject}</p>
                </div>
            </div>
        </section>
    )
}
export default SpaceDetailsPage