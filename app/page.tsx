import { ExploreCards } from "@/components/ExploreCards";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MidHero } from "@/components/MidHero";
import { ScrollStory } from "@/components/ScrollStory";
import { Showcase } from "@/components/Showcase";
import { StatCards } from "@/components/StatCards";
import { Statement } from "@/components/Statement";
import { home } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero {...home.hero} />
      <ScrollStory />
      <Statement />
      <HowItWorks title={home.how.title} steps={home.how.steps} />
      <MidHero {...home.data} />
      <Showcase />
      <section className="section theme-light" data-header-variant="dark" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <StatCards stats={home.stats} />
        </div>
      </section>
      <ExploreCards {...home.explore} />
    </>
  );
}
