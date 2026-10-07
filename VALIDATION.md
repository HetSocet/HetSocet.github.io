# Verification

Verified on October 7, 2026 using local Chrome and the production Vite build.

- Production build: passed.
- Browser checks: passed for section navigation, native project dialogs, Escape handling and focus restoration, all archive filters, expand/collapse, theme persistence, clipboard copying, and the downloadable PDF.
- Layout: no horizontal overflow at 320, 390, 768, 1024, or 1440 pixels. The normal-motion production hero was separately checked throughout its entrance at 320 pixels.
- Visual review: desktop and mobile, light and dark themes, project gallery, full page, and project dialog.
- Reduced motion: animations and smooth-scroll enhancements revert to the static/native experience.
- Runtime: no JavaScript errors or failed local assets in the browser verification run.
- Lighthouse mobile: performance 91, accessibility 100, best practices 100, SEO 100. Simulated FCP 1.8 seconds and LCP 3.4 seconds; these are lab measurements, not field performance guarantees.
- The detailed accessible-label warning from the initial audit was fixed and is absent from the final audit.

Reports and screenshots are in the ignored `artifacts/` directory. Run `node scripts/verify.mjs` with the development server on port 5173; run `node scripts/audit.mjs` with the production preview on port 4173. The audit script currently points to the Windows Chrome installation used for this verification.

No deployment or git commit was performed. The existing GitHub Pages workflow remains available to publish the production build when changes are pushed to main.
