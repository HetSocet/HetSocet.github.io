import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width:390,height:844 }, isMobile: true, hasTouch: true, colorScheme: 'light' })
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5173'
try {
  await page.addInitScript(() => sessionStorage.setItem('het-intro-seen', 'true'))
  await page.goto(base)
  await page.waitForTimeout(700)
  const navigate = async name => { await page.getByRole('button', { name:'Open navigation' }).tap(); await page.getByRole('link',{name}).tap(); await page.waitForTimeout(1100) }
  const session = await page.context().newCDPSession(page)
  const swipe = async (x, y, endX, endY) => {
    await session.send('Input.dispatchTouchEvent', { type:'touchStart',touchPoints:[{x,y}] })
    for (let i=1;i<=12;i++) { await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+(endX-x)*i/12,y:y+(endY-y)*i/12}]});await page.waitForTimeout(16) }
    await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
    await page.waitForTimeout(950)
  }
  await navigate(/^Work/)
  let box = await page.locator('.selected-viewport').boundingBox()
  await swipe(325, box.y+100, 65, box.y+100)
  assert.ok(await page.locator('.selected-viewport').evaluate(node=>node.scrollLeft>150), 'Selected covers swipe horizontally')
  await navigate('All projects')
  box=await page.locator('.slider-viewport').boundingBox()
  await swipe(320, box.y+130, 60, box.y+130)
  assert.match(await page.locator('.slider-controls').textContent(), /02 \/ 17 Mr\. Brush/)
  assert.ok(!await page.locator('.project-dialog').isVisible())
  const y=await page.evaluate(()=>scrollY)
  await swipe(195, box.y+200, 195, box.y+40)
  assert.ok(await page.evaluate(()=>scrollY)>y+70, 'Vertical page scrolling remains available over the carousel')
  await navigate('All projects')
  await page.evaluate(()=>window.waveSamples=[])
  await page.locator('.footer-wave path').evaluate(node=>{
    const observer=new MutationObserver(()=>window.waveSamples.push(node.getAttribute('d')))
    observer.observe(node,{attributes:true,attributeFilter:['d']});window.waveObserver=observer
  })
  await navigate('Let’s talk')
  await page.waitForTimeout(2100)
  const samples=await page.evaluate(()=>window.waveSamples)
  assert.ok(samples.length>10 && new Set(samples).size>10, 'Footer curve animates as it enters the viewport')
  const ys=await page.locator('.footer-wave path').evaluate(node=>[0,180,360,720,1080,1440].map(x=>{const length=node.getTotalLength();for(let i=0;i<=length;i+=2){const p=node.getPointAtLength(i);if(Math.abs(p.x-x)<3)return p.y}return 80}))
  assert.ok(ys.every(y=>Math.abs(y-80)<1), 'Footer edge settles flat')
  await page.screenshot({path:'artifacts/footer-mobile.png'})
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.getByRole('button',{name:'Replay intro'}).tap()
  await page.locator('.garden-intro').waitFor({state:'detached'})
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'')
  assert.ok(!await page.locator('#work').evaluate(node=>node.parentElement.classList.contains('pin-spacer')))
  console.log('Passed: touch gallery swipe, infinite slider swipe, native vertical touch scroll, footer spring and settling, reduced-motion intro.')
} finally {await browser.close()}
