import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BrowserFrame, CafeMock, CafePhoneMock } from "./mockups";
import { CtaLink } from "./ui";
import { consultationHref, STUDIO } from "@/lib/studio";
import { cn } from "@/lib/utils";

const name = "CLARINZ".split("");

function ScreenStack({ className }: { className?: string }) {
  return (
    <div className={cn("relative z-10 w-[min(88vw,560px)]", className)}>
      <div className="animate-float">
        <div
          className="hero-rise"
          style={{ animationDelay: "320ms" }}
        >
          <div className="relative mx-auto w-[88%] -rotate-2">
            <div className="rounded-[20px] border border-white/10 bg-[#f6f2e9] p-1.5 shadow-[0_70px_120px_-45px_rgba(0,0,0,0.95)]">
              <BrowserFrame url="clar1nz.freebuff.app/work/mare">
                <CafeMock />
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
            <CafePhoneMock />
          </div>
        </div>

        <div
          className="hero-rise absolute -bottom-5 left-0 hidden items-center gap-2 rounded-full border border-paper/10 bg-ink-soft/90 px-3.5 py-2 text-[8.5px] uppercase tracking-[0.16em] text-paper/65 backdrop-blur sm:flex"
          style={{ animationDelay: "780ms" }}
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#8fbf9f] opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#8fbf9f]" />
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
                to="/auth?returnTo=/dashboard"
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
