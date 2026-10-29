import { useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

export function useCardMotion(amount = 0.35) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount, once: true })
  const active = Boolean(inView && !reduce)

  return { ref, reduce: Boolean(reduce), inView, active }
}
