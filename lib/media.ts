/**
 * Every picture slot on the site. `src` is null until the real image exists;
 * the <Media> component then renders a tinted placeholder of the right shape.
 * To add an image: drop the file in /public/images and pass its path as the
 * third argument, e.g. slot("...", "dusk", "/images/home-hero.jpg").
 * All images are illustrative scenes, not photographs of real patients or staff.
 */
export type Tone = "dusk" | "dawn" | "green" | "clay" | "sky" | "night";

export type MediaItem = {
  src: string | null;
  alt: string;
  tone: Tone;
  /**
   * Where the subject sits in the picture, as a CSS object-position. On a
   * phone a landscape picture loses most of its width, so below 992px each
   * crop is aligned on this point to keep the subject in frame. Wide screens
   * ignore it and keep the centred crop.
   */
  focus: string;
};

const slot = (alt: string, tone: Tone, src: string | null = null, focus = "50% 50%"): MediaItem => ({ src, alt, tone, focus });

export const media = {
  homeHero: slot("A boda boda rider in a reflector jacket on a tree-lined Kampala road at dusk, with minibus taxis, shops and the city's towers behind.", "dusk", "/images/home-hero.jpg", "63% 60%"),
  phoneInHand: slot("A woman dials a call on a basic keypad phone on a busy Kampala street.", "clay", "/images/phone-in-hand.jpg", "62% 55%"),
  responder: slot("A boda boda rider carries a Village Health Team volunteer in a green VHT vest, first-aid bag on her lap, through a Kampala street.", "green", "/images/responder.jpg", "62% 50%"),
  transporter: slot("A boda boda rider waits at a roadside stage with a spare helmet for a passenger.", "dusk", "/images/transporter.jpg", "52% 45%"),
  facility: slot("The entrance of a modern referral hospital at dawn, a nurse walking in and an ambulance parked by the door.", "dawn", "/images/facility.jpg", "62% 50%"),
  triage: slot("A call handler taps one of three colour-coded categories, red, yellow or green, on a smartphone.", "night", "/images/triage.jpg", "72% 55%"),
  neighbourhood: slot("A tree-lined Kampala neighbourhood with jacaranda in bloom, homes, shops, a school and the city's towers on the hills.", "clay", "/images/neighbourhood.jpg", "52% 60%"),
  records: slot("A nurse at a health centre desk looks at a laptop map of call locations marked red, yellow and green, beside a patient register.", "night", "/images/records.jpg", "62% 62%"),
  kampalaHills: slot("Kampala's hills in morning mist at sunrise.", "dawn", "/images/kampala-hills.jpg", "64% 50%"),
  footerSky: slot("Blue sky over a Kampala road and the city's towers.", "sky", "/images/footer-sky.jpg", "62% 50%"),
  junction: slot("Pedestrians cross at a busy Kawempe junction in the evening, among boda bodas and minibus taxis.", "dusk", "/images/junction.jpg", "42% 55%"),
};

export type MediaId = keyof typeof media;
