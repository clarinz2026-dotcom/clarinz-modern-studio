import type { ReactNode } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { LetterRise, Reveal } from "@/components/motion";
import { BrowserFrame } from "./mockups";
import { CtaLink, SectionLabel } from "./ui";
import { cn } from "@/lib/utils";

type Project = {
  index: string;
  name: string;
  sector: string;
  summary: string;
  note: string;
  tags: string[];
  url: string;
  logo: string;
  logoFallback: ReactNode;
  dark?: boolean;
};

const projects: Project[] = [
  {
    index: "01",
    name: "Evangelist Funeral Services OPC",
    sector: "Services",
    summary:
      "A calm, dignified site for a funeral services provider, built around the first thing families need: clear, respectful ways to make contact.",
    note:
      "Respectful tone, simple navigation and a contact path that stays gently in view.",
    tags: ["Brand", "Services", "Contact-first"],
    url: "elisopc.freebuff.app",
    logo: "/assets/1000003000.png",
    dark: true,
    logoFallback: (
      <span className="font-display text-[11px] tracking-[0.2em] text-white/70">
        EFS
      </span>
    ),
  },
  {
    index: "02",
    name: "Glenn Surf School",
    sector: "Sports / Travel",
    summary:
      "A surf school site for Siargao built to get visitors booking lessons fast, with location, schedule and booking calls easy to tap.",
    note:
      "Bold brand mark, mobile-first booking flow and a page that performs well in the places surfers actually look.",
    tags: ["Booking-first", "Location", "Brand mark"],
    url: "glensurfschooldemo.freebuff.app",
    logo: "/assets/1000003014.jpg",
    dark: false,
    logoFallback: (
      <span className="font-display text-[11px] tracking-[0.2em] text-ink">
        GSS
      </span>
    ),
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
            Real projects with the clients I build for. Each one starts with the
            single action that site needs to earn.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 lg:mt-14 lg:gap-6">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="lg:sticky"
              style={{
                top: `calc(5.5rem + ${index * 18}px)`,
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
                  <div className="grid gap-3 lg:grid-cols-[1.02fr_0.98fr]">
                    <div className="flex items-center rounded-[22px] p-5 sm:p-8 lg:min-h-[380px]">
                      <BrowserFrame
                        url={project.url}
                        className="mx-auto w-[min(92%,1200px)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
                      >
                        <ProjectLogo project={project} />
                      </BrowserFrame>
                    </div>

                    <div className="flex flex-col justify-between gap-8 p-4 pb-5 sm:p-6 lg:p-7">
                      <div
                        className={cn(
                          "flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.2em]",
                          project.dark ? "text-paper/40" : "text-smoke",
                        )}
                      >
                        <span>{project.index}</span>
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
                          Built for {project.name.split(" ").slice(0, 2).join(
                            " ",
                          )}
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
            style={{ top: "calc(5.5rem + 36px)", zIndex: 3 }}
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
                    <span>03</span>
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

function ProjectLogo({ project }: { project: Project }) {
  return (
    <div className="flex h-full items-center justify-center p-5 sm:p-6">
      <img
        src={project.logo}
        alt={`${project.name} logo`}
        className="h-auto max-h-[230px] w-auto rounded-xl object-contain shadow-soft"
        onError={(event) => {
          const target = event.currentTarget as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentNode as HTMLElement | null;
          if (parent) {
            const fallback = document.createElement("div");
            fallback.className =
              "flex h-full items-center justify-center";
            fallback.innerHTML = "";
            parent.appendChild(fallback);
            ReactDOMRenderPlaceholder(project.logoFallback, fallback);
          }
        }}
      />
      <span className="sr-only">{project.name}</span>
    </div>
  );
}

function ReactDOMRenderPlaceholder(node: ReactNode, container: HTMLElement) {
  // Keep the fallback visible even when the image fails.
  // This avoids a full React tree and just shows the provided fallback.
  const root = typeof document !== "undefined" ? document.createElement("span") : null;
  if (!root) return;
  root.className =
    "flex items-center justify-center font-display text-[11px] tracking-[0.2em]";
  if (typeof node === "string") {
    root.textContent = node;
  } else if (node && typeof node === "object" && "props" in node) {
    const el = node as { props?: { children?: ReactNode; className?: string } };
    if (typeof el.props?.className === "string") {
      root.className = el.props.className;
    }
    root.textContent = String((el.props?.children as string) ?? "");
  }
  container.appendChild(root);
}
