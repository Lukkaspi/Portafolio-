# Portafolio · 3D Keyboard
Deploy test
A 3D-keyboard portfolio for an Industrial Design & Product Development Engineering student. Each key on the keyboard is a project; hover lights it up, click opens the project detail page. Mobile devices automatically get a clean 2D card grid for performance and usability.

- **Desktop:** 3D scene built with React Three Fiber.
- **Mobile / coarse pointers:** 2D project grid (no Three.js loaded).
- **Routing:** `HashRouter` so deep links survive on GitHub Pages (`/#/project/<slug>`).
- **Deploy:** GitHub Pages via GitHub Actions on push to `main`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

For local dev the Vite base path is overridden so routes work at `/`. For the production build it’s set to `/Portafolio-/` (matches the GitHub Pages URL).

## Editing content

All project content lives in [`src/data/projects.js`](src/data/projects.js). For each project you can edit:

- `title`, `role`, `year`, `tag`, `summary`
- `problem` — the brief / pain
- `process` — array of `{ title, body }` steps
- `technical` — key/value pairs (or `null`)
- `outcome` — result / impact
- `images` — array of paths under `public/images/projects/<slug>/` (no leading slash)

Drop real photography or renders into `public/images/projects/<slug>/` and reference them from `images`. Placeholder SVG covers ship in v1; replace at your pace.

## Keyboard mapping

| Project | Key |
|---|---|
| CUPRA Concept Car | **Space** (highlighted) |
| Car Sketches | C |
| Microplastics Filter | M |
| Aparca't | A |
| UAB Hackathon | H |
| University Sheets | U |
| Technical Drawings | T |
| Intercom Study | I |
| Urn Packaging | R |
| DAM Beverage | D |

Other keys render dimmed and read “Coming Soon” on hover.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**.
3. Merge to `main`. The workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes to `https://<user>.github.io/Portafolio-/`.

If you fork or rename the repo, update `base` in [`vite.config.js`](vite.config.js) to match the new path (or set `VITE_BASE` in the workflow env).

## Deploy elsewhere (optional)

- **Vercel / Netlify:** import the repo. Build command `npm run build`, output `dist`. Set env `VITE_BASE=/` so the bundle is served from the site root.

## Tech

- Vite + React 18
- React Three Fiber + drei
- TailwindCSS
- React Router (HashRouter)

## Project status

This is the MVP iteration: keyboard, project pages, mobile fallback, deploy. Performance polish, advanced animations and final asset swap-in are planned for the next iteration.
