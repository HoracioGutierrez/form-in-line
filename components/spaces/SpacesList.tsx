import { handleGetAllSpaces } from "@/actions/handleGetAllSpaces"
import SpaceForm from "./SpaceForm"
import SpaceItem from "./SpaceItem"

async function SpacesList() {

    const { data } = await handleGetAllSpaces()

    if (data.length === 0) return (
        <div className="border-dashed border dark:border-muted p-4 rounded-lg">
            <p className="text-muted-foreground text-center">No spaces yet</p>
            <p className="text-muted-foreground text-center">Start by creating a new space and share it's URL to someone else</p>
            <SpaceForm buttonText="create new space" />
        </div>
    )

    return (
        <div className="flex flex-col gap-4">
            {data.map(space => {
                return (
                    <SpaceItem key={space.id} space={space} />
                )
            })}
        </div>
    )
}
export default SpacesList