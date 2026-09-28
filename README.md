# Trans Ocean site

Marketing site for a port agency operating in Oman. Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3, framer-motion. All routes prerender statically; the contact form posts to a server action.

## Run

```bash
npm ci
cp .env.example .env.local   # then fill in what you have
npm run dev
```

Node 20.9 or newer.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` / `npm start` | Production build and serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (flat config, Next core-web-vitals rules) |
| `npm test` | Vitest unit tests (`*.test.ts`) |
| `npm run check:copy` | Fails on banned marketing phrases in copy |
| `npm run map:oman` | Regenerates `lib/network/oman.ts` from Natural Earth data (see `scripts/build-oman-map.md`) |

CI runs typecheck, lint, copy check, tests, and build on every pull request.

## Layout

- `app/` routes, metadata, `robots`, `sitemap`, the contact server action.
- `components/` layout chrome, motion wrappers, page blocks, primitives, homepage sections.
- `content/` every string and media reference on the site. Each record carries a `meta` object that marks it placeholder or approved.
- `lib/` hooks, validation, rate limiting, generated map and vessel data.
- `public/media/` placeholder photography and hero video. Cached immutable for a year.

## Content and publication gate

All copy is client placeholder until approved. `scripts/CONTENT_SWAP.md` describes the swap. Two environment values control publication:

- `CONTENT_MODE=strict` drops records marked `omitIfUnapproved` and logs every remaining placeholder at build.
- Indexing (`robots`), canonical tags, and the Organization JSON-LD switch on only when the mode is strict and no record is still unapproved.

`NEXT_PUBLIC_SHOW_PLACEHOLDERS=1` outlines every placeholder in the UI for review.

## Contact form

`app/contact/actions.ts` validates with `lib/validation/contactSchema.ts`, applies a honeypot and a per-IP rate limit, then sends mail through SMTP when `MAIL_HOST` is set. Without SMTP the enquiry is logged in development and rejected in production.

## Environment

See `.env.example`. `SITE_URL` must be the production origin for correct canonical and Open Graph URLs.
