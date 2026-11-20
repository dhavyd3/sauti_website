import type { Metadata } from "next";
import { NewsGrid } from "@/components/NewsGrid";
import { getNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description: "News from Sauti Health: AI emergency dispatch in 50+ languages, on any phone.",
  alternates: { canonical: "/news" },
};

/** Every item in content/news.md, newest first. */
export default function NewsPage() {
  return (
    <div className="news-page">
      <NewsGrid items={getNews()} title="News" as="h1" />
    </div>
  );
}
