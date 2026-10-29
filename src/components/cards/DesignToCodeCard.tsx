import * as m from 'motion/react-m'
import type { DesignToCodeCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

export function DesignToCodeCard({ data }: { data: DesignToCodeCardData }) {
  const { ref, reduce, active } = useCardMotion(0.35)

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col}>
      <div ref={ref} className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-xl border border-line-soft bg-ink-soft p-3">
          <svg viewBox="0 0 120 100" className="size-full" aria-hidden>
            <rect x="10" y="12" width="100" height="76" rx="8" fill="#12151b" stroke="#2a3140" />
            <rect x="22" y="24" width="48" height="8" rx="2" fill="#7dd3c0" opacity="0.85" />
            <rect x="22" y="38" width="76" height="5" rx="1.5" fill="#c8cfd9" opacity="0.35" />
            <rect x="22" y="48" width="60" height="5" rx="1.5" fill="#c8cfd9" opacity="0.25" />
            <rect x="22" y="64" width="36" height="14" rx="4" fill="#3d8f7f" />
            <circle cx="92" cy="30" r="10" fill="none" stroke="#7dd3c0" strokeWidth="1.5" opacity="0.5" />
            <path d="M86 30h12M92 24v12" stroke="#7dd3c0" strokeWidth="1.2" opacity="0.5" />
          </svg>
          <span className="absolute right-2 bottom-2 text-[10px] tracking-wide text-mist uppercase">
            Figma
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-line-soft bg-[#0e1116] p-3 font-mono text-[11px] leading-5 text-fog sm:text-xs">
          {data.codeLines.map((line, index) => {
            const delay = reduce ? 0 : 0.25 + index * 0.18
            const visible = reduce || active
            return (
              <m.div
                key={`${index}-${line || 'blank'}`}
                className="whitespace-pre"
                initial={reduce ? false : { opacity: 0 }}
                animate={visible ? { opacity: line ? 1 : 0.3 } : { opacity: 0 }}
                transition={{ delay, duration: 0.35, ease: 'easeOut' }}
              >
                <span className="mr-2 select-none text-mist/50">{String(index + 1).padStart(2, '0')}</span>
                <span className={line.startsWith('<') || line.startsWith('</') ? 'text-accent' : ''}>
                  {line || ' '}
                </span>
              </m.div>
            )
          })}
          {!reduce && active && (
            <m.span
              className="ml-7 inline-block h-3.5 w-1.5 bg-accent align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </BentoCard>
  )
}
