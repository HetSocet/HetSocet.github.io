import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'
import { mkdir, writeFile } from 'node:fs/promises'

await mkdir('artifacts', { recursive: true })
const chrome = await launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless', '--disable-gpu'] })
try {
  const result = await lighthouse('http://127.0.0.1:4173', {
    port: chrome.port, output: ['json', 'html'], logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  })
  await writeFile('artifacts/lighthouse.json', result.report[0])
  await writeFile('artifacts/lighthouse.html', result.report[1])
  console.log(JSON.stringify(Object.fromEntries(Object.entries(result.lhr.categories).map(([key, category]) => [key, Math.round(category.score * 100)]))))
  console.log('Failed audits:', Object.values(result.lhr.audits).filter(a => a.score !== null && a.score < 1).map(a => ({ id: a.id, title: a.title, value: a.displayValue })))
} finally { await chrome.kill() }
