# Fastor React frontend

Independent Vite + React + TypeScript frontend inside `react/`. The mobile signup view mirrors the React Native screen, while desktop keeps the same form in a simple centered card layout.

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS 4 through `@tailwindcss/vite`
- TanStack Query for server state
- TanStack Router for typed client routes
- Zustand with persisted UI preferences
- `vite-plugin-pwa` for manifest, service worker, and auto updates
- Sass available for future component-level styles
- Fastor theme tokens mirrored from the React Native app: Mulish, League Spartan, Inter, colors, spacing, and radii

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Structure

```text
src/
  app/                 Query client and router setup
  components/          Shared layout and UI components
  lib/                  API clients and utilities
  pages/                Authentication route-level screens
  store/                Zustand stores
  theme/                React Native-aligned design tokens
  styles/               Shared style entry point for future additions
```

PWA output is generated during `npm run build` in `dist/`.
