import { ArrowLeft } from "lucide-react";
import { Brand, CtaLink } from "@/components/site/ui";

export default function NotFound() {
  return (
    <main className="min-h-svh bg-paper text-ink">
      <header className="mx-auto max-w-[1120px] px-5 py-6 sm:px-8">
        <Brand />
      </header>

      <div className="mx-auto flex min-h-[70svh] max-w-[1120px] flex-col justify-center px-5 pb-16 sm:px-8">
        <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-smoke">
          <span className="size-1.5 rounded-full bg-brand" />
          404 / Not found
        </p>
        <h1 className="mt-4 font-display text-[clamp(4rem,14vw,11rem)] leading-[0.82] text-ink">
          WRONG
          <br />
          <span className="text-brand">TURN.</span>
        </h1>
        <p className="mt-5 max-w-[42ch] text-[13.5px] leading-7 text-smoke">
          That page isn’t part of the studio. Let’s get you back to the work.
        </p>
        <CtaLink
          to="/"
          icon={<ArrowLeft className="size-4" />}
          className="mt-6 self-start"
        >
          Back to home
        </CtaLink>
      </div>
    </main>
  );
}
