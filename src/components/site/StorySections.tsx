import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  BadgeDollarSign,
  CalendarCheck,
  Check,
  MapPin,
} from "lucide-react";
import { LetterRise, LineRise, Reveal } from "@/components/motion";
import { CtaLink, SectionLabel } from "./ui";

const questions = [
  {
    icon: BadgeDollarSign,
    question: "What does it cost?",
    answer: "Clear pricing, packages and a next step.",
  },
  {
    icon: CalendarCheck,
    question: "How do I book?",
    answer: "One obvious action on every screen.",
  },
  {
    icon: MapPin,
    question: "Are you open?",
    answer: "Hours, location and contact, up front.",
  },
];

export function Manifesto() {
  return (
    <section id="why" className="relative scroll-mt-20 bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <SectionLabel index="01">The problem</SectionLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <div>
            <h2 className="text-[clamp(2.35rem,5.2vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-ink">
              <LineRise>A bad website</LineRise>
              <LineRise delay={0.06} className="text-smoke">
                loses customers
              </LineRise>
              <LineRise delay={0.12}>
                you <span className="text-brand">never hear about.</span>
              </LineRise>
            </h2>

            <Reveal delay={0.18} className="mt-8 max-w-[54ch]">
              <p className="text-[14.5px] leading-7 text-smoke">
                They look you up, can’t find your prices, your hours or how to
                book — and pick someone else. I build sites that answer those
                questions first, so they choose you.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative">
              <div
                className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[28px] border border-line bg-[#eae5d9]"
                aria-hidden="true"
              />
              <div className="soft-panel relative rounded-[28px] border border-line bg-surface p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-smoke">
                    The three questions
                  </p>
                  <span className="rounded-full border border-brand/20 bg-brand/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-brand">
                    Answered first
                  </span>
                </div>

                <ul className="mt-6 flex flex-col">
                  {questions.map(({ icon: Icon, question, answer }) => (
                    <li
                      key={question}
                      className="flex gap-3 border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-paper text-brand">
                        <Icon className="size-4" strokeWidth={1.6} />
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                          {question}
                        </p>
                        <p className="mt-1 text-[11.5px] leading-5 text-smoke">
                          {answer}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-paper">
                  <Check className="size-3.5 text-[#a6c8b4]" />
                  <p className="text-[11px] leading-5 text-paper/75">
                    Built to answer them before they ask.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Intro call",
    body: "20 minutes about your business, your customers and the one action the site has to earn. You get a fixed price before any work starts.",
  },
  {
    title: "Direction",
    body: "I study your place, your customers and your competitors, then choose the idea that sets you apart.",
  },
  {
    title: "Design",
    body: "You see the layout and click through a working prototype. Nothing gets built until you approve it.",
  },
  {
    title: "Build",
    body: "I build it myself, mobile first, fast and easy to update. No handoff to a stranger.",
  },
  {
    title: "Launch",
    body: "We go live. You own every file, every account and every domain — and I stay reachable after.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-paper md:py-32"
    >
      <div
        className="pointer-events-none absolute top-[-20%] right-[-10%] size-[560px] rounded-full bg-brand/12 blur-[150px]"
        aria-hidden="true"
      />
      <div className="grain-overlay" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-7 border-b border-paper/10 pb-9 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="03" tone="paper">
              How I work
            </SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(3.1rem,7.4vw,6.8rem)] leading-[0.86] text-paper">
              <LetterRise text="THE PROCESS" />
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm leading-7 text-paper/50">
            No mystery, no surprise bills. Five steps from first call to a site
            you own — most projects go live in three to six weeks.
          </p>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 xl:mt-20 xl:grid-cols-5 xl:gap-5">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="xl:mt-[calc(var(--step)*1.75rem)]"
              style={{ "--step": index } as CSSProperties}
            >
              <Reveal delay={index * 0.06} y={30}>
                <div className="group relative border-t border-paper/15 pt-6 transition-colors duration-500 hover:border-brand/60">
                  <span
                    className="absolute -top-[3px] left-0 size-[5px] rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  <span className="font-display text-[3.4rem] leading-none text-brand">
                    0{index + 1}
                  </span>
                  <h3 className="mt-7 text-[15px] font-semibold tracking-[-0.01em] text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[12.5px] leading-6 text-paper/45">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col gap-6 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              "Fixed price",
              "One point of contact",
              "You own every file",
              "Post-launch support",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-paper/15 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-paper/55"
              >
                {item}
              </span>
            ))}
          </div>
          <CtaLink
            to="/auth?returnTo=/dashboard"
            variant="outlineLight"
            className="self-start sm:self-auto"
          >
            Start at step one
          </CtaLink>
        </Reveal>
      </div>
    </section>
  );
}

