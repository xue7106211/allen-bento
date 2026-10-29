import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { ContactCardData } from '../../data/cards'
import { BentoCard } from '../BentoCard'

export function ContactCard({ data, delay = 0 }: { data: ContactCardData; delay?: number }) {
  const reduce = useReducedMotion()

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col} delay={delay}>
      <div className="grid flex-1 gap-3 sm:grid-cols-2">
        {data.links.map((link) => (
          <m.a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="glass-inset group/link flex flex-col justify-between rounded-[calc(var(--radius-bento)-0.7rem)] p-4 transition-[border-color,box-shadow,background] duration-300 hover:border-accent/35 hover:shadow-[0_0_0_1px_rgba(125,211,192,0.12),0_12px_32px_-16px_rgba(0,0,0,0.5)]"
            whileHover={reduce ? undefined : { y: -3 }}
            whileTap={reduce ? undefined : { scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-track text-[10px] text-mist uppercase">{link.hint}</span>
            <span className="font-display mt-4 text-lg font-semibold text-paper transition-colors group-hover/link:text-accent">
              {link.label}
            </span>
            <span className="mt-5 text-xs tracking-wide text-accent/75 transition-transform group-hover/link:translate-x-0.5">
              打开 →
            </span>
          </m.a>
        ))}
      </div>
    </BentoCard>
  )
}
