import { cn } from "@/lib/utils"
import { spaces } from "@/prisma/generated/prisma-client-js"

type SpaceItemProps = {
    space: spaces
}

function SpaceItem({ space }: SpaceItemProps) {
    return (
        <div key={space.id} className="border dark:border-muted p-4 rounded-lg">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-bold">{space.name}</h2>
                    <p className="text-muted-foreground">{space.subject}</p>
                    <p className="text-muted-foreground">URL: {space.slug}</p>
                </div>
                <div>
                    <div className={cn(
                        "rounded-full px-2 py-1 text-xs",
                        space.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    )}>
                        {space.is_active ? "active" : "inactive"}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SpaceItem