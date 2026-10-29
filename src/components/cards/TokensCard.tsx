import * as m from 'motion/react-m'
import type { TokensCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

export function TokensCard({ data }: { data: TokensCardData }) {
  const { ref, reduce, active } = useCardMotion(0.35)

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col}>
      <div ref={ref} className="flex flex-1 flex-col gap-4">
        <div className="flex items-end gap-2">
          <m.span
            className="font-display text-4xl font-extrabold tracking-tight text-paper sm:text-5xl"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={active || reduce ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.92 }}
            transition={{ duration: 0.5 }}
          >
            {data.countLabel}
          </m.span>
          <span className="mb-1.5 text-sm text-mist">design tokens</span>
        </div>

        <div className="relative grid gap-3">
          {!reduce && (
            <svg
              className="pointer-events-none absolute inset-y-2 left-[18%] hidden w-[64%] sm:block"
              viewBox="0 0 200 120"
              fill="none"
              aria-hidden
            >
              {[0, 1].map((i) => (
                <m.path
                  key={i}
                  d={i === 0 ? 'M20 28 C 80 28, 120 60, 180 60' : 'M20 60 C 80 60, 120 92, 180 92'}
                  stroke="url(#aliasFlow)"
                  strokeWidth="1.25"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    active
                      ? { pathLength: 1, opacity: 0.7, strokeDashoffset: [0, -20] }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: { delay: 0.35 + i * 0.15, duration: 0.8 },
                    opacity: { delay: 0.35 + i * 0.15, duration: 0.4 },
                    strokeDashoffset: {
                      delay: 1,
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  }}
                />
              ))}
              <defs>
                <linearGradient id="aliasFlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7dd3c0" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#7dd3c0" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7dd3c0" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {data.layers.map((layer, index) => (
            <m.div
              key={layer.name}
              className="relative rounded-xl border border-line-soft bg-ink-soft/70 px-3.5 py-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={
                active || reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.25, y: 10 }
              }
              transition={{ delay: reduce ? 0 : index * 0.22, duration: 0.45 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm font-semibold text-accent">
                  {layer.name}
                </span>
                <span className="text-xs text-mist">{layer.label}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {layer.examples.map((ex) => (
                  <code
                    key={ex}
                    className="rounded-md bg-panel px-1.5 py-0.5 font-mono text-[11px] text-fog"
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
