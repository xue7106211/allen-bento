import { cards } from '../data/cards'
import { ContactCard } from './cards/ContactCard'
import { DesignToCodeCard } from './cards/DesignToCodeCard'
import { FigmaScanCard } from './cards/FigmaScanCard'
import { FitnessCard } from './cards/FitnessCard'
import { HorrorCard } from './cards/HorrorCard'
import { LuckyCard } from './cards/LuckyCard'
import { TimelineCard } from './cards/TimelineCard'
import { TokensCard } from './cards/TokensCard'

const delays: Record<string, number> = {
  timeline: 0.04,
  tokens: 0.1,
  'design-to-code': 0.14,
  'figma-scan': 0.18,
  lucky: 0.22,
  horror: 0.26,
  fitness: 0.3,
  contact: 0.34,
}

export function BentoGrid() {
  return (
    <section
      aria-label="动态 Bento 卡片"
      className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-flow-dense md:gap-5 lg:gap-5"
    >
      {cards.map((card) => {
        const delay = delays[card.id] ?? 0
        switch (card.id) {
          case 'timeline':
            return <TimelineCard key={card.id} data={card} delay={delay} />
          case 'tokens':
            return <TokensCard key={card.id} data={card} delay={delay} />
          case 'figma-scan':
            return <FigmaScanCard key={card.id} data={card} delay={delay} />
          case 'design-to-code':
            return <DesignToCodeCard key={card.id} data={card} delay={delay} />
          case 'lucky':
            return <LuckyCard key={card.id} data={card} delay={delay} />
          case 'horror':
            return <HorrorCard key={card.id} data={card} delay={delay} />
          case 'fitness':
            return <FitnessCard key={card.id} data={card} delay={delay} />
          case 'contact':
            return <ContactCard key={card.id} data={card} delay={delay} />
          default:
            return null
        }
      })}
    </section>
  )
}
