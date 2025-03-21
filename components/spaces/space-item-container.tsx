"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

type SpaceItemContainerProps = {
    children: React.ReactNode
    spaceBackground?: string
}

function SpaceItemContainer({ children, spaceBackground }: SpaceItemContainerProps) {


    const variants = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.75 } },
        exit: { opacity: 0, y: 50 },
    }

    return (
        <motion.div
            variants={variants}
            whileHover={{ y: -5, transition: { type: "spring", bounce: 0.75 } }}
            className={cn("border dark:border-muted p-4 rounded-lg bg-background shadow-sm shadow-accent hover:shadow-lg transition-shadow dark:hover:bg-black/50 hover:bg-gray-100/50", spaceBackground)}
        >
            {children}
        </motion.div>
    )
}

export default SpaceItemContainer