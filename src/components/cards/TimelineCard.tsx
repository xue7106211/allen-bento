import * as m from 'motion/react-m'
import type { TimelineCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

export function TimelineCard({ data, delay = 0 }: { data: TimelineCardData; delay?: number }) {
  const { ref, reduce, active } = useCardMotion(0.35)

  return (
    <BentoCard
      title={data.title}
      subtitle={data.subtitle}
      className={`${data.span.col} ${data.span.row ?? ''}`}
      delay={delay}
    >
      <div ref={ref} className="relative flex flex-1 flex-col justify-start py-1">
        <m.div
          className="absolute top-3 bottom-3 left-[15px] w-px origin-top bg-linear-to-b from-accent/55 via-line to-transparent sm:left-[17px]"
          aria-hidden
          initial={reduce ? false : { scaleY: 0 }}
          animate={active || reduce ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <ul className="relative space-y-4 sm:space-y-5">
          {data.nodes.map((node, index) => (
            <li key={`${node.year}-${node.product}`} className="flex items-start gap-4">
              <m.span
                className="relative z-10 mt-1 size-3.5 shrink-0 rounded-full border-2 border-ink sm:size-4"
                initial={false}
                animate={
                  reduce || active
                    ? {
                        backgroundColor: '#7dd3c0',
                        borderColor: '#3d8f7f',
                        boxShadow: reduce
                          ? 'none'
                          : '0 0 0 4px rgba(125,211,192,0.18), 0 0 16px rgba(125,211,192,0.35)',
                      }
                    : {
                        backgroundColor: '#2a3140',
                        borderColor: '#0b0d10',
                        boxShadow: 'none',
                      }
                }
                transition={{
                  delay: reduce ? 0 : index * 0.22,
                  duration: 0.45,
                  ease: 'easeOut',
                }}
              >
                {!reduce && active && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ animation: `node-pulse 2.4s ease-in-out ${index * 0.35}s infinite` }}
                  />
                )}
              </m.span>
              <m.div
                initial={reduce ? false : { opacity: 0, x: -10 }}
                animate={
                  reduce || active ? { opacity: 1, x: 0 } : { opacity: 0.35, x: -10 }
                }
                transition={{ delay: reduce ? 0 : index * 0.22 + 0.08, duration: 0.4 }}
                className="min-w-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <span className="font-display text-sm font-semibold tracking-wide text-accent">
                    {node.year}
                  </span>
                  <span className="text-sm text-fog/90">{node.org}</span>
                </div>
                <p className="mt-0.5 text-base font-medium tracking-wide text-paper">
                  {node.product}
                </p>
              </m.div>
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  )
}
