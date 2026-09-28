# Content swap

Approved copy replaces placeholder copy without changing components.

1. Edit values in `content/` only.
2. Set `meta.placeholder` to `false` and `meta.approved` to `true` on each record that is cleared for publication.
3. Point `content/media.ts` entries at approved photography. The `replacementId` field names the future asset.
4. Replace `public/brand/logo-primary.svg` with the official logo. If a reversed logo is supplied, place it at `public/brand/logo-reversed.svg` and use it in the footer instead of the legal-name text.
5. Set `CONTENT_MODE=strict` and rebuild. The build logs every remaining placeholder. Strict mode also drops records marked `omitIfUnapproved`.
6. `robots.ts` and the Organization JSON-LD turn on only when the content mode is strict and nothing is still unapproved.
