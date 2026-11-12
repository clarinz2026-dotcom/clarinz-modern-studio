import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  const { pathname } = useLocation();

  return (
    <Link
      to="/"
      aria-label="Clarinz Abrasaldo — home"
      onClick={() => {
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl border font-display text-lg leading-none transition-colors duration-300",
          tone === "paper"
            ? "border-paper/15 bg-paper/5 text-paper group-hover:bg-paper group-hover:text-ink"
            : "border-ink/10 bg-ink text-paper group-hover:bg-brand",
        )}
      >
        C
      </span>
      <span className="flex flex-col gap-1 leading-none">
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.34em]",
            tone === "paper" ? "text-paper" : "text-ink",
          )}
        >
          Clarinz
        </span>
        <span
          className={cn(
            "text-[8px] uppercase tracking-[0.28em]",
            tone === "paper" ? "text-paper/45" : "text-smoke",
          )}
        >
          Abrasaldo
        </span>
      </span>
    </Link>
  );
}

const ctaVariants = {
  brand: "bg-brand text-white hover:bg-brand-deep",
  ink: "bg-ink text-paper hover:bg-graphite",
  paper: "bg-paper text-ink hover:bg-white",
  outline: "border border-line bg-transparent text-ink hover:bg-ink/[0.04]",
  outlineLight:
    "border border-paper/20 bg-transparent text-paper hover:bg-paper/10",
} as const;

export function CtaLink({
  to,
  href,
  children,
  variant = "brand",
  className,
  icon,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: keyof typeof ctaVariants;
  className?: string;
  icon?: ReactNode;
}) {
  const classes = cn(
    "btn-cta group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[13px] font-semibold tracking-[-0.01em]",
    ctaVariants[variant],
    className,
  );
  const content = (
    <>
      {children}
      {icon ?? <ArrowUpRight className="size-4" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to ?? "/auth?returnTo=/dashboard"} className={classes}>
      {content}
    </Link>
  );
}

export function SectionLabel({
  index,
  children,
  tone = "ink",
  className,
}: {
  index: string;
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em]",
        tone === "paper" ? "text-paper/50" : "text-smoke",
        className,
      )}
    >
      <span className="text-brand">{index}</span>
      <span
        className={cn(
          "h-px w-7",
          tone === "paper" ? "bg-paper/20" : "bg-line",
        )}
      />
      <span>{children}</span>
    </div>
  );
}
