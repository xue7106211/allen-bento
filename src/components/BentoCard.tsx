import * as m from 'motion/react-m'
import type { CSSProperties, ReactNode } from 'react'
import { useCardMotion } from '../hooks/useCardMotion'

type BentoCardProps = {
  title: string
  subtitle: string
  className?: string
  delay?: number
  children: ReactNode
}

export function BentoCard({
  title,
  subtitle,
  className = '',
  delay = 0,
  children,
}: BentoCardProps) {
  const { ref, reduce, active } = useCardMotion(0.22)

  return (
    <m.article
      ref={ref}
      className={`bento-card group flex h-full min-h-0 flex-col p-5 sm:p-6 ${className}`}
      style={{ '--glow-x': '72%', '--glow-y': '8%' } as CSSProperties}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      animate={reduce || active ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 22 }}
      transition={{
        duration: 0.6,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -3,
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }
      }
    >
      <div className="noise" aria-hidden />
      <header className="relative z-10 mb-4">
        <h2 className="font-display text-lg font-bold text-paper sm:text-xl">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-mist">{subtitle}</p>
      </header>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
    </m.article>
  )
}
