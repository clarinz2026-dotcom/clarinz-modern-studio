import { SiteNav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Manifesto, Process, About } from "@/components/site/StorySections";
import { WorkSection } from "@/components/site/WorkSection";
import { Packages, SiteFooter } from "@/components/site/ClosingSections";

const marqueeItems = [
  "Custom websites",
  "Mobile-first builds",
  "Fixed pricing",
  "You own every file",
  "Post-launch support",
  "Concept-led design",
];

function ValueMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-[#f8f6f0] py-3.5">
      <span className="sr-only">{marqueeItems.join(", ")}</span>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center pr-8">
              {marqueeItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-8 pr-8 text-[9.5px] font-semibold whitespace-nowrap uppercase tracking-[0.22em] text-smoke"
                >
                  {item}
                  <span className="size-1 rounded-full bg-brand/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav />
      <main>
        <Hero />
        <ValueMarquee />
        <Manifesto />
        <WorkSection />
        <Process />
        <About />
        <Packages />
      </main>
      <SiteFooter />
    </div>
  );
}
