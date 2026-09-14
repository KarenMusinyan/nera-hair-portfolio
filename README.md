# NERA — Hair Stylist Website

**[View demo](https://nera-hair-portfolio.karenmusinyan384.chatgpt.site)** · [Developer](https://github.com/KarenMusinyan)

A concept website for a hairstylist: visitors explore transformations, browse a portfolio and try an appointment form. This is a portfolio demonstration, not a real salon or commissioned client project. Images are generated concept assets.

![NERA visual direction](assets/hero-v2.png)

## What this demonstrates
- Responsive HTML/CSS layouts for a service business.
- Scroll-driven transformation and portfolio sequences in vanilla JavaScript.
- Keyboard navigation, visible focus, labelled fields and announced feedback.
- Reduced-motion gallery showing all projects without scroll animation.
- Dependency-free build that combines styles and checks referenced assets.

## Try it
Browse the transformations, open the booking section and enter **fictional details**. Submit to see validation and confirmation. No request is transmitted or persisted; fields are cleared after a successful demonstration.

## Case study
**Brief:** present a hairstylist's work through a distinctive visual story and a clear path to booking.

**Implementation:** semantic HTML, responsive CSS, vanilla JavaScript interactions, generated imagery and static hosting. Modular source styles become one public stylesheet.

**Scope:** concept design and implementation. No customer results, conversion statistics or salon endorsements are claimed. A production handover would connect the client's booking service and replace illustrative content with approved real work.

## Run locally
Open `index.html` directly, or run `node build.mjs` with Node.js 22+ and serve `dist/`. No packages are required.

## Structure
- `index.html` — content and accessible demo form
- `*.css` — original visual system and usability refinements
- `*.js` — interactions
- `assets/` — generated concept images
- `build.mjs` — validated static build

Created by [Karen Musinyan](https://github.com/KarenMusinyan).
