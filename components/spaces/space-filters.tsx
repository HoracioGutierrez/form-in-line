"use client"
import { useQueryState, parseAsString } from 'nuqs'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

function SpaceFilters() {
    const [type, setType] = useQueryState("type", { ...parseAsString.withDefault("all"), shallow: false })
    const [queueType, setQueueType] = useQueryState("queueType", { ...parseAsString.withDefault("all"), shallow: false })

    return (
        <div className="flex gap-2 mb-4 flex-wrap">
            <Button onClick={() => setType("all")} size="sm" variant={"secondary"} className={cn(type === "all" && "bg-primary text-primary-foreground")}>
                all
            </Button>
            <Button onClick={() => setType("active")} size="sm" variant={"secondary"} className={cn(type === "active" && "bg-primary text-primary-foreground")}>
                active
            </Button>
            <Button onClick={() => setType("inactive")} size="sm" variant={"secondary"} className={cn(type === "inactive" && "bg-primary text-primary-foreground")}>
                inactive
            </Button>
            <Button onClick={() => setQueueType("active")} size="sm" variant={"secondary"} className={cn(queueType === "active" && "bg-primary text-primary-foreground")}>
                active queue
            </Button>
            <Button onClick={() => setQueueType("inactive")} size="sm" variant={"secondary"} className={cn(queueType === "inactive" && "bg-primary text-primary-foreground")}>
                inactive queue
            </Button>
            <Button onClick={() => setQueueType("all")} size="sm" variant={"secondary"} className={cn(queueType === "all" && "bg-primary text-primary-foreground")}>
                all queue
            </Button>
        </div>
    )
}
export default SpaceFilters