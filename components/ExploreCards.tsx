import Link from "next/link";
import { ButtonIcon, ButtonLink } from "./Button";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import type { MediaId } from "@/lib/media";

type Card = { title: string; href: string; media: MediaId };

type Props = { title: string; cta: { label: string; href: string }; cards: Card[] };

/**
 * A row of picture cards linking deeper into the site. On hover the picture
 * settles and grows taller, the title takes the accent colour and a small
 * button appears beneath it.
 */
export function ExploreCards({ title, cta, cards }: Props) {
  return (
    <section className="section theme-light" data-header-variant="dark">
      <div className="wrap">
        <div className="explore__head">
          <h2 className="display t-lg">{title}</h2>
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
        <div className="explore__grid">
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.08}>
              <Link href={card.href} className="card">
                <div className="card__figure">
                  <Media id={card.media} decorative sizes="(min-width: 992px) 25vw, 50vw" />
                </div>
                <h3 className="display t-sm card__title">{card.title}</h3>
                <span className="btn btn--primary card__more">
                  Read more
                  <ButtonIcon />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
