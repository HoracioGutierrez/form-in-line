import { handleGetAllSpaces } from "@/actions/handleGetAllSpaces"
import SpaceForm from "./SpaceForm"

async function SpacesList() {

    const { data } = await handleGetAllSpaces()

    return (
        <div>
            {data.length > 0 ? (
                <div>
                    {data.map(space => {
                        return (
                            <div key={space.id} className="border-dashed border dark:border-muted p-4 rounded-lg">
                                <h2 className="text-lg font-bold">{space.name}</h2>
                                <p className="text-muted-foreground">{space.subject}</p>
                                <p className="text-muted-foreground">URL: {space.slug}</p>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="border-dashed border dark:border-muted p-4 rounded-lg">
                    <p className="text-muted-foreground text-center">No spaces yet</p>
                    <p className="text-muted-foreground text-center">Start by creating a new space and share it's URL to someone else</p>
                    <SpaceForm buttonText="create new space" />
                </div>
            )}
        </div>
    )
}
export default SpacesList