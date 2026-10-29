import * as m from 'motion/react-m'
import type { FigmaScanCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

const elements = [
  { x: 18, y: 22, w: 64, h: 10, bound: true },
  { x: 18, y: 40, w: 42, h: 8, bound: false },
  { x: 18, y: 56, w: 70, h: 28, bound: true },
  { x: 96, y: 22, w: 36, h: 36, bound: false },
  { x: 96, y: 66, w: 36, h: 18, bound: true },
]

export function FigmaScanCard({ data }: { data: FigmaScanCardData }) {
  const { ref, reduce, active } = useCardMotion(0.4)

  return (
    <BentoCard
      title={data.title}
      subtitle={data.subtitle}
      className={`${data.span.col} ${data.span.row ?? ''}`}
    >
      <div ref={ref} className="flex flex-1 flex-col gap-3">
        <div className="relative min-h-44 overflow-hidden rounded-xl border border-line-soft bg-ink-soft aspect-4/5">
          <svg viewBox="0 0 150 120" className="absolute inset-0 size-full" aria-hidden>
            {elements.map((el, i) => (
              <m.rect
                key={i}
                x={el.x}
                y={el.y}
                width={el.w}
                height={el.h}
                rx={2.5}
                fill={el.bound ? 'rgba(110,207,155,0.12)' : 'rgba(224,122,106,0.1)'}
                stroke={el.bound ? '#6ecf9b' : '#e07a6a'}
                strokeWidth={1.2}
                initial={false}
                animate={
                  active || reduce
                    ? {
                        stroke: el.bound ? '#6ecf9b' : '#e07a6a',
                        opacity: 1,
                      }
                    : { stroke: '#2a3140', opacity: 0.55 }
                }
                transition={{ delay: reduce ? 0 : 0.45 + i * 0.08, duration: 0.35 }}
              />
            ))}
          </svg>

          {!reduce && (
            <m.div
              className="pointer-events-none absolute inset-x-0 h-10 bg-linear-to-b from-accent/0 via-accent/35 to-accent/0"
              initial={{ top: '-20%' }}
              animate={active ? { top: ['-20%', '110%'] } : { top: '-20%' }}
              transition={{
                duration: 2.2,
                ease: 'easeInOut',
                repeat: active ? Infinity : 0,
                repeatDelay: 0.8,
              }}
            />
          )}
        </div>

        <div className="mt-auto flex gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-ok">
            <span className="size-2 rounded-full bg-ok" />
            {data.boundLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-warn">
            <span className="size-2 rounded-full bg-warn" />
            {data.unboundLabel}
          </span>
        </div>
      </div>
    </BentoCard>
  )
}
