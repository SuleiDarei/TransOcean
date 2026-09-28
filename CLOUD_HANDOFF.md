# TransOcean cloud continuation

## User intent

Take over the existing Claude-built site, improve its design and usability, and deploy to the existing Vercel project. The user then emphasized: "enhance the scroll animations, go wild and figure out what can be improved". They have now requested a ChatGPT cloud task to continue this work. Continue from this implementation; do not rebuild from scratch.

## Source and deployment

- Repository for cloud work: https://github.com/SuleiDarei/TransOcean
- Continuation branch: `codex/astra-scroll-cloud-handoff`
- Starting point before this work: `d1d9a8f`, originally on `design-3-pages`.
- Upstream: https://github.com/ham7a311/TransOcean. The user's writable fork is `SuleiDarei/TransOcean`; avoid pushing upstream or merging main without a reason.
- Production: https://transocean.vercel.app
- Verified production deployment: `dpl_Bby2ut9DstirHkQeQacn8u8qUxgW`, status READY.
- Immutable URL: https://transocean-nvjn9rye8-suleidarei-5862s-projects.vercel.app
- Inspector: https://vercel.com/suleidarei-5862s-projects/transocean/Bby2ut9DstirHkQeQacn8u8qUxgW
- Vercel team: `suleidarei-5862s-projects` (`team_4eoZhUQUYyxmCz6ymzYTPC43`). Project: `transocean` (`prj_Sr31miFJLH57g44SZWwVQJYLwkiX`).
- This production deployment was made from the tested local working tree before creating the handoff commit. Its code is represented by this branch; the handoff documentation was added afterward.
- `.vercel/project.json` is ignored, so a fresh cloud checkout needs linking to the EXISTING project if deployment is available. Do not create another Vercel project. Local CLI authentication does not transfer to cloud. Never copy credentials into a prompt or repository.

## Non-negotiable repository instructions

Read `AGENTS.md` and `CLAUDE.md`. Run all five checks before and after code changes:

```sh
npm run typecheck && npm run lint && npm run check:copy && npm test && npm run build
```

`content/` is client-owned placeholder copy: do not edit it for engineering work. Keep the intentional `meta` approval system, noindex gate in `lib/metadata.ts`, and the placeholder brand name "Logo". Do not invent real offices or company claims. Keep all pages statically rendered; the contact server action is the only server-side entry. No `headers()`, `cookies()`, or `force-dynamic` in pages. No major upgrades to Next, Tailwind, Zod, or Framer Motion. Animations must respect reduced motion. Use Tailwind plus the existing BEM classes in `app/globals.css`, and the `t-*` typography system. Keep tests beside pure logic as `*.test.ts`. No unnecessary dependencies or unrelated fixes.

## Implementation delivered

1. **Waterline hero:** longer native-scroll reveal, camera zoom, separated title movement, corrected short-desktop and mobile composition, film pause/play control, chapter shortcut. Video pauses offscreen and when the document is hidden, and is omitted for reduced motion and Save-Data. See `components/sections/HeroWaterline.tsx`.
2. **Port-call story:** rebuilt as six scroll-driven image wipes with camera movement, reading progress, and an accessible numbered chapter rail. Mobile and reduced-motion modes show normal stacked images and content. See `components/sections/PortCallSequence/PortCallSequence.tsx`.
3. **Vessel passage:** the homepage has a desktop sticky scene mapping ordinary vertical scroll to horizontal vessel comparison. Touch devices and reduced motion retain an ordinary horizontal rail. Previous/next buttons work in both modes. See `components/sections/VesselScale/VesselScale.tsx` and the `cinematic` prop in `app/page.tsx`.
4. **Supporting motion and navigation:** homepage section shortcuts (`VoyageNav`), header reading progress, services image crossfades, coastline reveal, and a reusable `ScrollFrame` for the people photograph. Header becomes visible when it contains keyboard focus.
5. **Motion preference fix:** `lib/hooks/useMotionSafe.ts` wraps Framer's preference with `useSyncExternalStore`, using a conservative server snapshot and a live media-query subscription. All existing motion components now use it. This fixes reduced-motion hydration mismatches and responds to preference changes at runtime. Do not replace it with a direct `useReducedMotion()` conditional in rendered markup: browser testing demonstrated mismatched SSR attributes with that approach.
6. **Enquiry continuity:** service-detail enquiry strips carry the selected service into the contact page. `lib/validation/enquiryPrefill.ts` validates URL prefills, bounds vessel text, and rejects impossible dates and unknown options.
7. **Form recovery:** React's form action reset erased typed fields after errors. The server action now returns submitted values on validation, timing, rate-limit, and delivery failures; fields use these defaults. Browser testing verified preservation of name, message, phone, vessel, and service. An `onReset.preventDefault()` approach did NOT work and was removed. No personal data is persisted in local storage.
8. **Responsive/accessibility fixes:** narrow-screen form grids no longer overflow at 320px; closed map details are inert/hidden; map hash changes synchronize selection and preserve Next's history state; touch-sized vessel/chapter controls.

