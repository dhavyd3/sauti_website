# Image shot list for Higgsfield

Eleven stills, one per picture slot in `lib/media.ts`. Files live in `public/images/`; each slot passes its path as the third argument, for example `slot("…", "dusk", "/images/home-hero.jpg")`.

Status on 18 Nov 2026: all eleven generated with the Higgsfield CLI (`gpt_image_2_6`, 2k, JPEG; medium quality at 1 credit each, the home hero at high quality for 2.75 credits). The first round looked too poor and too rural for Kampala, so nine were redone after research into what present-day Kampala looks like.

## What the research found

- Kampala is hilly and green, with red clay-tiled roofs, multi-storey shop buildings and glass office towers on the skyline.
- Traffic drives on the left. Roads are tarmac with concrete kerbs and red-earth verges.
- Boda boda riders wear lime or orange reflector jackets and helmets (KCCA distributed 5,000 jackets in 2025). Motorcycles carry yellow number plates.
- Minibus taxis are white Toyota vans with a blue-and-white chequered band.
- Village Health Team volunteers have no national uniform; programmes hand out branded jackets and T-shirts. The images use a plain green health-volunteer vest marked "VHT".

## Shared direction (appended to every prompt)

Realistic documentary photograph, natural light, 35mm lens, shallow depth of field, warm true-to-life colour. Present-day Kampala, Uganda, with the details above. Everyone is a Black Ugandan, well dressed, calm and dignified. The setting is orderly, prosperous and well kept: no slums, no shacks, no litter, no poverty. No readable shop signs, no brand logos, no watermark. Faces are turned away, in soft focus, at a distance or covered by helmets.

## Shots

| Slot | File | Ratio | Prompt (short form) |
| --- | --- | --- | --- |
| `homeHero` | `home-hero.jpg` | 16:9 | A boda boda rider in a lime reflector jacket on a modern, tree-lined Kampala road at dusk; minibus taxi, shops lighting up, hills with glass towers. Left third darker for the headline. |
| `phoneInHand` | `phone-in-hand.jpg` | 3:4 | A well-dressed woman's hands dialling on a basic keypad phone on a clean paved walkway; shops, boda bodas and a minibus taxi blurred behind. |
| `triage` | `triage.jpg` | 3:4 | Over the shoulder of a call handler holding a smartphone showing three large buttons, red, amber and green; laptop and headset on the desk; Kampala street outside. |
| `responder` | `responder.jpg` | 3:4 | A boda boda rider carrying a VHT volunteer in a green "VHT" vest with a first-aid bag, riding past shops, pedestrians and a minibus taxi. |
| `transporter` | `transporter.jpg` | 3:4 | A boda boda rider waiting at a roadside stage with a spare helmet for a passenger, late afternoon. (First round, kept.) |
| `facility` | `facility.jpg` | 3:4 | Entrance of a modern multi-storey referral hospital at dawn: landscaped forecourt, drop-off canopy, ambulance, a nurse walking in. |
| `neighbourhood` | `neighbourhood.jpg` | 4:3 | A well-kept Kampala neighbourhood: tiled-roof homes, jacaranda in bloom, a church and school, paved road, towers on the hills. |
| `records` | `records.jpg` | 4:3 | A nurse at a health centre desk looking at a laptop map of calls marked red, yellow and green, beside a patient register. |
| `kampalaHills` | `kampala-hills.jpg` | 16:9 | Kampala's hills in mist at sunrise, tiled roofs, church and mosque on the ridges. (First round, kept.) |
| `junction` | `junction.jpg` | 16:9 | A busy, orderly Kawempe junction in early evening: zebra crossing, boda bodas, minibus taxis, shops, hills behind. |
| `footerSky` | `footer-sky.jpg` | 16:9 | Deep-blue sky over a Kampala road and the city's towers along the bottom, upper two thirds clear for the headline. |

## Use on the site

- `homeHero`: home hero. `kampalaHills`: About hero, home statement, a showcase step and a card.
- `phoneInHand`, `triage`, `responder`, `transporter`, `facility`: the "how it works" steps on the home page and the How it works page. `responder` also illustrates "Two roles, one response".
- `neighbourhood`, `records`, `junction`: the scroll story on the home page. `records` also illustrates "A new class of health data" and the privacy card.
- `junction`: Pilot hero, the "every call becomes data" section and a stat card.
- `footerSky`: footer on every page.

These are illustrative scenes, not photographs of real people or places. Replace them with real pilot photographs when those exist; the footer already says "Images on this site are illustrative."
