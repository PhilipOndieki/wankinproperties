# Wankin Properties Limited — Website

Production marketing and listings website for Wankin Properties Limited, a commercial real estate agency in Juja, Kenya.

## Stack

- **Next.js 14** (App Router, React Server Components)
- **TypeScript** (strict mode, `noUncheckedIndexedAccess`)
- **Tailwind CSS 3.4** with custom brand tokens
- **shadcn/ui** primitives (Button, Input, Select, Tabs, Dialog, Sheet, Slider)
- **lucide-react** icons
- **react-hook-form** + **Zod** for form validation
- **next/font** for self-hosted Google Fonts (Inter + Plus Jakarta Sans)
- **next/image** (AVIF/WebP, lazy loading)

## Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Type check and lint

```bash
pnpm typecheck
pnpm lint
```

## Bundle analysis

```bash
pnpm analyze
```

## How to add a new listing

1. Open `/data/listings.json`.
2. Add a new object following the `Listing` type in `/types/listing.ts`. Required fields:
   - `slug` — URL-safe ID, e.g. `"ruai-pipeline-road"`
   - `title`, `location`, `category`, `plotSize`, `price`, `status`
   - `shortDescription` (1 sentence, used on cards)
   - `longDescription` (2-3 paragraphs, no em dashes)
   - `features` (array of strings)
   - `images` (array of `{ src, alt }`)
   - `isFeatured` (boolean)
   - `createdAt` (ISO date string)
3. Drop images into `/public/images/listings/[slug]/`. Use 800x500 JPEG/WebP for best results.
4. Update `src` in the images array to `/images/listings/[slug]/photo-1.jpg`.
5. Run `pnpm build` to verify everything compiles.

The listing will appear at `/properties/[slug]` automatically.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `SMTP_HOST` | SMTP host for inquiry emails |
| `SMTP_PORT` | SMTP port (default: 587) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | From address for outgoing emails |
| `INQUIRY_TO` | Email address that receives inquiries |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps embed API key |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID |

## Deploy to Vercel

1. Push to GitHub.
2. Connect the repository in [vercel.com/new](https://vercel.com/new).
3. Add environment variables in Project Settings.
4. Vercel detects Next.js automatically. No extra config needed.
5. Add the custom domain `wankinproperties.com` in Domain settings.

### Image domains

External placeholder images (`placehold.co`) are allowed in `next.config.ts`. Replace seed image URLs with real hosted images before going live, or add your CDN domain to `remotePatterns`.

## Project structure

```
app/
  (marketing)/          Marketing pages (home, properties, about, contact)
  api/inquiries/        POST endpoint for inquiry form submissions
  layout.tsx            Root layout with fonts and global metadata
  sitemap.ts            Auto-generated sitemap
  robots.ts             Robots.txt
components/
  ui/                   shadcn/ui primitives
  layout/               Header, footer, mobile nav
  home/                 Home page sections
  listings/             Listing card, filters, gallery, inquiry form, WhatsApp button
data/
  listings.json         Seed data (source of truth until a CMS is added)
lib/
  listings.ts           Data access layer (swap for Supabase/Sanity queries here)
  utils.ts              cn(), formatPrice(), formatPhone()
  constants.ts          CONTACT_PHONE, OFFICE_ADDRESS, etc.
  validations.ts        Zod schemas
types/
  listing.ts            TypeScript types
public/
  images/listings/      Listing photos (add real photos here)
  images/brand/         Logo variants
```
