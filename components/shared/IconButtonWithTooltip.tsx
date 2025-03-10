"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

function IconButtonWithTooltip({ children, message, onClick }: { children: any, message?: string, onClick?: () => void }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    className="h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer hover:border hover:border-input"
                    onClick={onClick}
                >
                    <span>
                        {children}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{message}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default IconButtonWithTooltip