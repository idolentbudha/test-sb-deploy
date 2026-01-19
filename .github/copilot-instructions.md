# Copilot Instructions for biglight-task

These notes help AI agents work productively in this repo. Keep guidance concrete and codebase-specific.

## Architecture Overview

- SPA built with Vite + Preact. Entry at [index.html](../index.html) mounts `#app` and loads [src/index.tsx](../src/index.tsx).
- Routing via `preact-iso`: `LocationProvider` + `Router` + `Route`. See [src/index.tsx](../src/index.tsx) for route registration and [src/components/Header.tsx](../src/components/Header.tsx) for nav using `useLocation()` to highlight the active link.
- Pages live under [src/pages](../src/pages). Current routes: `/` → [src/pages/Home/index.tsx](../src/pages/Home/index.tsx); default → [src/pages/\_404.tsx](../src/pages/_404.tsx).
- Styling uses Tailwind v4 via the Vite plugin (`@tailwindcss/vite`) and a global stylesheet importing Tailwind at the top of [src/style.css](../src/style.css). Page-specific CSS is colocated (e.g., [src/pages/Home/style.css](../src/pages/Home/style.css)).
- Assets live in [src/assets](../src/assets). Example: `preact.svg` is imported and used in the Home page.

## TypeScript / JSX Setup

- `tsx` with Preact: see [tsconfig.json](../tsconfig.json) (`jsx: react-jsx`, `jsxImportSource: preact`). React compat aliases are configured for libs expecting `react`/`react-dom`.
- Note: [src/index.tsx](../src/index.tsx) currently imports components with `.jsx` extensions while the files are `.tsx`. Either keep imports consistent with file extensions or switch to extensionless imports; Vite will resolve appropriately if aligned.

## Dev Workflows

- Install deps: `npm install`
- Start dev server (HMR on http://localhost:5173): `npm run dev`
- Production build to `dist/`: `npm run build`
- Preview production build at http://localhost:4173: `npm run preview`
- Linting: ESLint is configured with `eslint-config-preact` (see `eslintConfig` in [package.json](../package.json)); no script exists, but `npx eslint .` works if needed.

## Tailwind Usage

- Tailwind v4 is enabled by the plugin in [vite.config.ts](../vite.config.ts). No `tailwind.config.js` is required by default.
- Use utility classes directly in JSX (e.g., `class="grid gap-4"`). Global CSS can also use Tailwind via `@import "tailwindcss";` in [src/style.css](../src/style.css).

## Routing Pattern (preact-iso)

- Register routes in [src/index.tsx](../src/index.tsx) using `<Route path="..." component={...} />`.
- Add nav links in [src/components/Header.tsx](../src/components/Header.tsx); use `useLocation()` to derive active state.
- Example to add `/about`:
  - Create [src/pages/About/index.tsx](../src/pages/About/index.tsx) exporting `About`.
  - Add `<Route path="/about" component={About} />` in `Router`.
  - Add `<a href="/about" class={url == '/about' && 'active'}>` in `Header`.

## Conventions

- Components are simple named functions exported from their file (e.g., `export function Home()` in [src/pages/Home/index.tsx](../src/pages/Home/index.tsx)).
- Colocate simple CSS alongside pages; keep shared/global rules in [src/style.css](../src/style.css).
- Keep imports relative within `src/`; place shared media in [src/assets](../src/assets).

## Adding Dependencies

- Prefer ESM-friendly packages; Vite builds ESM by default.
- For React-only libs, TS path aliases map react and react-dom to Preact compat (see [tsconfig.json](../tsconfig.json)).

## Tokens (Style Dictionary)

- Multi-brand token system is fully wired using Style Dictionary. Source tokens are in [tokens-custom/figma-tokens.json](../tokens-custom/figma-tokens.json).
- Build tokens to CSS: `npm run build:tokens` — generates `build/css/primitives.css`, `build/css/brand-branda.css`, and `build/css/brand-brandb.css`.
- Token build config in [config.js](../config.js) with [build-tokens.js](../build-tokens.js) as the runner.
- Custom transforms/parsers:
  - `name/clean-ids`: Cleans variable names (removes category prefixes like "Primitives", "Alias colours").
  - `token-unwrapper`: Lifts tokens to root for reference resolution, filters by brand during multi-brand builds.
  - `fixReferenceStrings`: Cleans internal references (strips "Colour.", "Brand.", etc.).
- Output: CSS custom properties with `--` prefix, scoped to `.brand-branda`, `.brand-brandb`, and `:root` (primitives).
- To add tokens: Edit [tokens-custom/figma-tokens.json](../tokens-custom/figma-tokens.json) and run `npm run build:tokens`.
- To add a new brand: Add brand name to the `brands` array in [config.js](../config.js); the build loop auto-generates brand-specific CSS.
