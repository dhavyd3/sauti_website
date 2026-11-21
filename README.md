# Sauti Health website

The public website for Sauti Health, sautihealth.com. Next.js (App Router) with plain CSS. No animation libraries, no scroll effects: it has to load fast on a phone in Uganda. Hosted on Netlify, which builds it from this repository.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` makes the production build and `npm run lint` checks the code.

## Pages

| Address | File | What it is |
| --- | --- | --- |
| `/` | `app/page.tsx` | Hero, what makes Sauti different, how it works, work with us, founder's note, team, latest news |
| `/contact` | `app/contact/page.tsx` | Contact form and contact details. `/contact?topic=investor` preselects the topic |
| `/news` | `app/news/page.tsx` | All news items |
| `/investors` | `app/investors/page.tsx` | The investor memo with the interactive model. **The QR code on the business cards points here. Never remove it.** |
| `/privacy` | `app/privacy/page.tsx` | Privacy notice |

Also generated: `/sitemap.xml`, `/robots.txt`, the favicon (`app/icon.svg`) and the link-preview picture for WhatsApp and LinkedIn (`app/opengraph-image.tsx`).

The old pages `/about`, `/how-it-works` and `/pilot` redirect to the matching part of the homepage (`next.config.ts`).

## Change the words

- Page text: `lib/content.ts`. Put `**two asterisks**` around words to make them bold.
- Contact details, registration number, navigation: `lib/site.ts`.
- Sentence case everywhere, short sentences. One slogan only: "Every voice counts", in the footer above the "Get in touch" button.

## Add news

Open `content/news.md` (on GitHub: open the file, click the pencil, edit, then "Commit changes"). Each item looks like this, newest first:

```md
## 2026-12-03 | Headline in sentence case
One or two sentences about what happened.
Link: https://example.com/article
```

The date can be a year (`2026`), a month (`2026-11`) or a day (`2026-11-20`). Two optional lines:

- `Link: https://...` makes the card open that page.
- `Image: /images/news/file.jpg | what the picture shows` adds a picture. Put the file in `public/images/news/`. Real photos only. Without a picture the card shows a plain dark tile.

Once there are at least three items, the homepage shows the four newest (until then the homepage news block is hidden; the threshold is `news.minItems` in `lib/content.ts`). `/news` always shows all of them. Netlify rebuilds the site a minute or two after the change is committed.

## Founder's note

In `lib/content.ts`, under `founder`. While `ready: false`, the note is left off the live site and only shows on `npm run dev`, marked as a draft. Paste the final text into `paragraphs` and set `ready: true`.

## Investor page

