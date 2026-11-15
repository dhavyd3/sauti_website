# Sauti Health website

The public website for Sauti Health. Next.js (App Router), Tailwind CSS, GSAP for scroll animation and Lenis for smooth scrolling. The layout, type scale and motion follow zipline.com; the colours, mark and wording are Sauti's.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` makes the production build and `npm run lint` checks the code.

## Pages

| Route | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/how-it-works` | `app/how-it-works/page.tsx` |
| `/pilot` | `app/pilot/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/privacy` | `app/privacy/page.tsx` |

Also generated: `/sitemap.xml`, `/robots.txt`, the favicon (`app/icon.svg`) and the link-preview image (`app/opengraph-image.tsx`).

## Change the words

All copy is in `lib/content.ts`. Contact details, navigation and the company registration are in `lib/site.ts`. Every fact comes from the old site, the study protocol or the privacy notice; keep it that way.

## Add pictures

Every picture slot is listed in `lib/media.ts`. Until a slot has a file it shows a tinted placeholder. To fill one, put the image in `public/images/` and pass its path as the third argument:

```ts
homeHero: slot("A busy street in Kampala at dusk…", "dusk", "/images/home-hero.jpg"),
```

The shot list and prompts are in `research/image-prompts.md`.

## Edit the team

The team shown on the About page is the `about.team.members` list in `lib/content.ts`. A person without a photo gets an outlined placeholder square. To add a photo, save it in `public/images/team/` and add its path:

```ts
{ name: "Onama John", role: "Technical engineer", photo: "/images/team/onama-john.jpg" },
```

Square or near-square portraits work best. Photos show in black and white and turn to colour on hover.

## Contact form

The form posts to `app/api/contact/route.ts`, which emails the message through [Resend](https://resend.com) and stores nothing. Set these in Vercel under Project → Settings → Environment Variables (names are in `.env.example`):

- `RESEND_API_KEY`
- `CONTACT_FROM`: a sender on a domain verified in Resend, such as `Sauti website <website@sautihealth.com>`
- `CONTACT_TO`: optional, defaults to info@sautihealth.com

Without the key the form tells visitors it is not connected and points them to email and WhatsApp.

## Design rules

- Lime `#C9F44B` is the interactive colour. It is never used as text on cream; `#466D00` is its text-safe shade.
- Only things you can press are pill-shaped. Statuses and categories are plain coloured text.
- No coloured bar on the leading edge of cards or callouts.
- No numbered sections or steps.
- Each section sets `data-header-variant="light"` (dark background) or `"dark"` (light background) so the floating header can take the opposite colour.
- The pinned scroll sections have a stacked version for phones and for visitors who ask for reduced motion.

Design tokens are in `app/globals.css`; component styles in `app/styles/`. The measurements taken from the reference site are in `research/zipline-design-spec.md`.
