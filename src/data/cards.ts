export type CardId =
  | 'timeline'
  | 'tokens'
  | 'figma-scan'
  | 'design-to-code'
  | 'lucky'
  | 'horror'
  | 'fitness'
  | 'contact'

export type CardSpan = {
  col: string
  row?: string
}

export type TimelineNode = {
  year: string
  org: string
  product: string
}

export type TokenLayer = {
  name: string
  label: string
  examples: string[]
}

export type FilmItem = {
  title: string
  year: string
}

export type ContactLink = {
  label: string
  href: string
  hint: string
}

export type CardBase = {
  id: CardId
  title: string
  subtitle: string
  span: CardSpan
}

export type TimelineCardData = CardBase & {
  id: 'timeline'
  nodes: TimelineNode[]
}

export type TokensCardData = CardBase & {
  id: 'tokens'
  countLabel: string
  layers: TokenLayer[]
}

export type FigmaScanCardData = CardBase & {
  id: 'figma-scan'
  boundLabel: string
  unboundLabel: string
}

export type DesignToCodeCardData = CardBase & {
  id: 'design-to-code'
  codeLines: string[]
}

export type LuckyCardData = CardBase & {
  id: 'lucky'
  name: string
  age: string
  weight: string
  breed: string
}

export type HorrorCardData = CardBase & {
  id: 'horror'
  films: FilmItem[]
}

export type FitnessCardData = CardBase & {
  id: 'fitness'
  stepsGoal: number
  stepsCurrent: number
  walkLabel: string
}

export type ContactCardData = CardBase & {
  id: 'contact'
  links: ContactLink[]
}

export type CardData =
  | TimelineCardData
  | TokensCardData
  | FigmaScanCardData
  | DesignToCodeCardData
  | LuckyCardData
  | HorrorCardData
  | FitnessCardData
  | ContactCardData

export const site = {
  name: '薛一飞',
  englishName: 'Allen',
  role: '设计工程师',
  tagline: '长期做设计系统与设计工程化',
  intro:
    '把设计决策沉淀为可复用的系统，让 Token、组件与工具链一起生长。',
} as const

export const cards: CardData[] = [
  {
    id: 'timeline',
    title: '设计系统主线',
    subtitle: '从飞书到 HyperOS，四年四站',
    span: { col: 'md:col-span-2', row: 'md:row-span-2' },
    nodes: [
      { year: '2020', org: '字节', product: '飞书' },
      { year: '2022', org: '快手', product: 'KID' },
      { year: '2023', org: '百度', product: 'MEUX' },
      { year: '—', org: '小米', product: 'HyperOS' },
    ],
  },
  {
    id: 'tokens',
    title: '600+ Token',
    subtitle: '三层结构，alias 可流动',
    span: { col: 'md:col-span-2' },
    countLabel: '600+',
    layers: [
      {
        name: 'Reference',
        label: '原始色值与尺度',
        examples: ['blue.500', 'space.4', 'radius.md'],
      },
      {
        name: 'Semantic',
        label: '意图与角色',
        examples: ['color.bg', 'color.accent', 'space.stack'],
      },
      {
        name: 'Component',
        label: '落到组件',
        examples: ['button.bg', 'card.radius', 'input.gap'],
      },
    ],
  },
  {
    id: 'figma-scan',
    title: 'Figma 插件扫描',
    subtitle: '扫过画布，标出 Token 绑定状态',
    span: { col: 'md:col-span-1', row: 'md:row-span-2' },
    boundLabel: '已绑定',
    unboundLabel: '未绑定',
  },
  {
    id: 'design-to-code',
    title: '设计稿转代码',
    subtitle: '矢量示意 → 逐行落地',
    span: { col: 'md:col-span-2' },
    codeLines: [
      '<Button tone="accent">',
      '  {label}',
      '</Button>',
      '',
      'bg: token.button.bg',
      'radius: token.radius.md',
      'pad: token.space.3',
    ],
  },
  {
    id: 'lucky',
    title: 'Lucky',
    subtitle: '家里的首席开心果',
    span: { col: 'md:col-span-1' },
    name: 'Lucky',
    age: '约 7 岁',
    weight: '17 斤',
    breed: '泰迪',
  },
  {
    id: 'horror',
    title: '恐怖片片单',
    subtitle: '胶片翻动，挑一部开吓',
    span: { col: 'md:col-span-1' },
    films: [
      { title: '闪灵', year: '1980' },
      { title: '异形', year: '1979' },
      { title: '午夜凶铃', year: '1998' },
      { title: '遗传厄运', year: '2018' },
      { title: '潜伏', year: '2010' },
    ],
  },
  {
    id: 'fitness',
    title: '健身与遛狗',
    subtitle: '脚步不停，圆环向前',
    span: { col: 'md:col-span-1' },
    stepsGoal: 10000,
    stepsCurrent: 7840,
    walkLabel: '今日遛狗 + 力量训练',
  },
  {
    id: 'contact',
    title: '联系与入口',
    subtitle: '作品与代码都在这里',
    span: { col: 'md:col-span-2' },
    links: [
      {
        label: 'xyf.design',
        href: 'https://xyf.design',
        hint: '个人站点',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/xue7106211',
        hint: 'xue7106211',
      },
    ],
  },
]
