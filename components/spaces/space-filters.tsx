"use client"
import { useQueryState, parseAsString } from 'nuqs'
import { Button } from '../ui/button'

function SpaceFilters() {
    const [type, setType] = useQueryState("type", { ...parseAsString.withDefault("all"), shallow: false },)

    return (
        <div>
            <Button onClick={() => setType("all")}>
                all
            </Button>
            <Button onClick={() => setType("active")}>
                active
            </Button>
            <Button onClick={() => setType("inactive")}>
                inactive
            </Button>
        </div>
    )
}
export default SpaceFilters