import { chromium } from '@playwright/test'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light', reducedMotion: 'reduce' })
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' })
await page.addStyleTag({ content: '.site-header { display: none; } .hero { padding-top: 120px; min-height: 630px; } .hero-art { top: 100px; } .hero .button { display: none; } .hero-description { max-width: 380px; }' })
await page.screenshot({ path: 'public/social-preview.png' })
await browser.close()
