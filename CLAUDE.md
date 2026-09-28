# Working in this repo

## Before changing anything
- Run `npm run typecheck && npm run lint && npm run check:copy && npm test && npm run build`. All five must pass before and after your change.
- `content/` is client-owned placeholder copy. Do not edit it for engineering work; change components or `lib/` instead.
- The `meta` placeholder system and the noindex gate in `lib/metadata.ts` are intentional. Do not "fix" the site being noindex.
- The brand name "Logo" across titles and JSON-LD is an intentional placeholder.

## Conventions
- Static rendering everywhere. Do not add `headers()`, `cookies()`, or `dynamic = "force-dynamic"` to a page; the only server-side entry is the contact server action.
- Motion: every animation must respect `useReducedMotion`. Follow the pattern in `components/motion/`.
- Styling: Tailwind utilities plus the BEM-style classes in `app/globals.css` for anything animated. No new CSS files.
- Typography goes through the `t-*` classes and `components/primitives/Type.tsx`.
- Tests live next to the code as `*.test.ts` and run with Vitest. Test pure logic (schemas, helpers, actions); do not add DOM tests without a reason.

## Scope discipline
- One concern per pull request. Touch only the files the task needs.
- If you notice an unrelated problem, list it in the PR description instead of fixing it.
- Do not upgrade major versions of `next`, `tailwindcss`, `zod`, or `framer-motion` without an explicit request.
