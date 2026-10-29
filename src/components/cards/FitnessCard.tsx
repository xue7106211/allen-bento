import * as m from 'motion/react-m'
import type { FitnessCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

const SIZE = 128
const STROKE = 9
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function FitnessCard({ data, delay = 0 }: { data: FitnessCardData; delay?: number }) {
  const { ref, reduce, active } = useCardMotion(0.35)
  const progress = Math.min(data.stepsCurrent / data.stepsGoal, 1)
  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col} delay={delay}>
      <div ref={ref} className="flex flex-1 flex-col items-center justify-center gap-3.5">
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-2 rounded-full bg-accent/8 blur-xl"
            aria-hidden
          />
          <svg width={SIZE} height={SIZE} className="-rotate-90" aria-hidden>
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#1a2029"
              strokeWidth={STROKE}
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(125,211,192,0.12)"
              strokeWidth={STROKE}
              strokeDasharray="2 6"
            />
            <m.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="url(#fitnessArc)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{
                strokeDashoffset: active || reduce ? offset : CIRCUMFERENCE,
              }}
              transition={{ duration: reduce ? 0 : 1.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                filter: reduce ? undefined : 'drop-shadow(0 0 6px rgba(125,211,192,0.45))',
              }}
            />
            <defs>
              <linearGradient id="fitnessArc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5bb8a6" />
                <stop offset="100%" stopColor="#7dd3c0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <m.span
              className="font-display text-2xl font-bold tabular-nums text-paper"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: active || reduce ? 1 : 0.3 }}
            >
              {data.stepsCurrent.toLocaleString('zh-CN')}
            </m.span>
            <span className="mt-0.5 text-[11px] tracking-wide text-mist">
              / {data.stepsGoal.toLocaleString('zh-CN')} 步
            </span>
          </div>
        </div>
        <p className="text-center text-sm tracking-wide text-fog">{data.walkLabel}</p>
      </div>
    </BentoCard>
  )
}
