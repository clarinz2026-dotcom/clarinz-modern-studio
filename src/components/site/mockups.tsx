import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  children,
  className,
  url = "clarinz.studio/concept",
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

export function CafeMock() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#f8f0e3] p-4 text-[#2a1d15] sm:p-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[13px] tracking-[0.18em] sm:text-base">
          MARÉ
        </span>
        <div className="flex gap-3 text-[5.5px] font-medium uppercase tracking-[0.18em] text-[#6b584a]">
          <span>Menu</span>
          <span className="hidden sm:inline">Our story</span>
          <span>Visit</span>
        </div>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-[1.12fr_0.88fr] items-center gap-3 sm:gap-4">
        <div>
          <p className="text-[6px] uppercase tracking-[0.22em] text-[#9b7c63]">
            Neighbourhood café
          </p>
          <h4 className="mt-2 font-display text-[clamp(1.35rem,2.8vw,2.45rem)] leading-[0.9]">
            Slow mornings.
            <br />
            Good coffee.
          </h4>
          <p className="mt-2 max-w-[24ch] text-[6.5px] leading-[1.55] text-[#7b6555]">
            A corner café for people who like their flat white made properly.
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-[#b4502c] px-2 py-1 text-[6px] font-semibold uppercase tracking-[0.16em] text-[#fdf7ee]">
            Reserve a table <span aria-hidden="true">↗</span>
          </span>
        </div>

        <div className="relative h-full max-h-[150px] min-h-[88px] overflow-hidden rounded-lg bg-[#c06a42]">
          <div className="absolute -top-5 -right-5 size-20 rounded-full bg-[#e7b382]" />
          <div className="absolute bottom-3 left-2 size-14 rounded-full border-[5px] border-[#f8f0e3]/75" />
          <div className="absolute right-3 bottom-4 h-8 w-px bg-[#f8f0e3]/40" />
          <span className="absolute right-2 bottom-2 text-[5px] uppercase tracking-[0.2em] text-[#f8f0e3]/75">
            Est. 2016
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#2a1d15]/10 pt-2 text-[5.5px] uppercase tracking-[0.14em] text-[#6b584a]">
        <span className="flex justify-between gap-1">
          <span>Espresso</span>
          <span>3.5</span>
        </span>
        <span className="flex justify-between gap-1">
          <span>Flat white</span>
          <span>4.2</span>
        </span>
        <span className="flex justify-between gap-1">
          <span>Croissant</span>
          <span>3.8</span>
        </span>
      </div>
    </div>
  );
}

export function CafePhoneMock() {
  return (
    <div className="overflow-hidden rounded-[18px] border-[3px] border-[#101010] bg-[#f8f0e3] text-[#2a1d15] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.55)]">
      <div className="mx-auto mt-1.5 h-1 w-7 rounded-full bg-black/20" />
      <div className="p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[8px] tracking-[0.16em]">MARÉ</span>
          <span className="text-[5px] uppercase tracking-[0.16em] text-[#8a715d]">
            Menu
          </span>
        </div>
        <p className="mt-3 font-display text-[17px] leading-[0.92]">
          Slow
          <br />
          mornings.
        </p>
        <div className="relative mt-2 h-16 overflow-hidden rounded-md bg-[#c06a42]">
          <div className="absolute -top-3 -right-3 size-12 rounded-full bg-[#e7b382]" />
          <div className="absolute bottom-2 left-2 size-8 rounded-full border-[3px] border-[#f8f0e3]/70" />
        </div>
        <div className="mt-2 rounded-full bg-[#b4502c] py-1.5 text-center text-[5px] font-semibold uppercase tracking-[0.16em] text-[#fdf7ee]">
          Reserve a table
        </div>
      </div>
    </div>
  );
}

