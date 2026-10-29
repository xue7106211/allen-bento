import * as m from 'motion/react-m'
import type { DesignToCodeCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

export function DesignToCodeCard({
  data,
  delay = 0,
}: {
  data: DesignToCodeCardData
  delay?: number
}) {
  const { ref, reduce, active } = useCardMotion(0.3)

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col} delay={delay}>
      <div ref={ref} className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="glass-inset relative overflow-hidden rounded-[calc(var(--radius-bento)-0.7rem)] p-3">
          <svg viewBox="0 0 120 100" className="size-full" aria-hidden>
            <defs>
              <linearGradient id="figmaFrame" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#161b24" />
                <stop offset="100%" stopColor="#0e1218" />
              </linearGradient>
            </defs>
            <rect
              x="10"
              y="12"
              width="100"
              height="76"
              rx="8"
              fill="url(#figmaFrame)"
              stroke="rgba(255,255,255,0.08)"
            />
            <m.rect
              x="22"
              y="24"
              width="48"
              height="8"
              rx="2"
              fill="#7dd3c0"
              opacity="0.9"
              initial={reduce ? false : { opacity: 0.3, width: 20 }}
              animate={active || reduce ? { opacity: 0.9, width: 48 } : { opacity: 0.3, width: 20 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.15 }}
            />
            <rect x="22" y="38" width="76" height="5" rx="1.5" fill="#c8cfd9" opacity="0.32" />
            <rect x="22" y="48" width="60" height="5" rx="1.5" fill="#c8cfd9" opacity="0.22" />
            <m.rect
              x="22"
              y="64"
              width="36"
              height="14"
              rx="4"
              fill="#3d8f7f"
              initial={reduce ? false : { opacity: 0.4 }}
              animate={
                active || reduce
                  ? {
                      opacity: 1,
                      filter: reduce ? undefined : 'drop-shadow(0 0 6px rgba(125,211,192,0.35))',
                    }
                  : { opacity: 0.4 }
              }
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.35 }}
            />
            <circle cx="92" cy="30" r="10" fill="none" stroke="#7dd3c0" strokeWidth="1.5" opacity="0.55" />
            <path d="M86 30h12M92 24v12" stroke="#7dd3c0" strokeWidth="1.2" opacity="0.55" />
          </svg>
          <span className="label-track absolute right-2.5 bottom-2.5 text-[9px] text-mist uppercase">
            Figma
          </span>
        </div>

        <div className="glass-inset overflow-hidden rounded-[calc(var(--radius-bento)-0.7rem)] bg-[#0a0d12]/p-3 font-mono text-[11px] leading-5 text-fog sm:text-xs">
          {data.codeLines.map((line, index) => {
            const lineDelay = reduce ? 0 : 0.22 + index * 0.16
            const visible = reduce || active
            return (
              <m.div
                key={`${index}-${line || 'blank'}`}
                className="whitespace-pre"
                initial={reduce ? false : { opacity: 0, x: 4 }}
                animate={visible ? { opacity: line ? 1 : 0.25, x: 0 } : { opacity: 0, x: 4 }}
                transition={{ delay: lineDelay, duration: 0.35, ease: 'easeOut' }}
              >
                <span className="mr-2 select-none text-mist/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    line.startsWith('<') || line.startsWith('</')
                      ? 'text-accent'
                      : line.includes('token.')
                        ? 'text-fog'
                        : ''
                  }
                >
                  {line || ' '}
                </span>
              </m.div>
            )
          })}
          {!reduce && active && (
            <m.span
              className="ml-7 inline-block h-3.5 w-1.5 rounded-[1px] bg-accent align-middle shadow-[0_0_8px_rgba(125,211,192,0.55)]"
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 0.95, repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </BentoCard>
  )
}
