## Vanshaj's Portfolio

Modern personal portfolio built with React, Vite, and Tailwind CSS. It highlights projects, experience, and contact links, custom cursor, and animation flourishes powered by Lenis, GSAP, and Motion.

### Features

- SPA with React Router pages for home, projects, and 404.
- Custom round cursor that lerps to pointer position.
- Project gallery fed by `src/components/projectDetails/projects.js` with responsive WebP assets.
- Tailwind CSS styling with reusable UI bits (CTA button, shiny text, docked socials).

### Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3
- GSAP, Motion, Lenis, OGL (effects)
- React Router 7

### Getting Started

Prerequisites: Node 18+ and npm.

```bash
npm install
npm run dev        # start dev server (Vite)
npm run build      # production build
npm run preview    # preview production build locally
npm run lint       # eslint checks
```

The app mounts at `src/main.jsx` and routes are defined in `src/App.jsx`.

### Customization

- Projects: edit `src/components/projectDetails/projects.js` (name, link, about, techs, image key). Corresponding WebP images live in `public/assets/webpImgs/`.
- Branding/assets: update logos, icons, and fonts in `public/assets/`.
- Styles: global styles in `src/index.css`; Tailwind config in `tailwind.config.js`.

### Project Structure (key files)

- `src/App.jsx` — layout, smooth scroll wrapper, router, preloader, custom cursor.
- `src/pages/Home.jsx` — landing sections (hero, intro, experience, projects).
- `src/pages/projects.jsx` — project listings page.
- `src/components/*` — UI sections and utilities.

### Deploying

This project is Deployed on Netlify.
