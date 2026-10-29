import * as m from 'motion/react-m'
import type { FitnessCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

const SIZE = 120
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function FitnessCard({ data }: { data: FitnessCardData }) {
  const { ref, reduce, active } = useCardMotion(0.4)
  const progress = Math.min(data.stepsCurrent / data.stepsGoal, 1)
  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col}>
      <div ref={ref} className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="relative">
          <svg width={SIZE} height={SIZE} className="-rotate-90" aria-hidden>
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#222833"
              strokeWidth={STROKE}
            />
            <m.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#7dd3c0"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{
                strokeDashoffset: active || reduce ? offset : CIRCUMFERENCE,
              }}
              transition={{ duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <m.span
              className="font-display text-2xl font-bold text-paper"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: active || reduce ? 1 : 0.3 }}
            >
              {data.stepsCurrent.toLocaleString('zh-CN')}
            </m.span>
            <span className="text-[11px] text-mist">/ {data.stepsGoal.toLocaleString('zh-CN')} 步</span>
          </div>
        </div>
        <p className="text-center text-sm text-fog">{data.walkLabel}</p>
      </div>
    </BentoCard>
  )
}
