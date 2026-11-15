# Zipline design spec (measured) and the Sauti mapping

Measured live on zipline.com (home and /about) at 1440×900 on 14 Nov 2026, and cross-checked against the three screen recordings and the navbar image in Downloads. Zipline's fonts, images, video and SVG paths are not reused; only layout, scale and motion patterns are.

## Type scale (1440px viewport)

| Role | Zipline | Size / line-height | Sauti |
| --- | --- | --- | --- |
| Display (hero h1) | FK Screamer 700, uppercase | 150px / 0.85 (66px at 534px wide) | Anton |
| XL (inner-page section titles) | FK Screamer | 120px / 0.85 | Anton |
| LG (section titles, stat numbers) | FK Screamer | 90px / 0.85 | Anton |
| SM (card titles, stat labels) | FK Screamer | 40px / 0.85–1.0 | Anton |
| Eyebrow | FK Display 400, uppercase | 22px / 0.85 | Hanken Grotesk 500 uppercase |
| Lead | FK Grotesk Neue 500 | 22px / 1.4 | Hanken Grotesk |
| Body | FK Grotesk Neue 400 | 18px / 1.4 and 16px / 1.4 | Hanken Grotesk |
| Nav, buttons | FK Grotesk Neue 500 | 14px | Hanken Grotesk |
| Footer links | FK Grotesk Neue 400 | 14px / 1.2, −0.01em | Hanken Grotesk |

## Colour

Zipline: cream `#F7F4E8`, black `#000`, violet `#643AED` (all interactive states), grey `#505050` / `#6E6E6E`.
Sauti: cream `#F7F4E8`, ink `#100D10`, lime `#C9F44B` in every place Zipline uses violet, deep green `#466D00` for text-on-cream hovers.

## Layout constants

- Container max 1320px, 24px gutters; content 1272px wide at 1440.
- Header 80px tall (60px mobile). Radii: 20px large, 10px small. Pills: 999px.
- Easing seen in CSS: `cubic-bezier(0.32, 0.72, 0, 1)`; transitions 0.25s (nav), 0.35s (buttons), 0.85s (card images).

## Patterns

**Header (video 1, navbar image).** Fixed. At page top: transparent, full width, grid `1fr auto 1fr`, logo with wordmark, centre links, two outlined pills on the right. Links at 14px/500; dropdowns are a translucent dark rounded panel (8px radius, 16px padding) that fades in 0.18s. Any pill fills with the accent on hover. Once scrolled: the inner bar becomes a floating pill (836×43px, radius 300px, padding 4px 4px 4px 24px, gap 60px), logo collapses to the mark, the primary call to action is accent-filled. The pill hides on scroll down and returns on scroll up. Sections carry `data-header-variant`; over dark sections the pill is cream with dark text, over cream sections it is black with cream text.

**Section separation (videos 1 and 3).** An absolutely positioned SVG, 13.8vw tall, at the bottom of the hero and the top of the footer. Shape: rounded corners at both edges, straight slopes, broad rounded apex in the centre (a shallow V). Filled with the neighbouring section's colour.

**Hero (video 1).** Full-bleed video with fast cuts. Display headline about 42% down on the left; lead (22px/500) and a small cream pill button with ↗ near the bottom-left. On scroll the hero content drifts up slower than the page.

**Scroll story (video 1, live).** Pinned on cream. Headline lines appear one at a time, each going from light grey to black; a small rounded image chip sits inline in the headline and grows; an object drops in on a tether. Then the image becomes a large sticky card on the left while headline phrases roll on the right; a small tick indicator sits at the card's bottom corner.

**How-to section (video 2).** Pinned on cream for ~5 screens. Left: section title (two lines, 90px). Centre: a tall portrait card (about 280×460px at 1440, radius 20px). For each step an accent-coloured card slides up first and the media card rides up over it; on exit the card leaves through the top. Right: the step title. Bottom-left: the progress control: 4px-wide bars, 10px apart, 18px tall when idle (20% opacity), 80px when active with a fill that follows scroll progress; passed bars are solid.

**Mid-page hero (video 2).** Full-bleed media, headline fades in bottom-left with a pill button on the baseline.

**Pinned showcase (live).** Black section. Eyebrow + 90px headline top-left that swaps per step; media on the right masked in the logo shape; caption (18px) bottom-left beside the same progress control.

**Stats (live).** Rounded image cards (radius 20px) with a 90px number and 40px label bottom-left in cream; an accent cover wipes off to reveal the image; numbers count up.

**Cards (video 3).** Four columns, image above a 40px uppercase title clamped to 3 lines. Hover: image eases from scale 1.1 to 1 over 0.85s, image area grows taller (284/322), title takes the accent colour, a small "Read article ↗" pill fades in under the title. Section header has the title left and a black pill button right.

**Footer (video 3).** Cream page gives way under a curved top edge to a full-bleed photo. Two-line display headline rises into place, a small cream pill sits inline after the first word, the foreground subject overlaps the headline. Bottom-left: logo and two columns of 14px links. Bottom-right: icon row. A dark gradient at the bottom keeps links legible.

**About page (live).** Logo splash on load; 150px hero with bottom curve; story block with media left and a headline whose words darken with scroll; image cards with place labels; counters; alternating cream and black sections with 120px titles.

## Sauti rules applied on top

- Lime `#C9F44B` on every interactive state; heartbeat line drawn on button hover.
- Rounded-square mask from the logo tile instead of Zipline's lozenge.
- No numbered content. No coloured leading-edge bars on cards or callouts. No capsules around non-interactive labels: readings are plain coloured text with real spacing.
