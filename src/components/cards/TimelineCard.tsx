import * as m from 'motion/react-m'
import type { TimelineCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

export function TimelineCard({ data }: { data: TimelineCardData }) {
  const { ref, reduce, active } = useCardMotion(0.4)

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={`${data.span.col} ${data.span.row ?? ''}`}>
      <div ref={ref} className="relative flex flex-1 flex-col justify-center gap-0 py-2">
        <div
          className="absolute top-3 bottom-3 left-[15px] w-px bg-line sm:left-[17px]"
          aria-hidden
        />
        <ul className="relative space-y-5">
          {data.nodes.map((node, index) => (
            <li key={`${node.year}-${node.product}`} className="flex items-start gap-4">
              <m.span
                className="relative z-10 mt-1 size-3.5 shrink-0 rounded-full border-2 border-ink bg-line sm:size-4"
                initial={false}
                animate={
                  reduce || active
                    ? {
                        backgroundColor: '#7dd3c0',
                        borderColor: '#3d8f7f',
                        boxShadow: reduce ? 'none' : '0 0 0 4px rgba(125,211,192,0.15)',
                      }
                    : {
                        backgroundColor: '#2a3140',
                        borderColor: '#0b0d10',
                        boxShadow: 'none',
                      }
                }
                transition={{
                  delay: reduce ? 0 : index * 0.28,
                  duration: 0.45,
                  ease: 'easeOut',
                }}
              />
              <m.div
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={
                  reduce || active
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0.35, x: -8 }
                }
                transition={{ delay: reduce ? 0 : index * 0.28 + 0.08, duration: 0.4 }}
                className="min-w-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-display text-sm font-semibold text-accent">
                    {node.year}
                  </span>
                  <span className="text-sm text-fog">{node.org}</span>
                </div>
                <p className="mt-0.5 text-base font-medium text-paper">{node.product}</p>
              </m.div>
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  )
}
