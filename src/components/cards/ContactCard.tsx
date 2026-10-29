import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { ContactCardData } from '../../data/cards'
import { BentoCard } from '../BentoCard'

export function ContactCard({ data }: { data: ContactCardData }) {
  const reduce = useReducedMotion()

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col}>
      <div className="grid flex-1 gap-3 sm:grid-cols-2">
        {data.links.map((link) => (
          <m.a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link flex flex-col justify-between rounded-xl border border-line-soft bg-ink-soft/80 p-4 transition-colors hover:border-accent/40 hover:bg-panel-hover"
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            <span className="text-xs tracking-wide text-mist uppercase">{link.hint}</span>
            <span className="font-display mt-3 text-lg font-semibold text-paper group-hover/link:text-accent">
              {link.label}
            </span>
            <span className="mt-4 text-xs text-accent/80">打开 →</span>
          </m.a>
        ))}
      </div>
    </BentoCard>
  )
}
