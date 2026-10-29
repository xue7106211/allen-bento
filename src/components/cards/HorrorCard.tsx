import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useState } from 'react'
import type { HorrorCardData } from '../../data/cards'
import { useCardMotion } from '../../hooks/useCardMotion'
import { BentoCard } from '../BentoCard'

export function HorrorCard({ data, delay = 0 }: { data: HorrorCardData; delay?: number }) {
  const { ref, reduce, active } = useCardMotion(0.35)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active || reduce) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % data.films.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [active, reduce, data.films.length])

  const film = data.films[index] ?? data.films[0]
  const backLeft = data.films[(index + 1) % data.films.length]
  const backRight = data.films[(index + 2) % data.films.length]

  return (
    <BentoCard title={data.title} subtitle={data.subtitle} className={data.span.col} delay={delay}>
      <div ref={ref} className="flex flex-1 flex-col">
        <div className="relative mx-auto flex w-full max-w-[13rem] flex-1 items-center justify-center">
          {/* 胶片边条 */}
          <div
            className="absolute inset-y-2 left-0 z-0 w-5 rounded-sm border border-white/8 bg-[#101010] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(180deg, #333 0 3px, #0c0c0c 3px 7px, #1c1c1c 7px 13px)',
            }}
            aria-hidden
          />
          <div
            className="absolute inset-y-2 right-0 z-0 w-5 rounded-sm border border-white/8 bg-[#101010]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(180deg, #333 0 3px, #0c0c0c 3px 7px, #1c1c1c 7px 13px)',
            }}
            aria-hidden
          />

          {/* 底层叠海报 — 静态层次 */}
          <div
            className="absolute top-[12%] bottom-[14%] left-[18%] right-[22%] z-[1] rounded-md border border-white/10 bg-[#1a1216]"
            style={{
              transform: 'rotate(-9deg) translate(-6px, 4px)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
            }}
            aria-hidden
          >
            <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_40%_20%,rgba(224,122,106,0.2),transparent_60%)] p-2 text-center">
              <p className="font-display text-xs font-bold text-paper/65">{backLeft.title}</p>
              <p className="mt-1 text-[10px] text-mist/60">{backLeft.year}</p>
            </div>
          </div>
          <div
            className="absolute top-[14%] bottom-[12%] left-[22%] right-[16%] z-[2] rounded-md border border-white/10 bg-[#161018]"
            style={{
              transform: 'rotate(8deg) translate(8px, 6px)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
            }}
            aria-hidden
          >
            <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_60%_30%,rgba(224,122,106,0.15),transparent_55%)] p-2 text-center">
              <p className="font-display text-xs font-bold text-paper/70">{backRight.title}</p>
              <p className="mt-1 text-[10px] text-mist/60">{backRight.year}</p>
            </div>
          </div>

          {/* 前景主海报 */}
          <div className="relative z-10 mx-auto aspect-3/4 w-[68%] overflow-hidden rounded-lg border border-white/12 bg-ink-soft shadow-[0_18px_48px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_16%,rgba(224,122,106,0.32),transparent_52%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.45) 2px, rgba(0,0,0,0.45) 3px)',
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-white/8 to-transparent"
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <m.div
                key={film.title}
                className="absolute inset-0 flex flex-col items-center justify-center p-3.5 text-center"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="label-track text-[9px] text-warn uppercase">Feature</span>
                <p className="font-display mt-2 text-lg font-bold text-paper sm:text-xl">
                  {film.title}
                </p>
                <p className="mt-1.5 text-sm tracking-wide text-mist">{film.year}</p>
                <span className="mt-3 h-px w-8 bg-warn/55" aria-hidden />
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-1.5 pb-0.5">
          {data.films.map((f, i) => (
            <span
              key={f.title}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-warn shadow-[0_0_8px_rgba(224,122,106,0.45)]' : 'w-3 bg-line'
              }`}
            />
          ))}
        </div>
      </div>
    </BentoCard>
  )
}
