import * as m from 'motion/react-m'
import type { TokensCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

export function TokensCard({ data, delay = 0 }: { data: TokensCardData; delay?: number }) {
  const { ref, reduce, active } = useCardMotion(0.3)

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col} delay={delay}>
      <div ref={ref} className="flex h-full flex-1 flex-col gap-3.5">
        <div className="flex items-end gap-2.5">
          <m.span
            className="font-display text-4xl font-extrabold tracking-tight text-paper sm:text-5xl"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={active || reduce ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.9 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {data.countLabel}
          </m.span>
          <span className="label-track mb-2 text-[10px] text-mist uppercase">design tokens</span>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col gap-2">
          {!reduce && (
            <svg
              className="pointer-events-none absolute inset-y-2 left-[14%] hidden w-[72%] sm:block"
              viewBox="0 0 200 120"
              fill="none"
              aria-hidden
            >
              {[0, 1].map((i) => (
                <m.path
                  key={i}
                  d={i === 0 ? 'M20 28 C 80 28, 120 60, 180 60' : 'M20 60 C 80 60, 120 92, 180 92'}
                  stroke="url(#aliasFlow)"
                  strokeWidth="1.4"
                  strokeDasharray="5 7"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    active
                      ? { pathLength: 1, opacity: 0.75, strokeDashoffset: [0, -24] }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: { delay: 0.3 + i * 0.12, duration: 0.85 },
                    opacity: { delay: 0.3 + i * 0.12, duration: 0.4 },
                    strokeDashoffset: {
                      delay: 0.95,
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  }}
                />
              ))}
              <defs>
                <linearGradient id="aliasFlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7dd3c0" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#7dd3c0" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7dd3c0" stopOpacity="0.08" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {data.layers.map((layer, index) => (
            <m.div
              key={layer.name}
              className="glass-inset relative flex min-h-[3.75rem] flex-1 flex-col justify-center rounded-[calc(var(--radius-bento)-0.7rem)] px-3.5 py-2.5"
              style={{
                marginLeft: `${index * 5}px`,
                marginRight: `${(2 - index) * 3}px`,
              }}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={
                active || reduce ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 10 }
              }
              transition={{ delay: reduce ? 0 : index * 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm font-semibold text-accent">{layer.name}</span>
                <span className="text-xs tracking-wide text-mist">{layer.label}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {layer.examples.map((ex) => (
                  <code
                    key={ex}
                    className="rounded-md border border-white/5 bg-panel/80 px-1.5 py-0.5 font-mono text-[11px] text-fog"
                  >
                    {ex}
                  </code>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </BentoCard>
  )
}
