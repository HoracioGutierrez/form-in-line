import { ArrowLeftRight, LogIn, Users } from "lucide-react"
import { Button } from "../ui/button"

//tailwind
function SpaceItemSkeleton() {
    return (
        <div className="border dark:border-muted p-4 rounded-lg bg-background shadow-sm shadow-accent hover:shadow-lg transition-shadow dark:hover:bg-black/50 hover:bg-gray-100/50">
            <div className="flex justify-between items-start mb-4">
                <div className="truncate flex flex-col gap-2">
                    <div className="h-4 bg-gray-300 animate-pulse w-xs"></div>
                    <div className="h-4 bg-gray-300/50 animate-pulse w-2xs  "></div>
                </div>
                <div className="flex gap-2 items-center flex-col sm:flex-row">
                    <div className="rounded-full px-2 py-1 text-xs bg-accent animate-pulse">loading</div>
                    <div className="rounded-full px-2 py-1 text-xs">
                        inactive
                    </div>
                </div>
            </div>
            <div className="flex gap-2 items-center flex-col xs:flex-row xs:justify-between">
                <div className="flex gap-2 items-center">

                    <Button variant="ghost" data-tooltip-id="tooltip" data-tooltip-content="Transferir usuarios restantes a otro espacio">
                        <ArrowLeftRight />
                    </Button>
                </div>
                <div className="flex gap-2 items-center">
                    <Button variant="ghost" className="flex items-center gap-1" data-tooltip-id="tooltip" data-tooltip-content="Cantidad de miembros en la cola">
                        <Users className="size-4" />
                    </Button>|
                    <Button variant="ghost" size="icon" className="p-0" data-tooltip-id="tooltip" data-tooltip-content="Ingresar al espacio">
                        <LogIn className="size-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default SpaceItemSkeleton