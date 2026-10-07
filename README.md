# Het Patel portfolio

A responsive React + Vite portfolio with a typed name-garden intro, GSAP horizontal selected-work gallery, infinite draggable archive of 17 projects, a springing footer, project detail dialogs, and light/dark themes.

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
- `src/components/`: garden intro, selected-work gallery, project slider, and footer motion.
- `src/lib/garden.js`: local canvas drawing engine adapted from the supplied reference.
- `src/index.css`: fonts and light/dark design tokens.
- `src/App.css`: responsive styling.
- `public/het-resume.pdf`: downloadable resume.
- `DESIGN.md`: design rationale, image-generation prompt, and asset sources.
- `COVER_ART.md`: generated project-cover prompts and final asset paths.

## Browser verification

With the development server running on port 5173 and Chrome installed:

```sh
node scripts/verify.mjs
node scripts/verify-touch.mjs
```

Checks the intro and skip/replay behavior, all four selected covers, infinite wrapping, drag and keyboard controls, filters, native dialogs and focus restoration, theme persistence, reduced motion, clipboard copying, the resume PDF, asset loading, and overflow at five viewport widths. Screenshots go into the ignored `artifacts` directory. Set `PREVIEW_URL` to test another local port.

The touch check sends mobile touch gestures to verify both horizontal galleries, vertical page scrolling over the carousel, the footer spring returning to a flat edge, and the reduced-motion intro.

`node scripts/social-preview.mjs` refreshes the share image from the implemented hero. `node scripts/fetch-assets.mjs` refreshes optimized app screenshots from the public listings.
