"use client"
import { animate, motion } from "motion/react"

type SpaceListMotionProps = {
    children: React.ReactNode
}

function SpaceListMotion({ children }: SpaceListMotionProps) {

    const variants = {
        animate: {
            transition: {
                staggerChildren: 0.15,
            }
        }
    }

    return (
        <motion.div className="flex flex-col gap-4" initial="initial" animate="animate" exit="exit" variants={variants}>
            {children}
        </motion.div>
    )
}
export default SpaceListMotion