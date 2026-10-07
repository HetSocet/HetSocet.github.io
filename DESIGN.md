# Het Patel portfolio

## Direction

Full visual overhaul of the former notebook theme. A spacious developer portfolio with Manrope, IBM Plex Mono, off-white/charcoal surfaces, and one acid-green accent. Design dials: variance 8, motion 6, density 3. The installed design-taste-frontend skill guided the redesign.

The supplied references informed typography, portfolio pacing, and image-led work presentation. GSAP powers entry choreography, scroll reveals, hero parallax, and desktop ScrollSmoother. Touch devices use native scrolling. Reduced-motion users receive a static layout. Theme defaults to system preference and supports a saved manual override.

## Content

Project contributions come from help.md and the supplied resume. The resume supplies the full name, contact details, verified LinkedIn URL, employment, and education. The conflicting SOS Pâtisserie free-credit counts were intentionally omitted. No invented project impact metrics or client testimonials are included.

The prior decorative notebook, custom cursor, and unused 3D code were removed. The existing root domain and useful home/work/about/contact/skills anchors remain available.

## Motion and project-gallery update

The name-garden intro adapts the canvas drawing methods supplied in `intro.md` and the timing/appearance of `garden-het-patel-typed.mp4`. Charcoal or off-white lettering, green vines, and lime flowers follow the current theme. It runs once per browser session, has Skip/Escape controls, and can be replayed from the footer. Reduced-motion visitors receive a brief static rendering. The local drawing adapter excludes the reference's network, tracking, editor, and export behavior.

Selected work now uses four image-only covers in a pinned GSAP ScrollTrigger gallery on sufficiently tall desktop viewports. Smaller screens and reduced-motion settings use a native horizontal gallery. Each cover opens the existing project details. The all-projects archive wraps infinitely with GSAP Draggable, arrow controls, keyboard navigation, filters, and supplied app logos. It contains 17 projects, including PetSchool, plus the supplied App Store links.

The contact section uses a MorphSVG curve that springs back according to scroll velocity. Reduced motion keeps the edge flat. Vertical page scrolling remains available throughout the archive carousel.

New conceptual cover artwork, exact prompts, and asset paths are documented in [COVER_ART.md](COVER_ART.md).

Interaction references:

- https://demos.gsap.com/demo/horizontal-scrolling-gallery/
- https://demos.gsap.com/demo/infinite-card-slider/
- https://demos.gsap.com/demo/footer-bounce/

## Artwork and source assets

Final generated artwork: `public/images/optimized/chrome-asterisk.webp`.
Generated with the built-in image_gen tool, then encoded to WebP for delivery. Transparency is preserved.

Final prompt:
> Use case: stylized-concept. Asset type: abstract hero artwork for a refined creative developer portfolio. Create a single sculptural, inflated six-spoke asterisk made of polished liquid chrome, like a sophisticated collectible metal art object. Thick rounded organically fused spokes, beautiful flowing curvature and slightly irregular shape. Three-quarter perspective suspended in space, large central composition, entirely visible with generous 15% padding. Extremely realistic high-end 3D studio render, crisp silver reflections, dark graphite reflective areas, a very subtle acid-green reflection along one lower edge. Strong softbox light from upper left, tactile smooth metal. Transparent background, no floor, no background, no shadow on background. No text, no other objects, no watermark. Square aspect ratio.

Project screenshots are real public Google Play listing assets, stored locally in `public/images/optimized/`. Source URLs are recorded in `public/images/sources.json`. They depict the products, not new designs created for this portfolio. The share image is a browser capture of the implemented hero.

## References consulted

- https://gsap.com/
- https://gsap.com/docs/v3/Plugins/ScrollSmoother/
- https://www.satishhebbal.design/
- https://www.cristianaaraujo.com/
- https://huyml.co/
- https://21st.dev/community/templates

The browser research tool could not retrieve ThreeUI, Duda Works, or Eddy Naboulet. Pesselev Collective exposed no readable page content.
