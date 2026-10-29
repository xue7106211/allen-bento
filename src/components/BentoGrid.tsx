import { cards } from '../data/cards'
import { ContactCard } from './cards/ContactCard'
import { DesignToCodeCard } from './cards/DesignToCodeCard'
import { FigmaScanCard } from './cards/FigmaScanCard'
import { FitnessCard } from './cards/FitnessCard'
import { HorrorCard } from './cards/HorrorCard'
import { LuckyCard } from './cards/LuckyCard'
import { TimelineCard } from './cards/TimelineCard'
import { TokensCard } from './cards/TokensCard'

export function BentoGrid() {
  return (
    <section
      aria-label="动态 Bento 卡片"
      className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5"
    >
      {cards.map((card) => {
        switch (card.id) {
          case 'timeline':
            return <TimelineCard key={card.id} data={card} />
          case 'tokens':
            return <TokensCard key={card.id} data={card} />
          case 'figma-scan':
            return <FigmaScanCard key={card.id} data={card} />
          case 'design-to-code':
            return <DesignToCodeCard key={card.id} data={card} />
          case 'lucky':
            return <LuckyCard key={card.id} data={card} />
          case 'horror':
            return <HorrorCard key={card.id} data={card} />
          case 'fitness':
            return <FitnessCard key={card.id} data={card} />
          case 'contact':
            return <ContactCard key={card.id} data={card} />
          default:
            return null
        }
      })}
    </section>
  )
}
