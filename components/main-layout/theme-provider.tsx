"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Tooltip } from 'react-tooltip'
import { motion } from "motion/react"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>
    {children}
    <Tooltip id="tooltip"
      style={{
        backgroundColor: "transparent"
      }}
      render={({ content }) => {
        return (
          <motion.div
            className="rounded-2xl dark:bg-accent/85 p-2 bg-black/85"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.5, duration: 0.4 } }}
          >
            {content}
          </motion.div>
        )
      }}
    />
  </NextThemesProvider>
}
