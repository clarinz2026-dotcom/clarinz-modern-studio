import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { LetterRise, Reveal } from "@/components/motion";
import {
  BrowserFrame,
  CafeMock,
  DentalMock,
  StudioMock,
} from "./mockups";
import { CtaLink, SectionLabel } from "./ui";
import { cn } from "@/lib/utils";

type Project = {
  index: string;
  name: string;
  sector: string;
  summary: string;
  note: string;
  tags: string[];
  tint: string;
  url: string;
  dark?: boolean;
  mock: ReactNode;
};

const projects: Project[] = [
  {
    index: "01",
    name: "Maré Coffee",
    sector: "Hospitality",
    summary:
      "A neighbourhood café site built around one action: reserving a table before the morning rush.",
    note: "Warm type, a menu that reads in seconds, and the phone number always one tap away.",
    tags: ["Reservation-first", "Menu", "Local SEO"],
    tint: "#eee2cf",
    url: "clarinz.studio/work/mare",
    mock: <CafeMock />,
  },
  {
    index: "02",
    name: "Northline Dental",
    sector: "Healthcare",
    summary:
      "A calm, trustworthy clinic site where booking an appointment is the first thing you see.",
    note: "Clear pricing, gentle copy and a booking path that works with one thumb.",
    tags: ["Booking-first", "Accessible", "Trust"],
    tint: "#dfe9e4",
    url: "clarinz.studio/work/northline",
    mock: <DentalMock />,
  },
  {
    index: "03",
    name: "Alto Studio",
    sector: "Architecture",
    summary:
      "An editorial portfolio that lets the work speak first — and makes the enquiry form feel inevitable.",
    note: "Restrained grid, considered motion and a project index that stays out of the way.",
    tags: ["Portfolio", "Editorial", "Motion"],
    tint: "#24241f",
    url: "clarinz.studio/work/alto",
    dark: true,
    mock: <StudioMock />,
  },
];

export function WorkSection() {
  return (
    <section
      id="work"
      className="relative scroll-mt-20 bg-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <SectionLabel index="02">Selected work</SectionLabel>

        <div className="mt-8 flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(3.8rem,9vw,8rem)] leading-[0.86] text-ink">
            <LetterRise text="WORK" />
          </h2>
          <p className="max-w-[38ch] text-sm leading-7 text-smoke">
            Concept redesigns I made on my own: what I would build for real
            businesses. Each one starts with the single action the business
            needs most.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:mt-14 lg:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="lg:sticky"
              style={{
                top: `calc(5.5rem + ${index * 14}px)`,
                zIndex: index + 1,
              }}
            >
              <Reveal y={36}>
                <div
                  className={cn(
                    "overflow-hidden rounded-[30px] border p-2.5 shadow-soft sm:p-3.5",
                    project.dark
                      ? "border-white/10 bg-ink text-paper"
                      : "border-line bg-surface text-ink",
                  )}
                >
                  <div className="grid gap-3 lg:grid-cols-[1.12fr_0.88fr]">
                    <div
                      className="flex items-center rounded-[22px] p-5 sm:p-8 lg:min-h-[410px]"
                      style={{ backgroundColor: project.tint }}
                    >
                      <BrowserFrame
                        url={project.url}
                        className="w-full shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
                      >
                        {project.mock}
                      </BrowserFrame>
                    </div>

                    <div className="flex flex-col justify-between gap-8 p-4 pb-5 sm:p-6 lg:p-7">
                      <div
                        className={cn(
                          "flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.2em]",
                          project.dark ? "text-paper/40" : "text-smoke",
                        )}
                      >
                        <span>{project.index} / Concept</span>
                        <span>{project.sector}</span>
                      </div>

                      <div>
                        <h3
                          className={cn(
                            "font-display text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.88]",
                            project.dark ? "text-paper" : "text-ink",
                          )}
                        >
                          {project.name}
                        </h3>
                        <p
                          className={cn(
                            "mt-5 max-w-[34ch] text-[14px] leading-6",
                            project.dark ? "text-paper/75" : "text-ink/80",
                          )}
                        >
                          {project.summary}
                        </p>
                        <p
                          className={cn(
                            "mt-3 max-w-[38ch] text-[12.5px] leading-6",
                            project.dark ? "text-paper/45" : "text-smoke",
                          )}
                        >
                          {project.note}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                "rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em]",
                                project.dark
                                  ? "border-paper/15 text-paper/60"
                                  : "border-line text-smoke",
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "flex flex-wrap items-center justify-between gap-4 border-t pt-4",
                          project.dark ? "border-paper/12" : "border-line",
                        )}
                      >
                        <span
                          className={cn(
                            "text-[9px] uppercase tracking-[0.2em]",
                            project.dark ? "text-paper/35" : "text-smoke",
                          )}
                        >
                          Design &amp; build
                        </span>
                        <CtaLink
                          to="/auth?returnTo=/dashboard"
                          variant={project.dark ? "outlineLight" : "outline"}
                          className="h-10 px-4 text-[11px]"
                        >
                          Start something like this
                        </CtaLink>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}

          <article
            className="lg:sticky"
            style={{ top: "calc(5.5rem + 42px)", zIndex: 4 }}
          >
            <Reveal y={36}>
              <div className="relative overflow-hidden rounded-[30px] bg-brand p-6 text-white shadow-soft sm:p-10 lg:p-12">
                <div
                  className="pointer-events-none absolute -top-24 -right-20 size-80 rounded-full border border-white/20"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -top-10 -right-6 size-52 rounded-full border border-white/15"
                  aria-hidden="true"
                />
                <div className="grain-overlay opacity-[0.08]" />

                <div className="relative flex min-h-[300px] flex-col justify-between gap-10">
                  <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    <span>Next / Your project</span>
                    <span>04</span>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <h3 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85]">
                      YOUR
                      <br />
                      BUSINESS.
                    </h3>
                    <div>
                      <p className="max-w-[34ch] text-[13.5px] leading-6 text-white/75">
                        This spot is for your business. Tell me what you do and
                        the one action your site needs to earn.
                      </p>
                      <CtaLink
                        to="/auth?returnTo=/dashboard"
                        variant="paper"
                        className="mt-5"
                      >
                        Start a project
                      </CtaLink>
                      <p className="mt-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-white/55">
                        No pressure, no obligation
                        <ArrowUpRight className="size-3" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </article>
        </div>
      </div>
    </section>
  );
}
