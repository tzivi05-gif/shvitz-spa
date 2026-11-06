# TheShvitz website update — November 5, 2026

## Changes
- New hot-tub lead photo; ten curated facility photos with captions checked visually.
- Corrected cold-plunge, steam-room entrance, lounge, and massage-chair image assignments.
- Compact mobile hero with $75 entry, adults 18+, WhatsApp, phone, full address and directions.
- Seasonal outdoor pool included; hours are requested by message rather than invented.
- Full address in footer, contact section and structured business metadata.
- Existing Next.js/Vercel hosting and contact backend retained.

## Validation
- Independent source review found no release blockers. All 11 gallery/amenity image references exist.
- Production contact endpoint rejected an empty payload with HTTP 400; no email was sent. This confirms validation is reachable, not successful email delivery.
- Default Turbopack build hit a Google font resolver error; Webpack compiled and passed TypeScript. Build command switched to Webpack for a consistent release path.
- Publish through tzivi05-gif/shvitz-spa main, preserving existing Vercel domain. Confirm new live content and build status after push.

## Operating details
$75 entry, 845-594-9120, Monsey, NY. Current regular hours were not supplied; the site directs visitors to ask. No new booking/payment service or automatic external outreach was created.

## Privacy update
Street address, directions links and personal payment name removed from public UI, metadata and payment QR display at owner request. Location shows Monsey, NY only.

## Owner-supplied cold plunge photo
Replaced the incorrect cold-plunge photograph in the amenities and gallery with the photo supplied by the owner. The earlier visual identification was wrong.
