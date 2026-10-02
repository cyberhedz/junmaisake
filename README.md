# Junmaisake

A sake marketplace MVP: many independent breweries, one cart, one checkout.
Built with Vite, React, and TypeScript.

## Run it

```bash
npm install
npm run dev
```

Then open the printed localhost URL. `npm run build` produces a static
`dist/` that's ready to deploy to Vercel as-is (see `vercel.json`, which
rewrites all paths to `index.html` so client-side routes don't 404 on
refresh).

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero search, style filter chips, featured breweries, featured + newest bottles |
| `/search?q=&style=` | Search results — free-text query and/or style filter; with no params, also lists all breweries |
| `/sake/:slug` | Product page — image, price, size, brewery, tasting notes, add to cart, more from the brewery |
| `/brewery/:slug` | Brewery storefront — story and their bottles |
| `/cart` | Cart — line items, quantity, subtotal |
| `/checkout` | Checkout — shipping form + order summary, "payment coming soon" |
| `/account` | Mock sign-in / sign-out |
| `/sell` | Seller form — add a product (name, brewery, style, price, size, region, abv, smv, rice, description) |

## What's mocked

- **Payments** — there is no payment processor. Checkout collects shipping
  info and shows an order summary; submitting marks the order "received"
  and clears the cart. No card is ever charged.
- **Auth** — `/account` is a local mock: entering a name and email "signs
  in" by writing to `localStorage`. There's no password, no real account,
  no server.
- **Cart and seller listings** — both live in React Context backed by
  `localStorage` (`junmaisake.cart.v1`, `junmaisake.sellerProducts.v1`,
  `junmaisake.mockUser.v1`), not a database. Data is shaped so it can move
  to a real backend later (stable `id`, human `slug`, plain serializable
  fields — see `src/types/index.ts`).
- **Product images** — there are no bottle photos. Every product and
  brewery uses a solid-color placeholder block instead of stock photography.
- **Seed data** — 8 breweries and 24 products (3 styles × 8 breweries) in
  `src/data/`. Brewery and product names are original to this project;
  regions, rice varieties, and styles are real. No awards are invented.

## Not built in this pass (by design)

Reviews/ratings, ads, shipping-cost calculation, and a full seller admin
are intentionally out of scope for this MVP.

## Stack

Vite + React 18 + TypeScript, React Router for client-side routing, CSS
Modules per component/page plus one shared stylesheet
(`src/styles/global.css` + `src/styles/tokens.css`) for design tokens and
shared primitives (buttons, form fields, grid layout). No UI component
library.
