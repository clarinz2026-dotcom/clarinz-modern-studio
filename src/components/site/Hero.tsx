import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BrowserFrame } from "./mockups";
import { CtaLink } from "./ui";
import { consultationHref, STUDIO } from "@/lib/studio";
import { cn } from "@/lib/utils";

const name = "CLARINZ".split("");

function DesktopProjectMock() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#fbf7ee] p-4 sm:p-5 text-[#1d1a17]">
      <div className="flex items-center justify-between">
        <span className="font-display text-[13px] tracking-[0.18em] sm:text-base text-brand">
          Glenn Surf School
        </span>
        <div className="flex gap-3 text-[5.5px] font-medium uppercase tracking-[0.18em] text-[#5b5650]">
          <span>Lessons</span>
          <span className="hidden sm:inline">Schedule</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-[1.15fr_0.85fr] items-center gap-3 sm:gap-4">
        <div>
          <p className="text-[6px] uppercase tracking-[0.22em] text-[#7a6c5e]">
            Surf school · Siargao
          </p>
          <h4 className="mt-2 font-display text-[clamp(1.35rem,2.8vw,2.45rem)] leading-[0.9] text-ink">
            Learn to surf
            <br />
            with locals.
          </h4>
          <p className="mt-2 max-w-[24ch] text-[6.5px] leading-[1.55] text-[#6a5e51]">
            Group lessons and private coaching on the beach — first timers
            welcome.
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-brand px-2 py-1 text-[6px] font-semibold uppercase tracking-[0.16em] text-white">
            Book a lesson <span aria-hidden="true">↗</span>
          </span>
        </div>

        <div className="relative h-full max-h-[150px] min-h-[88px] overflow-hidden rounded-lg bg-brand">
          <div className="absolute -top-5 -right-5 size-20 rounded-full bg-white/20" />
          <div className="absolute bottom-3 left-2 size-14 rounded-full border-[5px] border-[#fbf7ee]/75" />
          <div className="absolute right-3 bottom-4 h-8 w-px bg-[#fbf7ee]/30" />
          <span className="absolute right-2 bottom-2 text-[5px] uppercase tracking-[0.2em] text-white/75">
            Siargao
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#1d1a17]/10 pt-2 text-[5.5px] uppercase tracking-[0.14em] text-[#6a5e51]">
        <span className="flex justify-between gap-1">
          <span>Intro</span>
          <span>90 min</span>
        </span>
        <span className="flex justify-between gap-1">
          <span>Private</span>
          <span>2 hrs</span>
        </span>
        <span className="flex justify-between gap-1">
          <span>Kids</span>
          <span>60 min</span>
        </span>
      </div>
    </div>
  );
}

