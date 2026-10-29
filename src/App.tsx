import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { BentoGrid } from './components/BentoGrid'
import { site } from './data/cards'

export default function App() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto min-h-dvh max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <header className="relative mb-12 sm:mb-16">
        <m.div
          className="pointer-events-none absolute -top-16 -left-10 h-40 w-56 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <m.p
          className="label-track text-[11px] text-accent uppercase sm:text-xs"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Design Engineer
        </m.p>

        <m.h1
          className="font-display mt-4 max-w-[14ch] text-[2.75rem] leading-[0.98] font-extrabold text-paper sm:mt-5 sm:text-6xl md:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduce ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.name}
          <span className="mx-2.5 text-mist/40" aria-hidden>
            ·
          </span>
          <span className="text-fog">{site.englishName}</span>
        </m.h1>

        <m.div
          className="mt-5 h-px w-16 bg-linear-to-r from-accent/70 to-transparent sm:mt-6"
          aria-hidden
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        <m.p
          className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist sm:mt-6 sm:text-lg sm:leading-relaxed"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-fog">{site.role}</span>
          <span className="text-mist/60">，</span>
          {site.tagline}。
          <br className="hidden sm:block" />
          <span className="mt-1 inline-block sm:mt-0">{site.intro}</span>
        </m.p>
      </header>

      <BentoGrid />

      <footer className="mt-14 border-t border-white/10 pt-6 sm:mt-16">
        <p className="text-sm text-mist">
          © {new Date().getFullYear()} {site.name} {site.englishName}
          <span className="mx-2 text-mist/40">·</span>
          <span className="tracking-wide text-fog/80">Dynamic Bento</span>
        </p>
      </footer>
    </div>
  )
}
