import * as m from 'motion/react-m'
import type { ReactNode } from 'react'
import { useCardMotion } from '../hooks/useCardMotion'

type BentoCardProps = {
  title: string
  subtitle: string
  className?: string
  children: ReactNode
}

export function BentoCard({ title, subtitle, className = '', children }: BentoCardProps) {
  const { ref, reduce, active } = useCardMotion(0.28)

  return (
    <m.article
      ref={ref}
      className={`bento-card group flex min-h-56 flex-col p-5 sm:p-6 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={
        reduce || active ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 18 }
      }
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { borderColor: 'rgba(125, 211, 192, 0.35)' }}
    >
      <div className="noise" aria-hidden />
      <header className="relative z-10 mb-4">
        <h2 className="font-display text-lg font-bold tracking-tight text-paper sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-mist">{subtitle}</p>
      </header>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
    </m.article>
  )
}