`/investors` is the investor memo (from the client's `index.html`, November 2026) in the site's design, with the same interactive model: inputs, scenarios, charts, the country ranking and the Monte Carlo. It asks search engines not to list it, as the original did, and it is not in the sitemap.

- Text: `components/investor/InvestorMemo.tsx` (opening, contract and model sections) and `components/investor/MemoText.tsx` (market, data, evidence, round, contact, sources).
- Calculations: `lib/investor/model.ts`, a line-by-line port of the memo's script. Its figures were checked against the original.
- Country data and input ranges: `lib/investor/data.ts`, generated from the memo. If the client sends a new version of the memo, regenerate it instead of editing by hand:

  ```bash
  python scripts/extract-investor-memo.py path/to/index.html lib/investor/data.ts
  ```

- Sources are numbered 1 to 14 in the order of the list at the bottom of the page. The original memo numbered them with gaps (no 5, 12 or 13), so after regenerating `data.ts` renumber the `[n]` notes in it: 6→5, 7→6, 8→7, 9→8, 10→9, 11→10, 14→11, 15→12, 16→13, 17→14.

- Styles: `app/investors/memo.css`.

Whatever changes, open `/investors` after the deploy and scan the QR code once to be sure.

## Contact form

The form on `/contact` (`components/ContactForm.tsx`) posts to `app/api/contact/route.ts`, which emails each message to hillary@sautihealth.com through the company's Zoho Mail account. The email carries the Sauti logo, the sender's details, the message and a "Reply" button; pressing Reply in the mail app answers the sender directly. Nothing is stored on the website. The email's layout is in `lib/email/enquiry.ts`.

Settings (see `.env.example`), set in Netlify under **Project configuration → Environment variables** (project `silver-parfait-2922c5`):

| Variable | Value |
| --- | --- |
| `SMTP_USER` | `hillary@sautihealth.com`, the Zoho mailbox that sends |
| `SMTP_PASS` | An app password for that mailbox: accounts.zoho.eu → **Security → App passwords** |
| `CONTACT_TO` | Optional. Where messages go; defaults to `SMTP_USER` |

After changing a variable, redeploy (**Deploys → Trigger deploy**). Without `SMTP_USER` and `SMTP_PASS` the form tells visitors to email or WhatsApp instead, and the function log says why.

If sending fails, the Netlify function log (**Logs → Functions**) shows Zoho's answer: `535 Authentication Failed` means a wrong app password, or IMAP/SMTP access is switched off for the mailbox in Zoho Mail (**Settings → Mail Accounts → IMAP Access**).

Spam: a hidden field catches simple bots, and each connection can send five messages per ten minutes.

To try it on `npm run dev`, copy `.env.example` to `.env.local` and fill in `SMTP_PASS`.

## Pictures

Only real photos: team portraits, screenshots from Sauti Command, and credited stock photos. No AI-generated images.

- Team portraits: `public/images/team/`, listed under `team.members` in `lib/content.ts`. Square or portrait JPEGs, about 800 px wide. Faces are cropped from the upper part of the picture.
  Two portraits are retouched, with the faces left as photographed: Hillary's suit (`hillary-turinawe-suit.jpg`) and the top of Ambrose's head, which his original photo cut off (`ambrose-okello-full.jpg`). Both were painted in with Stable Diffusion inpainting run locally; only the clothing and the area above the head were repainted. David's portrait was moved onto a studio-white backdrop: background replaced and the outline of his suit cleaned up the same way, face unchanged. When a team member sends a new photo, replace the file and use a new file name so the image cache picks it up.
- Sauti Command screenshots: `public/images/command/`. Always say "test data" in the caption.
- Stock photos (Unsplash or similar): put the photographer's name in the caption under the photo, e.g. "Photo: Jane Doe on Unsplash".
- Every image needs alt text that says what is in it.
- Keep files under about 200 KB. The site resizes and converts them for each phone automatically (`next/image`).

## Search engines

- Page titles and descriptions: the `metadata` at the top of each `page.tsx`, and the site-wide default in `lib/site.ts`.
- `app/sitemap.ts` lists the pages for Google. Add new pages there.
- The homepage carries the company's details for Google as structured data (`organisation` in `app/page.tsx`).

### Google Search Console

Do this once, signed in with the company's Google account:

1. Go to https://search.google.com/search-console, click **Add property**, choose **Domain** and enter `sautihealth.com`.
2. Google shows a TXT record starting `google-site-verification=`. Copy it.
3. In Netlify: **Domains → sautihealth.com → DNS settings → Add new record**. Type `TXT`, name `@` (or leave empty), value: the text from Google. Save.
4. Back in Search Console, click **Verify**. If it fails, wait an hour and try again.
5. In Search Console, open **Sitemaps** and submit `https://sautihealth.com/sitemap.xml`.
6. Use **URL inspection** on `https://sautihealth.com/` and `https://sautihealth.com/investors` and click **Request indexing**.

If DNS is not an option, the "HTML tag" method also works: paste the code from Google's tag into `googleSiteVerification` in `lib/site.ts` and deploy.

## Analytics

GoatCounter counts page views on the live site (no cookies). The script is in `app/layout.tsx`; the dashboard is at https://sautihealth.goatcounter.com.

## Design

The layout of the earlier site (floating pill header, pill buttons, rounded cards, curved edge under the hero, large footer) in black and white. The only scroll animation is the header: once you scroll it shrinks into a compact pill (wide screens), hides while you scroll down and returns when you scroll up. It moves only with transform and opacity on phones and has no backdrop blur, so it stays smooth on low-end devices; visitors who ask for reduced motion get no animation. The header's "Company" menu (Investors, Team, News) is `companyNav` in `lib/site.ts`. Font: Plus Jakarta Sans. Green `#059153` (on white) and `#20B56C` (on black) only for highlighted words and small accents. All styles are in `app/globals.css`, with the colours as variables at the top.
