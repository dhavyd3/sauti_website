import Image from "next/image";
import Link from "next/link";
import { WIDE_PULSE } from "./Logo";
import type { NewsItem } from "@/lib/news";

type Props = {
  items: NewsItem[];
  title: string;
  /** "View all" button at the top right. Left out on the /news page itself. */
  viewAll?: { label: string; href: string };
  /** The page title on /news, a section title on the homepage. */
  as?: "h1" | "h2";
  id?: string;
};

/** Dark band of news cards: picture (or a plain tile), headline, short text. */
export function NewsGrid({ items, title, viewAll, as: Heading = "h2", id }: Props) {
  return (
    <section className="news" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="wrap">
        <div className="news__head">
          <Heading className="news__title" id={id ? `${id}-title` : undefined}>
            {title}
          </Heading>
          {viewAll && (
            <Link href={viewAll.href} className="news__all">
              {viewAll.label}
              <svg viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 6 H20 M15 1 L20 6 L15 11" />
              </svg>
            </Link>
          )}
        </div>

        <ul className="news__grid">
          {items.map((item) => {
            const card = (
              <>
                <div className="news__figure">
                  {item.image ? (
                    <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 300px" />
                  ) : (
                    <svg className="news__pulse" viewBox="0 0 600 120" aria-hidden="true">
                      <path d={WIDE_PULSE} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <time className="news__date" dateTime={item.date}>
                  {item.label}
                </time>
                <h3 className="news__headline">{item.title}</h3>
                {item.body && <p className="news__body">{item.body}</p>}
              </>
            );
            return (
              <li key={`${item.date}-${item.title}`}>
                {item.link ? (
                  <a className="news__card news__card--link" href={item.link} target="_blank" rel="noopener noreferrer">
                    {card}
                  </a>
                ) : (
                  <div className="news__card">{card}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
