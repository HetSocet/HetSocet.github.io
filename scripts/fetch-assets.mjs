import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const apps = { petfinder: 'com.brilworks.petfinder', mrbrush: 'com.brilworksdigital.Mrbrush', cabuno: 'com.brilworks.cabuno', elara: 'com.brilworksdigital.Elara' };
await mkdir('public/images/optimized', { recursive: true });
const sources = {};
for (const [name, id] of Object.entries(apps)) {
  const url = `https://play.google.com/store/apps/details?id=${id}&hl=en`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  const html = await response.text();
  const urls = [...new Set([...html.matchAll(/https:\/\/play-lh\.googleusercontent\.com\/[^\s"<>]+/g)].map(m => m[0]))];
  const screenshots = [...new Set(urls.filter(u => u.includes('=w526-h296')).map(u => u.split('=')[0]))].slice(0, 3);
  sources[name] = { listing: url, screenshots };
  for (const [index, image] of screenshots.entries()) {
    const result = await fetch(`${image}=w720`);
    if (!result.ok) throw new Error(`Image ${name}: ${result.status}`);
    const buffer = Buffer.from(await result.arrayBuffer());
    await sharp(buffer).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/optimized/${name}-${index + 1}.webp`);
    if (index < 2) await sharp(buffer).resize(240).webp({ quality: 80 }).toFile(`public/images/optimized/${name}-${index + 1}-small.webp`);
  }
  console.log(`${name}: saved ${screenshots.length} screenshots`);
}
await writeFile('public/images/sources.json', JSON.stringify(sources, null, 2));
