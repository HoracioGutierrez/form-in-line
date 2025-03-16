//tailwind
function SpaceItemSkeleton() {
    return (
        <div className="border dark:border-muted p-4 rounded-lg animate-pulse">
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-300 animate-pulse w-xs"></div>
                    <div className="h-4 bg-gray-300 animate-pulse w-xs"></div>
                    <div className="h-4 bg-gray-300 animate-pulse w-xs"></div>
                </div>
                <div>
                    <div className="rounded-full px-2 py-1 text-xs bg-gray-300 animate-pulse w-[50px] h-[25px]"></div>
                </div>
            </div>
        </div>
    )
}
export default SpaceItemSkeleton