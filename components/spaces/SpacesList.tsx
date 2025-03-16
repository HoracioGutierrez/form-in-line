import { handleGetAllSpaces } from "@/actions/handleGetAllSpaces"
import SpaceForm from "./SpaceForm"

async function SpacesList() {

    const { data } = await handleGetAllSpaces()

    return (
        <div>
            {data.length > 0 ? (
                <div></div>
            ) : (
                <div className="border-dashed border dark:border-muted p-4 rounded-lg">
                    <p className="text-muted-foreground text-center">No spaces yet</p>
                    <p className="text-muted-foreground text-center">Start by creating a new space and share it's URL to someone else</p>
                    <SpaceForm buttonText="create new space"/>
                </div>
            )}
        </div>
    )
}
export default SpacesList