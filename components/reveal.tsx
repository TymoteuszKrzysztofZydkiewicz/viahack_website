"use client"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className} initial={false}
    whileInView={reducedMotion ? undefined : { y: [20, 0], opacity: [0.65, 1] }}
    viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
    {children}
  </motion.div>
}