function PhoneProjectMock() {
  return (
    <div className="overflow-hidden rounded-[18px] border-[3px] border-[#0f0d0b] bg-[#fbf7ee] text-[#1d1a17] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.55)]">
      <div className="mx-auto mt-1.5 h-1 w-7 rounded-full bg-black/20" />
      <div className="p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[8px] tracking-[0.16em]">
            <span className="text-brand">⬡</span> Glenn
          </span>
          <span className="text-[5px] uppercase tracking-[0.16em] text-[#7a6c5e]">
            Lessons
          </span>
        </div>
        <p className="mt-3 font-display text-[17px] leading-[0.92] text-ink">
          Learn
          <br />
          to surf.
        </p>
        <div className="relative mt-2 h-16 overflow-hidden rounded-md bg-brand">
          <div className="absolute -top-3 -right-3 size-12 rounded-full bg-white/20" />
          <div className="absolute bottom-2 left-2 size-8 rounded-full border-[3px] border-[#fbf7ee]/70" />
        </div>
        <div className="mt-2 rounded-full bg-brand py-1.5 text-center text-[5px] font-semibold uppercase tracking-[0.16em] text-white">
          Book a lesson
        </div>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full border border-brand/20 px-2 py-1 text-[4.5px] uppercase tracking-[0.14em] text-[#5b5650]">
            Mon
          </span>
          <span className="rounded-full border border-brand/20 px-2 py-1 text-[4.5px] uppercase tracking-[0.14em] text-[#5b5650]">
            Tue
          </span>
        </div>
      </div>
    </div>
  );
}

function ScreenStack({ className }: { className?: string }) {
  return (
    <div className={cn("relative z-10 w-[min(88vw,560px)]", className)}>
      <div className="animate-float">
        <div className="hero-rise" style={{ animationDelay: "320ms" }}>
          <div className="relative mx-auto w-[88%] -rotate-2">
            <div className="rounded-[20px] border border-white/10 bg-[#f6f2e9] p-1.5 shadow-[0_70px_120px_-45px_rgba(0,0,0,0.95)]">
              <BrowserFrame url="glensurfschooldemo.freebuff.app">
                <DesktopProjectMock />
              </BrowserFrame>
            </div>

            <div className="absolute -top-4 -left-4 hidden items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-3 py-1.5 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-ink shadow-lg sm:flex">
              <span className="size-1.5 rounded-full bg-brand" />
              Design + build
            </div>

            <div className="absolute top-16 -right-4 hidden rotate-2 rounded-2xl border border-ink/10 bg-surface px-3 py-2 text-ink shadow-xl sm:block">
              <p className="text-[7.5px] uppercase tracking-[0.18em] text-smoke">
                Typical launch
              </p>
              <p className="mt-1 font-display text-xl leading-none">3–6 wks</p>
            </div>
          </div>
        </div>

        <div
          className="hero-rise absolute -bottom-12 right-1 sm:right-4"
          style={{ animationDelay: "620ms" }}
        >
          <div className="w-[108px] rotate-6 sm:w-[132px]">
            <PhoneProjectMock />
          </div>
        </div>

        <div
          className="hero-rise absolute -bottom-5 left-0 hidden items-center gap-2 rounded-full border border-paper/10 bg-ink-soft/90 px-3.5 py-2 text-[8.5px] uppercase tracking-[0.16em] text-paper/65 backdrop-blur sm:flex"
          style={{ animationDelay: "780ms" }}
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
          Open for projects
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const stackY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const stackScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.35]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative isolate overflow-hidden bg-ink text-paper"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-1/3 right-[-12%] size-[760px] rounded-full bg-brand/20 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-30%] left-[-12%] size-[560px] rounded-full bg-[#d8bfa8]/10 blur-[150px]"
        aria-hidden="true"
      />
      <div className="grain-overlay" />

      <div className="relative mx-auto flex min-h-svh max-w-[1320px] flex-col px-5 pt-20 sm:px-8 lg:px-10 lg:pt-24">
        <div className="relative flex min-h-[470px] flex-1 items-center justify-center py-6 sm:min-h-[560px] lg:min-h-[clamp(380px,46svh,470px)]">
          <motion.div
            className="absolute inset-x-0 top-1 z-0 lg:top-[24%]"
            style={reduce ? undefined : { y: nameY, opacity: nameOpacity }}
          >
            <h1 className="text-center font-display text-[clamp(3.4rem,17vw,13rem)] leading-[0.8] tracking-[-0.01em] text-paper/95">
              <span className="sr-only">Clarinz Abrasaldo</span>
              <span aria-hidden="true" className="flex justify-center">
                {name.map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    className="slot-mask inline-block"
                  >
                    <span
                      className="hero-letter"
                      style={{ animationDelay: `${140 + index * 55}ms` }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            </h1>
          </motion.div>

          <motion.div
            className="relative z-10 mt-16 flex w-full justify-center lg:mt-4"
            style={
              reduce
                ? undefined
                : { y: stackY, scale: stackScale, opacity: stackOpacity }
            }
          >
            <ScreenStack />
          </motion.div>
        </div>

        <div className="relative z-10 grid gap-8 border-t border-paper/10 pt-8 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:pb-10">
          <div
            className="hero-rise"
            style={{ animationDelay: "460ms" }}
          >
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.3em] text-paper/45">
              {STUDIO.brand} — {STUDIO.tagline}
            </p>
            <h2 className="mt-4 max-w-[26ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
              Your business deserves a website{" "}
              <span className="text-paper/40">
                that works as hard as you do.
              </span>
            </h2>
            <p className="mt-5 max-w-[48ch] text-[14px] leading-7 text-paper/55">
              I design and build custom sites for small businesses, so more
              people book, call or walk in — instead of finding someone else.
            </p>
          </div>

          <div
            className="hero-rise flex flex-col gap-5 lg:items-end"
            style={{ animationDelay: "620ms" }}
          >
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:justify-end">
              <CtaLink
                href="#contact"
                variant="brand"
                className="w-full sm:w-auto"
              >
                Start a project
              </CtaLink>
              <a
                href="#work"
                className="btn-cta group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-paper/20 px-6 text-[13px] font-semibold text-paper hover:bg-paper/10 sm:w-auto"
              >
                See the work
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
            <p className="text-[11px] leading-5 text-paper/40 lg:text-right">
              <a
                href={consultationHref}
                className="link-underline font-semibold text-paper/70 transition-colors hover:text-paper"
              >
                Book a Consultation
              </a>
              <br />
              Fixed price before any work starts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
