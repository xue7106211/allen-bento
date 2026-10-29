import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { BentoGrid } from './components/BentoGrid'
import { site } from './data/cards'

export default function App() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto min-h-dvh max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mb-10 sm:mb-14">
        <m.p
          className="text-sm tracking-[0.18em] text-accent uppercase"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          Design Engineer
        </m.p>
        <m.h1
          className="font-display mt-3 text-4xl leading-[1.05] font-extrabold tracking-tight text-paper sm:text-5xl md:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.05 }}
        >
          {site.name}
          <span className="mx-2 text-mist/50">·</span>
          <span className="text-fog">{site.englishName}</span>
        </m.h1>
        <m.p
          className="mt-4 max-w-xl text-base text-mist sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.12 }}
        >
          {site.role}，{site.tagline}。
          <br className="hidden sm:block" />
          {site.intro}
        </m.p>
      </header>

      <BentoGrid />

      <footer className="mt-12 border-t border-line-soft pt-6 text-sm text-mist">
        <p>
          © {new Date().getFullYear()} {site.name} {site.englishName} · Dynamic Bento · 无 CMS，文案见{' '}
          <code className="rounded bg-panel px-1.5 py-0.5 text-xs text-fog">src/data/cards.ts</code>
        </p>
      </footer>
    </div>
  )
}
