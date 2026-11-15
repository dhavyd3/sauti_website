# Image shot list for Higgsfield

Ten stills, one per picture slot. Each slot is named in `lib/media.ts`; when a file exists, save it to `public/images/` under the file name below and pass that path as the third argument of the slot, for example `slot("…", "dusk", "/images/home-hero.jpg")`.

Status on 15 Nov 2026: none generated yet. The Higgsfield connector available to Claude can read the account (27.44 credits, Basic plan) but has no generate tool, so the site is showing tinted placeholders.

Suggested model: Nano Banana Pro or Cinema Studio Image 2.5 at 2k. Check the credit cost of the first image before running the rest.

## Shared direction (append to every prompt)

Documentary photograph, natural light, 35mm lens, shallow depth of field, warm earthy colour grade, real textures, no text or logos, no watermark. Kampala, Uganda. People shown with dignity and calm; no blood, no injury, no visible distress. Faces turned away, in soft focus or cropped so nobody reads as a specific real person.

## Shots

| Slot | File | Ratio | Prompt |
| --- | --- | --- | --- |
| `homeHero` | `home-hero.jpg` | 16:9 | Wide street scene in a dense low-rise Kampala neighbourhood at dusk, a boda boda motorcycle rider passing with motion blur, shopfront lights coming on, deep blue sky fading to orange. Keep the left third dark and uncluttered for a large headline. |
| `phoneInHand` | `phone-in-hand.jpg` | 3:4 | Close-up of a person's hands holding a basic keypad feature phone, thumb pressing a key, small monochrome screen lit, red-earth street softly blurred behind. |
| `responder` | `responder.jpg` | 3:4 | A community health volunteer seen from behind, walking briskly down a narrow neighbourhood lane carrying a small first-aid bag, morning light, tin roofs and green banana leaves. |
| `transporter` | `transporter.jpg` | 3:4 | A boda boda rider waiting on his motorcycle at a roadside stage, helmet on, face turned away, late afternoon light, traffic soft in the background. |
| `facility` | `facility.jpg` | 3:4 | Entrance of a modest public health facility at dawn, open gate, a covered walkway, soft pink sky, nobody in close view. |
| `neighbourhood` | `neighbourhood.jpg` | 4:3 | Elevated view over a dense settlement of rust-coloured tin roofs between green hills, warm low sun, light haze. |
| `records` | `records.jpg` | 4:3 | A handwritten paper register open on a worn wooden clinic desk beside a simple keypad phone and a pen, window light, shallow focus. |
| `kampalaHills` | `kampala-hills.jpg` | 16:9 | Kampala's hills at sunrise, layered ridges in mist, rooftops and trees catching first light, wide and calm. |
| `junction` | `junction.jpg` | 16:9 | A busy road junction with motorcycles, minibus taxis and pedestrians crossing, shot from the roadside at eye level, early evening, headlights starting to glow. |
| `footerSky` | `footer-sky.jpg` | 16:9 | Open deep-blue equatorial sky with a few high clouds over a low line of trees and rooftops at the very bottom of the frame. Leave the upper two thirds clean for a large headline. |

## Use on the site

- `homeHero`: home hero. `kampalaHills`: About hero, home statement, a showcase step and a card.
- `phoneInHand`, `records`, `responder`, `facility`, `transporter`: the "how it works" steps on the home page and the How it works page.
- `neighbourhood`, `records`, `junction`: the scroll story on the home page.
- `junction`: Pilot hero, the "every call becomes data" section and a stat card.
- `footerSky`: footer on every page.

These are illustrative scenes. They should be replaced with real photographs from the pilot when those exist, and the footer already carries the line "Images on this site are illustrative."
