import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const outDir = '/opt/cursor/artifacts'
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })

async function shot(width, height, filename) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
    reducedMotion: 'reduce',
  })
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms))
    const height = document.documentElement.scrollHeight
    for (let y = 0; y < height; y += Math.floor(window.innerHeight * 0.6)) {
      window.scrollTo(0, y)
      await delay(120)
    }
    window.scrollTo(0, 0)
    await delay(400)
  })
  await page.screenshot({
    path: `${outDir}/${filename}`,
    fullPage: true,
    type: 'png',
  })
  await page.close()
  console.log('saved', filename)
}

await shot(1280, 800, 'bento-desktop-1280.png')
await shot(390, 844, 'bento-mobile-390.png')
await browser.close()
