# SushiSendStatic

The marketing website for SushiSend — `sushisend.com`. Static-first Astro site, deployed to Cloudflare Pages.

> Status: **00.00.00** — Phase 0 scaffold. Home + pricing pages with the real pricing model inlined.

This repo intentionally lives **outside** the main [sushisend](https://github.com/pennydoesdev/sushisend) monorepo so the marketing site can iterate on its own cadence without dragging in the dashboard / API toolchain.

## Stack

- [Astro](https://astro.build) — static-first, minimal JS
- Pure CSS with custom properties (no Tailwind, no CSS-in-JS)
- Cloudflare Pages deployment
- Inter (body), Montserrat (brand) via Google Fonts

## Develop

```bash
nvm use            # Node 20.11.0
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview
```

## Deploy

Cloudflare Pages project → connect this repo → branch `main` → build command `npm run build` → output `dist/`. Custom domain `sushisend.com` (apex + www redirect).

## What's inlined from the monorepo

The brand tokens (`src/styles/tokens.css`) and the pricing model (`src/lib/billing.ts`) are **inlined copies** of `@sushisend/ui/tokens.css` and `@sushisend/billing` from the main monorepo. When the canonical versions change, mirror the update here. Future: publish these as private npm packages and import them.
