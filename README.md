# NR & Associates — Next.js Site

This is a Next.js 14 (App Router) rebuild of the original React + Vite landing
page, converted so every major section can also be indexed as its own
SEO-optimized page.

## Why this migration

The original site was a single-page React app: all content lived under one
route (`/`) and search engines only ever saw one URL with one title/meta
description. This version keeps that full scrolling homepage **and** adds a
dedicated route per section, each with its own title, meta description,
Open Graph tags, and canonical URL:

- `/` — full homepage (Hero, About, Services, Clients, Contact)
- `/about` — About Us
- `/services` — Services
- `/clients` — Clients
- `/contact` — Contact (working form)

A `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`) are
generated automatically from that route list, and each page ships
server-rendered HTML (Next.js App Router renders on the server by default),
so search engines see fully-formed content without running JavaScript.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit NEXT_PUBLIC_SITE_URL etc.
npm run dev
```

Open http://localhost:3000.

## Contact form

`app/api/contact/route.ts` replaces the old `submit.php`. It validates and
rate-limits submissions the same way the PHP script did. To actually deliver
emails, sign up for [Resend](https://resend.com) (or swap in your own
provider) and set in `.env.local`:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=admin@nr-associates.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Without these set, submissions are still validated and logged to the server
console — nothing crashes, but no email is sent.

## Deployment

Any Node.js host that supports Next.js works (Vercel is the simplest — zero
config). Since this app uses a server-side API route for the contact form,
it cannot be deployed as static HTML only (no more Apache/PHP hosting
needed — the previous `.htaccess` and `submit.php` are no longer used).

Before going live, set `NEXT_PUBLIC_SITE_URL` to the real production domain
so metadata, the sitemap, and canonical URLs are correct.

## What changed from the original repo

- Vite + React Router → Next.js App Router (file-based routing)
- Single route (`/`) → home page + 4 dedicated SEO pages
- `<title>`/meta tags hardcoded in `index.html` → per-page `generateMetadata`/`export const metadata`
- No sitemap/robots → `app/sitemap.ts` + `app/robots.ts`
- `submit.php` → `app/api/contact/route.ts`
- `<img>` tags → `next/image` (automatic optimization, lazy loading)
- Unused shadcn/ui components (accordion, calendar, carousel, etc. — not
  referenced anywhere in the original site) were dropped to keep the
  dependency tree lean. Only Button, Input, Textarea, Tooltip and the
  sonner-based toast were ported, since those were the only ones actually
  used.
