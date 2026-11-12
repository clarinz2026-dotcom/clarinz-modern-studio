import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  children,
  className,
  url = "clar1nz.freebuff.app/concept",
}: {
  children: ReactNode;
  className?: string;
  url?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-black/10 bg-white",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#f0ede5] px-3 py-2">
        <div className="flex gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-[#c9a79a]" />
          <span className="size-1.5 rounded-full bg-[#d8c69d]" />
          <span className="size-1.5 rounded-full bg-[#a9bda4]" />
        </div>
        <div className="mx-auto flex w-full max-w-[200px] min-w-0 items-center justify-center truncate rounded-full bg-white/75 px-3 py-1 text-[6.5px] tracking-[0.04em] text-black/40">
          {url}
        </div>
        <div className="w-6" aria-hidden="true" />
      </div>
      <div className="aspect-16/10 overflow-hidden">{children}</div>
    </div>
  );
}

export function ProjectPhoneMock() {
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
