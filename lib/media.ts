/**
 * Every picture slot on the site. `src` is null until the real image exists;
 * the <Media> component then renders a tinted placeholder of the right shape.
 * To add an image: drop the file in /public/images and pass its path as the
 * third argument, e.g. slot("...", "dusk", "/images/home-hero.jpg").
 * All images are illustrative scenes, not photographs of real patients or staff.
 */
export type Tone = "dusk" | "dawn" | "green" | "clay" | "sky" | "night";

export type MediaItem = { src: string | null; alt: string; tone: Tone };

const slot = (alt: string, tone: Tone, src: string | null = null): MediaItem => ({ src, alt, tone });

export const media = {
  homeHero: slot("A busy street in a dense Kampala neighbourhood at dusk, a boda boda rider passing.", "dusk"),
  phoneInHand: slot("Hands holding a basic keypad mobile phone.", "clay"),
  responder: slot("A community first responder carrying a first-aid bag through a neighbourhood lane.", "green"),
  transporter: slot("A boda boda motorcycle transporter waiting at the roadside.", "dusk"),
  facility: slot("The entrance of a health facility in early morning light.", "dawn"),
  neighbourhood: slot("Rooftops of a dense, low-rise Kampala settlement seen from above.", "clay"),
  records: slot("A paper register on a clinic desk beside a simple phone.", "night"),
  kampalaHills: slot("Kampala's hills at sunrise.", "dawn"),
  footerSky: slot("Open sky over Kampala.", "sky"),
  junction: slot("A busy road junction with motorcycles and pedestrians.", "dusk"),
};

export type MediaId = keyof typeof media;
