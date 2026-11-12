import { ArrowUpRight, Check } from "lucide-react";
import { LetterRise, Reveal } from "@/components/motion";
import { SOCIAL_LINKS, STUDIO } from "@/lib/studio";
import { ContactSection } from "./ContactSection";
import { Brand, CtaLink, SectionLabel } from "./ui";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Starter",
    pages: "Up to 3 pages",
    blurb: "A small, sharp site for one location, built for phones first.",
    features: ["2 rounds of changes", "Mobile-first build", "You own every file"],
  },
  {
    name: "Standard",
    pages: "Up to 5 pages",
    blurb: "A fuller site you can update yourself.",
    features: [
      "3 rounds of changes",
      "An easy editor for hours, menu and photos",
      "You own every file",
    ],
    featured: true,
  },
  {
    name: "Premium",
    pages: "Up to 7 pages",
    blurb: "Your full site plus a brand refresh.",
    features: [
      "Custom scroll animation",
      "4 rounds of changes",
      "An editor, a blog and a brand refresh",
      "You own every file",
    ],
  },
];

export function Packages() {
  return (
    <section
      id="packages"
      className="relative scroll-mt-20 border-t border-line bg-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <SectionLabel index="05">Packages</SectionLabel>

        <div className="mt-8 flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(3.2rem,8vw,7.2rem)] leading-[0.86] text-ink">
            <LetterRise text="PACKAGES" />
          </h2>
          <p className="max-w-[38ch] text-sm leading-7 text-smoke">
            Your fixed price comes in your proposal, after our call. No surprise
            bills, no hourly guessing.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 0.07} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[26px] border p-6 sm:p-7",
                  pkg.featured
                    ? "border-ink bg-ink text-paper shadow-soft md:-translate-y-3"
                    : "card-lift soft-panel border-line bg-surface text-ink",
                )}
              >
                {pkg.featured && (
                  <span className="absolute top-6 right-6 rounded-full bg-brand px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white">
                    Most chosen
                  </span>
                )}

                <p
                  className={cn(
                    "text-[9px] font-semibold uppercase tracking-[0.2em]",
                    pkg.featured ? "text-paper/40" : "text-smoke",
                  )}
                >
                  0{index + 1}
                </p>

                <h3 className="mt-6 font-display text-[2rem] leading-none tracking-[0.01em]">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-brand">
                  {pkg.pages}
                </p>
                <p
                  className={cn(
                    "mt-5 text-[13px] leading-6",
                    pkg.featured ? "text-paper/65" : "text-smoke",
                  )}
                >
                  {pkg.blurb}
                </p>

                <div
                  className={cn(
                    "mt-6 border-t pt-5",
                    pkg.featured ? "border-paper/15" : "border-line",
                  )}
                >
                  <p
                    className={cn(
                      "text-[9px] font-semibold uppercase tracking-[0.18em]",
                      pkg.featured ? "text-paper/35" : "text-smoke",
                    )}
                  >
                    What’s included
                  </p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[12px] leading-5"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-brand"
                          strokeWidth={2.4}
                        />
                        <span
                          className={
                            pkg.featured ? "text-paper/75" : "text-ink/75"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-7">
                  <CtaLink
                    to="/auth?returnTo=/dashboard"
                    variant={pkg.featured ? "paper" : "outline"}
                    className="w-full"
                    icon={<ArrowUpRight className="size-4" />}
                  >
                    Request a proposal
                  </CtaLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[11.5px] leading-5 text-smoke lg:flex-row lg:items-center lg:justify-between"
        >
          <p>
            Every package: hosting and domain are in your name, so the site
            stays yours.
          </p>
          <p>
            Extra changes after your rounds are billed at a rate we agree up
            front.
          </p>
          <p>Care plan after launch: optional.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <div className="bg-paper px-5 pb-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <ContactSection />
        </Reveal>

        <footer className="mt-8 border-t border-line pt-7">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <Brand />
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { label: "Work", href: "#work" },
                { label: "Process", href: "#process" },
                { label: "About", href: "#about" },
                { label: "Packages", href: "#packages" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="link-underline text-[9.5px] font-semibold uppercase tracking-[0.18em] text-smoke transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/auth?returnTo=/dashboard"
                className="link-underline text-[9.5px] font-semibold uppercase tracking-[0.18em] text-smoke transition-colors hover:text-ink"
              >
                Client portal
              </a>
            </nav>
            <a
              href="#top"
              className="self-start text-[9.5px] font-semibold uppercase tracking-[0.18em] text-smoke transition-colors hover:text-ink md:self-auto"
            >
              Back to top ↑
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-4">
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-smoke">
              Elsewhere
            </span>
            {SOCIAL_LINKS.map((profile) => (
              <a
                key={profile.key}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-smoke transition-colors hover:text-ink"
              >
                {profile.label}
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-line/70 pt-5 text-[10px] text-smoke sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {STUDIO.brand}. All rights reserved.</p>
            <p className="flex flex-wrap items-center gap-1.5">
              <span>{STUDIO.fullName}</span>
              <span className="size-1 rounded-full bg-brand" />
              <span className="uppercase tracking-[0.12em]">{STUDIO.tagline}</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