## Verification completed

- Before changes: all five required checks passed, 19 tests.
- After final application changes: all five required checks passed, 22 tests in five files. The production Vercel build also passed.
- All routes remain static or statically generated. Homepage first-load JavaScript was about 165 kB before and 167 kB after.
- Browser checks: desktop 1440x900 and 1264x631; mobile 390x844 and 320x568; no page overflow on the final 320px homepage and service detail.
- Port-call chapter jump and active stage verified; desktop vessel rail at the halfway point had a sticky viewport at top 0 and the expected horizontal movement.
- Mobile menu traps focus, locks body scroll, closes with Escape, and restores focus to the opener.
- Reduced-motion mode has no hero video, no pinned vessel scene, normal stage images, and no hydration error after the shared-hook fix. Toggling motion preference at runtime restores the normal experience.
- Contact prefill and validation recovery verified without sending an email. Valid live email delivery has NOT been tested.
- Production smoke check: homepage, about, services index, all six service details, network, contact, privacy, terms, and robots.txt returned HTTP 200. Production homepage has six chapter links, new voyage navigation, no horizontal overflow at desktop size, and the intended `noindex, nofollow`.
- Existing non-failing warnings: placeholder content notices, Vitest's future native-config-loader notice, and Vercel's broad Node engine-range warning.

## Important remaining limits

`vercel env ls` returned NO configured environment variables. SMTP is not configured, so the production contact action intentionally returns a delivery error for valid enquiries. Do not claim email works and do not invent mail credentials. SMTP setup needs real user-supplied configuration (`.env.example` lists the keys). Production indexing is intentionally blocked while content remains unapproved. Photography, office markers, legal text, company details, and "Logo" are still approved-for-design placeholders, not verified business facts.

## Recommended continuation

1. Check out the continuation branch and run the baseline checks. Use Node 24 if available (the prior local and Vercel runtimes were Node 24); `npm ci` installs the locked dependencies. A first Next build may require access to Google Fonts for Archivo.
2. Inspect the live site and review the source/diff. Keep the existing nautical chart identity: Archivo variable typography; paper water `#f3f5f2`, ink `#0d2136`, sea blue `#2e5f86`, sand `#e8dfc4`, chart magenta `#be2a78`.
3. Continue a focused visual/motion polish pass with the user's latest scroll-animation emphasis. Potential areas to investigate, not known confirmed defects: tablet/landscape transitions, fast reverse scrolling, hash deep links after hydration, mobile stage tracking when stage heights differ, fleet keyboard interaction, touch/low-power performance, and header/chapter-rail spacing while scrolling upward.
4. Run browser performance/accessibility checks if tools permit; do not make unsupported performance claims. Preserve natural browser scrolling and useful anchor navigation. Prefer transforms and opacity to continuous React rerenders or wheel interception.
5. Keep changes reviewable, run all five checks after code edits, then use the existing Vercel project if credentials are available. The user has authorized improving and deploying this site; do not repeatedly ask for the same approval. If cloud deployment access is absent, finish and commit the tested changes and report the precise missing access.

The desktop chat's temporary screenshots and authenticated local browser sessions are not part of the cloud checkout. Generate fresh evidence in cloud. No dev server needs to be kept alive from the prior session.
