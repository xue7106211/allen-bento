import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { LuckyCardData } from '../../data/cards'
import { BentoCard } from '../BentoCard'

export function LuckyCard({ data }: { data: LuckyCardData }) {
  const reduce = useReducedMotion()

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col}>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <m.svg
          viewBox="0 0 160 140"
          className="w-36 max-w-full"
          aria-hidden
          whileHover={reduce ? undefined : 'wag'}
          initial="rest"
        >
          <ellipse cx="78" cy="88" rx="42" ry="28" fill="#c4a484" />
          <circle cx="78" cy="48" r="28" fill="#d2b48c" />
          <ellipse cx="52" cy="42" rx="12" ry="20" fill="#a67c52" transform="rotate(-18 52 42)" />
          <ellipse cx="104" cy="42" rx="12" ry="20" fill="#a67c52" transform="rotate(18 104 42)" />
          <ellipse cx="78" cy="58" rx="14" ry="10" fill="#f0e6d8" />
          <ellipse cx="78" cy="55" rx="5" ry="3.5" fill="#2a2420" />
          <circle cx="66" cy="44" r="3.2" fill="#1a1714" />
          <circle cx="90" cy="44" r="3.2" fill="#1a1714" />
          <circle cx="67" cy="43" r="1" fill="#fff" />
          <circle cx="91" cy="43" r="1" fill="#fff" />
          <rect x="52" y="102" width="10" height="18" rx="4" fill="#b8956e" />
          <rect x="68" y="104" width="10" height="16" rx="4" fill="#b8956e" />
          <rect x="84" y="104" width="10" height="16" rx="4" fill="#b8956e" />
          <rect x="98" y="102" width="10" height="18" rx="4" fill="#b8956e" />
          <m.path
            d="M112 78 C 128 70, 138 58, 142 48"
            fill="none"
            stroke="#a67c52"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ transformOrigin: '112px 78px' }}
            variants={{
              rest: { rotate: 0 },
              wag: {
                rotate: [0, 22, -18, 20, -12, 0],
                transition: { duration: 0.7, ease: 'easeInOut' },
              },
            }}
          />
        </m.svg>

        <div className="text-center">
          <p className="font-display text-lg font-bold text-paper">{data.name}</p>
          <p className="mt-1 text-sm text-mist">
            {data.breed} · {data.age} · {data.weight}
          </p>
          <p className="mt-2 text-xs text-accent/80">hover 摇尾巴</p>
        </div>
      </div>
    </BentoCard>
  )
}