export function DentalMock() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#edf2ef] p-4 text-[#16241f] sm:p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[8px] font-semibold tracking-[0.2em] uppercase sm:text-[9px]">
          <span className="grid size-3 place-items-center rounded-[3px] bg-[#16241f] text-[5px] text-white">
            N
          </span>
          Northline
        </span>
        <div className="flex gap-3 text-[5.5px] font-medium uppercase tracking-[0.16em] text-[#61736b]">
          <span>Care</span>
          <span className="hidden sm:inline">Team</span>
          <span>Book</span>
        </div>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-[1.05fr_0.95fr] items-center gap-3 sm:gap-4">
        <div>
          <p className="text-[6px] uppercase tracking-[0.22em] text-[#6d8279]">
            Family dentistry · Northside
          </p>
          <h4 className="mt-2 text-[clamp(1.15rem,2.55vw,2.15rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
            Care that
            <br />
            feels calm.
          </h4>
          <p className="mt-2 max-w-[26ch] text-[6.5px] leading-[1.55] text-[#5d6f67]">
            Gentle, unhurried appointments — with clear pricing before you sit
            down.
          </p>
          <div className="mt-2.5 flex items-center gap-1.5 text-[5.5px] uppercase tracking-[0.14em] text-[#4c6057]">
            <span className="size-1 rounded-full bg-[#6d9a84]" />
            New patients welcome
          </div>
        </div>

        <div className="rounded-lg border border-[#16241f]/8 bg-white p-2.5 shadow-[0_10px_24px_-16px_rgba(22,36,31,0.4)]">
          <p className="text-[5px] uppercase tracking-[0.18em] text-[#7a8c84]">
            Next available
          </p>
          <p className="mt-1 text-[12px] font-semibold tracking-[-0.03em] sm:text-[13px]">
            Tuesday, 10:30
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {["Mon 9:00", "Tue 10:30", "Wed 14:00"].map((slot, index) => (
              <span
                key={slot}
                className={cn(
                  "rounded-[4px] border px-1 py-1 text-center text-[4.5px] tracking-[0.02em]",
                  index === 1
                    ? "border-[#16241f] bg-[#16241f] text-white"
                    : "border-[#16241f]/12 text-[#5d6f67]",
                )}
              >
                {slot}
              </span>
            ))}
          </div>
          <div className="mt-2 rounded-[4px] bg-[#8fb7a1] py-1 text-center text-[5px] font-semibold uppercase tracking-[0.14em] text-[#14231d]">
            Request appointment
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#16241f]/8 pt-2 text-[5px] uppercase tracking-[0.14em] text-[#5d6f67]">
        <span>General care</span>
        <span>Hygiene</span>
        <span>Whitening</span>
      </div>
    </div>
  );
}

export function StudioMock() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#151514] p-4 text-[#f1eee6] sm:p-5">
      <div className="flex items-center justify-between text-[5.5px] uppercase tracking-[0.2em] text-[#f1eee6]/45">
        <span>Alto Studio</span>
        <span>Work / About / Contact</span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4 py-3">
        <h4 className="font-display text-[clamp(1.55rem,3.4vw,3.1rem)] leading-[0.86]">
          Spaces
          <br />
          with a point
          <br />
          of view.
        </h4>
        <div className="max-w-[16ch] text-right text-[5.5px] leading-[1.6] uppercase tracking-[0.16em] text-[#f1eee6]/40">
          Architecture
          <br />
          Interiors
          <br />
          Objects
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Casa Lume", tone: "from-[#8f816c] to-[#5f5749]" },
          { label: "Atelier 04", tone: "from-[#a7a49a] to-[#6e6c64]" },
          { label: "House No. 9", tone: "from-[#6b5a47] to-[#3b332a]" },
        ].map((tile) => (
          <div key={tile.label}>
            <div
              className={cn(
                "relative aspect-4/3 overflow-hidden rounded-[3px] bg-gradient-to-br",
                tile.tone,
              )}
            >
              <span className="absolute inset-x-2 bottom-1.5 h-px bg-white/25" />
              <span className="absolute top-2 left-2 size-3 rounded-full border border-white/30" />
            </div>
            <p className="mt-1 text-[5px] uppercase tracking-[0.14em] text-[#f1eee6]/50">
              {tile.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
