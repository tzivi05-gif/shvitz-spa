This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contact Form Email Setup

The contact form sends email using Resend. Create a `.env.local` file in the
project root (or edit the existing one) with:

```
RESEND_API_KEY=your_resend_api_key
CONTACT_TO=your_inbox@example.com
```

**Free (no domain needed):** Do **not** set `CONTACT_FROM`. The app will send from
`Shvitz <onboarding@resend.dev>` (Resend’s test sender). Resend’s free tier gives
3,000 emails/month, 100/day—no domain verification required.

**Custom domain (e.g. contact@theshvitz.com):** Verify your domain at
https://resend.com/domains, then set `CONTACT_FROM=Shvitz <contact@theshvitz.com>`.

## Deployment (Vercel)

Add the same environment variables in Vercel:

- `RESEND_API_KEY`
- `CONTACT_TO`
- `CONTACT_FROM`

Then redeploy to apply the changes.

Quick path in Vercel: Project → Settings → Environment Variables
Add the three keys for Production (and Preview if you want staging emails).
Docs: https://vercel.com/docs/projects/environment-variables

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
