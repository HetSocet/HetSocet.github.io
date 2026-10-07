# Het Patel portfolio

A responsive React + Vite portfolio with GSAP motion, real app screenshots, 16 project summaries, a filterable archive, project detail dialogs, and light/dark themes.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

The existing GitHub Pages workflow deploys `dist` on pushes to `main`. The custom domain is `het-dev.me`; `public/CNAME` preserves it in the build.

## Update content

- `src/data/projects.js`: contact links, project summaries, contributions, stacks, and public URLs.
- `src/App.jsx`: intro, experience, education, and section layout.
- `src/index.css`: fonts and light/dark design tokens.
- `src/App.css`: responsive styling.
- `public/het-resume.pdf`: downloadable resume.
- `DESIGN.md`: design rationale, image-generation prompt, and asset sources.

## Browser verification

With the development server running on port 5173 and Chrome installed:

```sh
node scripts/verify.mjs
```

Checks navigation, filters, archive expansion, native dialogs and focus restoration, theme persistence, reduced motion, clipboard copying, the resume PDF, asset loading, and overflow at five viewport widths. Screenshots go into the ignored `artifacts` directory.

`node scripts/social-preview.mjs` refreshes the share image from the implemented hero. `node scripts/fetch-assets.mjs` refreshes optimized app screenshots from the public listings.
