# Product Design QA

- Source visual truth: `qa/source.png`
- Rendered implementation: `qa/desktop.png`
- Combined comparison evidence: `qa/comparison.png`
- Responsive evidence: `qa/mobile.png`, `qa/story-mobile.png`, `qa/community-mobile.png`
- Story-section reference: `qa/story-reference.png`
- Story-section implementation: `qa/story-desktop.png`, `qa/community-desktop.png`
- Story-section comparison: `qa/story-comparison.png`
- Story CTA hover evidence: `qa/cta-hover.png`
- Flavor-section reference: `qa/flavor-reference.png`
- Flavor-section implementation: `qa/flavor-desktop.png`, `qa/flavor-mobile.png`
- Flavor-section comparison: `qa/flavor-comparison.png`
- Promo-section reference: `qa/promo-reference.png`
- Promo-section implementation: `qa/promos-desktop.png`, `qa/promos-mobile.png`, `qa/promo-tramp-mobile.png`
- Promo-section comparison: `qa/promo-comparison.png`
- Footer evidence: `qa/footer-desktop.png`, `qa/footer-mobile.png`, `qa/footer-bottom-mobile.png`
- Desktop viewport: 1440 x 1024 CSS px, device scale factor 1
- Mobile viewport: 390 x 844 CSS px, device scale factor 1
- Source pixels: 1486 x 1059
- Implementation pixels: 1440 x 1024
- Density normalization: source rendered with `object-fit: contain` inside a 1440 x 1024 panel; effective source size is approximately 1437 x 1024 with minimal horizontal letterboxing
- State: hero fully settled after entrance animation; mobile screenshot uses the closed navigation state

## Full-view Comparison

The final side-by-side comparison preserves the selected concept's warm cream field, red oversized two-line headline, deep green UI copy, flanking illustrated groups, centered CTA, and compact header. The implementation intentionally uses live HTML text and controls while retaining the mock's visual hierarchy.

The story comparison preserves the reference's alternating red and green full-width panels, left-side food/hand imagery, right-side editorial copy, rounded red panel edge, and scroll-led image reveal. The Russian copy and Burger Motel assets adapt the reference rather than duplicating its branding.

## Focused Comparison

The hero remains covered by the original 2880 x 1024 combined comparison. The story section has a separate 2880 x 1100 comparison so its panel proportions, image positions, typography, and color transition can be judged next to the live reference.

## Required Fidelity Surfaces

- Fonts and typography: condensed system display stack reproduces the heavy headline hierarchy without loading external assets; navigation and supporting copy remain readable at both tested widths.
- Spacing and layout rhythm: header, centered copy, flanking illustrations, CTA, and lower band maintain the source composition without horizontal overflow at 1440 px or 390 px.
- Colors and tokens: cream, tomato red, and forest green map consistently to CSS variables and preserve source contrast.
- Image quality and asset fidelity: both supplied transparent PNG illustrations are used directly at native quality; no CSS or SVG substitutes were introduced.
- Copy and content: Russian brand copy is coherent, concise, and matches the selected concept.
- Behavior and accessibility: menu and CTA triggers work, the mobile menu opens and closes, focus styles are visible, controls meet practical mobile target sizing, and reduced-motion users receive an effectively static reveal.
- Scroll behavior: both supplied hand images use requestAnimationFrame-driven transforms. Motion samples are monotonic with scroll, preserve the section layout, and switch to a static final position when reduced motion is requested.

## Comparison History

### Pass 1

- P2: Desktop headline and both hero illustrations were underscaled compared with the source, weakening the edge-to-edge composition.
- Fix: increased the desktop display scale, widened the copy region, and enlarged/repositioned both supplied illustrations.

### Pass 2

- Post-fix evidence: `qa/comparison.png` shows the corrected headline and illustration scale.
- P2: mobile header actions were below the preferred 44 px touch target.
- Fix: set the mobile menu and order controls to a minimum 44 px height.

### Final Pass

- No actionable P0, P1, or P2 findings remain.
- Browser-rendered desktop and mobile captures completed with no console errors and no horizontal overflow.
- Motion samples confirm the images begin below the viewport, overshoot the resting position, rebound, and settle at their final transform.
- Story motion samples confirm the burger hand rises from `190px` to `-51px` across the available desktop scroll range; the second hand enters progressively in the green panel.

## Primary Interactions Tested

- Desktop menu trigger opens the notice dialog and its close control works.
- Mobile navigation opens, reports `aria-expanded="true"`, becomes visible after its transition, and closes again.
- Hero images complete the staggered spring entrance without layout shift.
- Both story images rise on scroll; the movement is throttled to one update per animation frame.
- Story CTAs use a two-arrow swap inside a fixed circular viewport. Hover and keyboard focus trigger the same movement without changing the link dimensions.

### CTA Hover Pass

- The reference CTA was inspected in its rendered hover state and in its source Lottie configuration.
- The local implementation reproduces the visual behavior with two Lucide arrow assets: the visible arrow exits to the right while its replacement enters from the left.
- Hover, `focus-visible`, and motion-reduced states were tested in Chromium with no console errors or horizontal overflow.

### Flavor Section Pass

- The new cream section preserves the reference's oversized two-line red headline, centered supporting copy, circular floating imagery, and centered arrow CTA.
- The reference's people and kitchen thumbnails were intentionally replaced with Burger Motel food imagery: close-cropped burgers and generated fries photography.
- Desktop keeps five staggered circles; mobile uses four edge-positioned circles so no food image obscures the headline, paragraph, or CTA.
- Scroll samples confirm the visible circles rise by approximately 130-170 px across the available mobile scroll range. Desktop and mobile captures have no console errors or horizontal overflow.

### Promo And Footer Pass

- The two-card layout preserves the reference's paired promotional composition, full-height product/person cutouts, large condensed headings, compact supporting copy, and circular arrow controls.
- Supplied `kola.png` and `tramp.png` assets are used directly with responsive crops. Their native alpha is preserved and both assets load successfully in browser checks.
- Mobile cards stack without headline or supporting-copy collisions; the second card was captured separately to verify the full portrait crop.
- The footer includes a strong Burger Motel wordmark, brand line, order CTA, navigation, company links, social destinations, copyright, privacy, and service links.
- Desktop and mobile renders have no console errors or horizontal overflow. Promo hover raises the image without changing card dimensions.

### Hero And Community Positioning Pass

- Reduced both edge illustrations across desktop, tablet, and mobile breakpoints so their visible groups sit comfortably below the header and leave more breathing room around the central hero copy.
- Raised the `koza.png` hand in the green community panel at every breakpoint while preserving its scroll-driven lift.
- Verified at 1440 x 1024 and 390 x 844. The corrected captures are `qa/fix-after-hero-desktop.png`, `qa/fix-after-hero-mobile.png`, `qa/fix-after-koza-desktop.png`, and `qa/fix-after-koza-mobile.png`.
- Browser checks report no console errors and no horizontal overflow.

## Follow-up Polish

- P3: the reference footer includes a faint decorative line pattern; the implementation keeps the footer field solid to preserve the Burger Motel palette and avoid introducing unrelated artwork.

final result: passed
