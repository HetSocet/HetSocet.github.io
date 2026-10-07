// Extract only the drawing/math methods from the user-provided reference.
// Networking, tracking, editor controls, and export code are deliberately excluded.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
const source = await readFile('intro.md', 'utf8')
const names = ['h','spr','eo','rng','bez','at','jit','path','backend','vine','curl','weave','layerAt','mw','wordParams','grow','gen','genEnd','strokeRange','thorn','leaf','rose','render','wpt','drawStem','drawEl']
const methods = [...source.matchAll(/^  (?:async )?([a-zA-Z]\w*)\([^\n]*\)\s*\{/gm)]
const selected = names.map(name => {
  const index = methods.findIndex(match => match[1] === name)
  if (index < 0) throw new Error(`Missing garden method: ${name}`)
  return source.slice(methods[index].index, methods[index + 1].index).trimEnd()
}).join('\n\n')
const engine = `// Adapted from the canvas drawing source supplied in intro.md.
export class GardenEngine {
  constructor(canvas) {
    this.canvas = canvas; this.g = canvas.getContext('2d');
    this.F = 'Georgia, serif'; this.props = { density: .85 }; this.cache = {};
    this.rand = this.rng(55433); this.letters = [];
    let previous = null;
    [...'Het Patel'].forEach((ch, index) => {
      const same = previous && previous.ch !== ' ';
      const letter = { ch, id: index + 1, birth: 180 + index * 100, tb: 180 + index * 100, ws: same ? previous.ws : Math.floor(this.rand() * 1e9), wi: same ? previous.wi + 1 : 0, prev: same ? previous : null, els: [] };
      if (ch !== ' ') this.gen(letter);
      if (ch === ' ' && previous) this.genEnd(previous, 110);
      this.letters.push(letter); previous = letter;
    });
    this.resize();
  }
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.W = rect.width; this.H = rect.height; this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.W * this.dpr); this.canvas.height = Math.round(this.H * this.dpr);
    this.S = Math.min(this.W * .115, this.H * .2, 145);
    const width = this.letters.reduce((total, letter) => total + this.mw(letter.ch) * this.S, 0);
    let x = (this.W - width) / 2;
    this.letters.forEach(letter => { const w = this.mw(letter.ch) * this.S; letter.x = x + w / 2; letter.y = this.H * .54 + this.S * .33; x += w; });
  }
  draw(time, still = false) {
    const g = this.g;
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); g.clearRect(0, 0, this.W, this.H);
    const style = getComputedStyle(document.documentElement);
    const dark = document.documentElement.dataset.theme === 'dark';
    const C = { red: style.getPropertyValue('--accent').trim(), blue: dark ? '#95ae73' : '#617648', line: '#53692e', text: style.getPropertyValue('--text').trim(), vein: style.getPropertyValue('--surface').trim() };
    const letters = this.letters.filter(letter => letter.birth <= time);
    this.render(this.backend(g), time, { letters, S: this.S, C, boil: !still, recoil: 15, speed: 1, wither: 260, face: false });
    if (!still && letters.length && Math.floor(time / 400) % 2 === 0) {
      const last = letters[letters.length - 1]; g.fillStyle = C.text;
      g.fillRect(last.x + this.mw(last.ch) * this.S / 2 + 7, last.y - this.S * .73, 2, this.S * .83);
    }
  }
${selected}
}
`
await mkdir('src/lib', { recursive: true })
await writeFile('src/lib/garden.js', engine)