const stats = [
  { value: "Fixed", label: "price agreed before any work begins" },
  { value: "3–6", label: "weeks from kickoff to launch, typically" },
  { value: "1:1", label: "you work with the person building it" },
];

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "Node.js",
  "Convex",
  "Supabase",
  "Figma",
  "Framer Motion",
  "SEO",
  "Accessibility",
  "Copy direction",
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <SectionLabel index="04">About</SectionLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div>
              <div className="relative aspect-4/5 overflow-hidden rounded-[30px] bg-ink p-6 text-paper shadow-soft sm:p-8">
                <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />
                <div
                  className="absolute -top-20 -right-20 size-64 rounded-full border border-paper/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-8 -right-8 size-40 rounded-full border border-paper/10"
                  aria-hidden="true"
                />
                <div className="grain-overlay" />

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.24em] text-paper/40">
                    <span>Designer &amp; developer</span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-[#8fbf9f]" />
                      Open
                    </span>
                  </div>

                  <div>
                    <p className="font-display text-[clamp(6rem,13vw,10.5rem)] leading-[0.72]">
                      CA<span className="text-brand">.</span>
                    </p>
                    <p className="mt-7 max-w-[26ch] text-[12px] leading-5 text-paper/45">
                      Websites for small businesses that need to be found,
                      understood and chosen.
                    </p>
                  </div>

                  <div className="flex items-end justify-between border-t border-paper/15 pt-4">
                    <div>
                      <p className="text-[13px] font-semibold">
                        Clarinz Abrasaldo
                      </p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-paper/40">
                        Independent web studio
                      </p>
                    </div>
                    <span className="rounded-full border border-paper/15 px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-paper/55">
                      Q1 2027
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-smoke">
                Working with businesses everywhere
              </p>
            </div>
          </Reveal>

          <div>
            <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-ink">
              <LineRise>Hi, I’m Clarinz.</LineRise>
              <LineRise delay={0.06}>
                I design the site,{" "}
                <span className="text-brand">build it myself,</span>
              </LineRise>
              <LineRise delay={0.12}>and stay after launch.</LineRise>
            </h2>

            <Reveal delay={0.15} className="mt-8 flex max-w-[56ch] flex-col gap-4">
              <p className="text-[14.5px] leading-7 text-smoke">
                I’m a full-stack designer and developer. I’ve built for
                hospitality, healthcare, delivery and retail — and I like the
                briefs where the business knows what it wants but not how to say
                it online. That’s usually where I’m most useful.
              </p>
              <p className="text-[14.5px] leading-7 text-smoke">
                Every site is designed and built by me: strategy, design, code
                and launch. You get one person to call, one fixed price, and a
                site you actually own.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-2xl border border-line bg-surface p-4"
                  >
                    <p className="font-display text-3xl leading-none text-brand">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[10.5px] leading-4 text-smoke">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-smoke">
                Tools I build with
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#e9e5da] px-3 py-1.5 text-[10px] font-medium tracking-[0.02em] text-ink/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-4">
              <CtaLink to="/auth?returnTo=/dashboard">
                Tell me about your business
              </CtaLink>
              <a
                href="mailto:hello@clarinz.studio"
                className="link-underline inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink"
              >
                hello@clarinz.studio
                <ArrowUpRight className="size-3.5 text-brand" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
