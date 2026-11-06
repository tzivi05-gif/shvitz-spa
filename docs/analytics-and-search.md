# Analytics and search setup — November 6, 2026

## Analytics status
The Vercel Web Analytics SDK is integrated globally. The existing production project is shvitz-spa, under tzivis-projects-ef8db574. Before setup the analytics script returned 404; after deployment /_vercel/insights/script.js returned HTTP 200 with the actual Vercel JavaScript tracker. The private dashboard and collected events remain unverified because the Vercel connection is not available. Do not claim that collection is disabled or enabled solely from source inspection, and do not claim historical visitors were counted. Do not enable paid upgrades without authorization.

After the hosting connection is available, confirm the project owns www.theshvitz.com, check whether Web Analytics is enabled and enable it on the current plan if necessary, deploy again if required, verify the script loads and an ordinary human visit appears in the dashboard. Avoid manufacturing traffic or calling a simulated request a human.

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
Connect Vercel to verify collection and inspect analytics; enable Web Analytics only if the dashboard shows it is not enabled. Search Console/Bing Webmaster Tools ownership and sitemap submission require owner account access; neither submission nor indexing is claimed. Review business listing consistency only through an authorized connected account, respecting the private street-address preference.

## Primary documentation
https://vercel.com/docs/analytics
https://vercel.com/docs/analytics/quickstart
https://developers.google.com/search/docs/appearance/ai-features
https://developers.openai.com/api/docs/bots

## Live checks after release
Production returned HTTP 200 for homepage, /visit, /robots.txt, /sitemap.xml, cold-plunge guide and the real analytics tracker script. The sitemap contains nine public URLs; robots allows OAI-SearchBot. Live homepage includes the visitor FAQs, six services in valid JSON-LD, men18+ public-hours policy, and no owner name or street address. Dashboard access and actual event collection are still unverified.
