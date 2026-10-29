import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useState } from 'react'
import type { HorrorCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

export function HorrorCard({ data }: { data: HorrorCardData }) {
  const { ref, reduce, active } = useCardMotion(0.4)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active || reduce) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % data.films.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [active, reduce, data.films.length])

  const film = data.films[index] ?? data.films[0]

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col}>
      <div ref={ref} className="flex flex-1 flex-col items-center justify-center">
        <div className="relative w-full max-w-[11rem]">
          <div
            className="absolute top-0 bottom-0 -left-2 w-3 rounded-sm bg-[#1a1a1a]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(180deg, #2a2a2a 0 6px, #111 6px 10px)',
            }}
            aria-hidden
          />
          <div className="relative ml-2 aspect-3/4 overflow-hidden rounded-lg border border-line bg-ink-soft shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(224,122,106,0.18),transparent_55%)]" />
            <AnimatePresence mode="wait">
              <m.div
                key={film.title}
                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[10px] tracking-[0.2em] text-warn uppercase">Feature</span>
                <p className="font-display mt-2 text-xl font-bold text-paper">{film.title}</p>
                <p className="mt-1 text-sm text-mist">{film.year}</p>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {data.films.map((f, i) => (
            <span
              key={f.title}
              className={`h-1 w-4 rounded-full transition-colors ${
                i === index ? 'bg-warn' : 'bg-line'
              }`}
            />
          ))}
        </div>
      </div>
    </BentoCard>
  )
}
