import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { LuckyCardData } from '../../data/cards'
import { BentoCard } from '../BentoCard'

export function LuckyCard({ data, delay = 0 }: { data: LuckyCardData; delay?: number }) {
  const reduce = useReducedMotion()

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col} delay={delay}>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <m.svg
          viewBox="0 0 160 140"
          className="w-36 max-w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          aria-hidden
          whileHover={reduce ? undefined : 'wag'}
          initial="rest"
          animate={reduce ? 'rest' : 'idle'}
        >
          <defs>
            <radialGradient id="luckyFur" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#e0c4a0" />
              <stop offset="100%" stopColor="#b8956e" />
            </radialGradient>
            <radialGradient id="luckyHead" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#e8d0b0" />
              <stop offset="100%" stopColor="#c4a484" />
            </radialGradient>
          </defs>
          <ellipse cx="78" cy="88" rx="42" ry="28" fill="url(#luckyFur)" />
          <circle cx="78" cy="48" r="28" fill="url(#luckyHead)" />
          <ellipse cx="52" cy="42" rx="12" ry="20" fill="#a67c52" transform="rotate(-18 52 42)" />
          <ellipse cx="104" cy="42" rx="12" ry="20" fill="#a67c52" transform="rotate(18 104 42)" />
          <ellipse cx="78" cy="58" rx="14" ry="10" fill="#f5ebe0" />
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
              idle: {
                rotate: [0, 6, -4, 0],
                transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              },
              wag: {
                rotate: [0, 24, -20, 22, -14, 0],
                transition: { duration: 0.65, ease: 'easeInOut' },
              },
            }}
          />
        </m.svg>

        <div className="text-center">
          <p className="font-display text-lg font-bold text-paper">{data.name}</p>
          <p className="mt-1.5 text-sm tracking-wide text-mist">
            {data.breed} · {data.age} · {data.weight}
          </p>
          <p className="label-track mt-3 text-[10px] text-accent/75 uppercase">hover 摇尾巴</p>
        </div>
      </div>
    </BentoCard>
  )
}
