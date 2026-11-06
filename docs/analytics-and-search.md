# Analytics and search setup — November 6, 2026

## Analytics status
The Vercel Web Analytics SDK is integrated globally. Hosting-side Web Analytics must be enabled for the existing production project, shvitz-spa, under tzivis-projects-ef8db574. Its Vercel connection was not available during implementation; do not claim the dashboard is active or that historical visitors were counted. Before setup the production analytics script returned 404. Do not enable paid upgrades without authorization.

After the hosting connection is available, confirm the project owns www.theshvitz.com, enable Web Analytics on the current plan, deploy again if required, verify the script loads and an ordinary human visit appears in the dashboard. Avoid manufacturing traffic or calling a simulated request a human.

Where to read results: Vercel > shvitz-spa > Analytics. Use production environment and www.theshvitz.com hostname. Visitors are daily hashed visitor estimates, not verified unique humans; known bot user agents are excluded by Vercel. Disguised bots can pass; blocked scripts/ad blockers can undercount. Counts start only when collection is active. There is no past-traffic backfill.

The client additionally drops non-production domains, browser automation flagged by navigator.webdriver, and admin/API paths. Query strings and fragments are removed before events are sent. No contact form content, names, emails or custom conversion events are sent. The SDK is cookieless; Vercel processes its documented request-derived analytics data.

To exclude an owner's own browser, visit https://www.theshvitz.com/?analytics=off. This browser-local opt-out persists until https://www.theshvitz.com/?analytics=on is visited. It applies only after the SDK runs and browser storage is available.

## Search changes
- Canonical origin matches the live www domain.
- robots.txt permits public search crawling, including OAI-SearchBot, and references sitemap.xml.
- Sitemap includes homepage, visitor guide, amenities index, and six amenity guides.
- Titles, descriptions, social image metadata and business/service structured data describe Monsey/Rockland, amenities, $75 public entry and men18+ public hours.
- Visible FAQs and /visit answer location, public audience, price, amenities, hours inquiry and private group booking questions.
- No street address, personal owner name, invented opening hours, fabricated reviews, ratings or certifications were introduced. No special AI instruction file or ranking guarantee.

## Next verified business steps
Connect Vercel to activate and inspect analytics. Search Console/Bing Webmaster Tools ownership and sitemap submission require owner account access; neither submission nor indexing is claimed. Review business listing consistency only through an authorized connected account, respecting the private street-address preference.

## Primary documentation
https://vercel.com/docs/analytics
https://vercel.com/docs/analytics/quickstart
https://developers.google.com/search/docs/appearance/ai-features
https://developers.openai.com/api/docs/bots
