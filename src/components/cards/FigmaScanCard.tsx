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

export function FigmaScanCard({
  data,
  delay = 0,
}: {
  data: FigmaScanCardData
  delay?: number
}) {
  const { ref, reduce, active } = useCardMotion(0.35)

  return (
    <BentoCard
      title={data.title}
      subtitle={data.subtitle}
      className={`${data.span.col} ${data.span.row ?? ''}`}
      delay={delay}
    >
      <div ref={ref} className="flex flex-1 flex-col gap-3">
        <div className="glass-inset relative min-h-40 flex-1 overflow-hidden rounded-[calc(var(--radius-bento)-0.7rem)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
            aria-hidden
          />
          <svg viewBox="0 0 150 120" className="absolute inset-0 size-full" aria-hidden>
            {elements.map((el, i) => (
              <m.rect
                key={i}
                x={el.x}
                y={el.y}
                width={el.w}
                height={el.h}
                rx={2.5}
                fill={el.bound ? 'rgba(110,207,155,0.14)' : 'rgba(224,122,106,0.12)'}
                stroke={el.bound ? '#6ecf9b' : '#e07a6a'}
                strokeWidth={1.2}
                initial={false}
                animate={
                  active || reduce
                    ? {
                        stroke: el.bound ? '#6ecf9b' : '#e07a6a',
                        opacity: 1,
                        filter: el.bound
                          ? 'drop-shadow(0 0 4px rgba(110,207,155,0.35))'
                          : 'drop-shadow(0 0 3px rgba(224,122,106,0.25))',
                      }
                    : { stroke: '#2a3140', opacity: 0.55, filter: 'none' }
                }
                transition={{ delay: reduce ? 0 : 0.4 + i * 0.08, duration: 0.35 }}
              />
            ))}
          </svg>

          {!reduce && (
            <>
              <m.div
                className="pointer-events-none absolute inset-x-0 h-12 bg-linear-to-b from-accent/0 via-accent/40 to-accent/0"
                initial={{ top: '-25%' }}
                animate={active ? { top: ['-25%', '115%'] } : { top: '-25%' }}
                transition={{
                  duration: 2.4,
                  ease: 'easeInOut',
                  repeat: active ? Infinity : 0,
                  repeatDelay: 0.7,
                }}
              />
              <m.div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/60 shadow-[0_0_12px_2px_rgba(125,211,192,0.45)]"
                initial={{ top: '-5%' }}
                animate={active ? { top: ['-5%', '105%'] } : { top: '-5%' }}
                transition={{
                  duration: 2.4,
                  ease: 'easeInOut',
                  repeat: active ? Infinity : 0,
                  repeatDelay: 0.7,
                }}
              />
            </>
          )}
        </div>

        <div className="mt-auto flex gap-4 text-xs tracking-wide">
          <span className="inline-flex items-center gap-1.5 text-ok">
            <span className="size-2 rounded-full bg-ok shadow-[0_0_8px_rgba(110,207,155,0.55)]" />
            {data.boundLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-warn">
            <span className="size-2 rounded-full bg-warn shadow-[0_0_8px_rgba(224,122,106,0.4)]" />
            {data.unboundLabel}
          </span>
        </div>
      </div>
    </BentoCard>
  )
}
