import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  LogOut,
  Mail,
} from "lucide-react";
import { Brand } from "@/components/site/ui";
import { STUDIO } from "@/lib/studio";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const userName = user?.name?.trim() || "client";
  const userEmail = user?.email?.trim() ?? "";
  const firstName = userName.split(/\s+/)[0];
  const initial = (user?.name?.trim()?.[0] ?? user?.email?.[0] ?? "C").toUpperCase();

  function openDirectEmail() {
    window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(
      `Project inquiry from ${userName}`
    )}`;
  }

  function openWhatsApp() {
    const message = `Hi Clarinz, I'd like to discuss a project.\nFrom: ${userName}${userEmail ? `\nEmail: ${userEmail}` : ""}`;
    window.location.href = `https://wa.me/${STUDIO.mobile.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  const socialLinks = [
    { label: "Portfolio", href: STUDIO.portfolio },
    { label: "GitHub", href: STUDIO.github },
    { label: "LinkedIn", href: STUDIO.linkedin },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-3 px-5 sm:px-8">
          <Brand />
          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href="/"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-smoke transition-colors hover:text-ink sm:inline-flex"
            >
              <ArrowLeft className="size-3.5" />
              Back to site
            </a>
            <div className="hidden items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-1 sm:flex">
              <span className="grid size-7 place-items-center rounded-full bg-ink text-[10px] font-semibold text-paper">
                {initial}
              </span>
              <span className="max-w-[150px] truncate text-[11px] font-medium">
                {user?.name || user?.email || "Client"}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={handleSignOut}
              className="h-9 rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-smoke hover:bg-ink/5 hover:text-ink"
            >
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:py-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-smoke">
              <span className="size-1.5 rounded-full bg-brand" />
              Client dashboard
            </p>
            <h1 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98] font-semibold tracking-[-0.05em]">
              Let’s get your project moving{firstName ? `, ${firstName}` : ""}.
            </h1>
            <p className="mt-3 max-w-[54ch] text-[13.5px] leading-6 text-smoke">
              Start the conversation directly from this page — email or WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-soft">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#6f9c7d] opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-[#6f9c7d]" />
            </span>
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-smoke">
                Booking
              </p>
              <p className="mt-0.5 text-[12px] font-semibold">
                Open for new projects
              </p>
            </div>
          </div>
        </div>

        <div className="mt-9 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[28px] border border-line bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-smoke">
                  Direct contact
                </p>
                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em]">
                  Start the conversation
                </h2>
              </div>
              <span className="grid size-10 place-items-center rounded-xl border border-brand/15 bg-brand/10 text-brand">
                <ArrowUpRight className="size-4.5" />
              </span>
            </div>

            <div className="mt-7 grid gap-4">
              <Button
                type="button"
                className="h-12 w-full rounded-full bg-brand text-[13px] font-semibold text-white hover:bg-brand-deep"
                onClick={openDirectEmail}
              >
                <Mail className="size-4" />
                Email the studio
                <ArrowUpRight className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-full border-line text-[13px] font-semibold text-ink hover:bg-ink/[0.03]"
                onClick={openWhatsApp}
              >
                <ArrowUpRight className="size-4" />
                Chat on WhatsApp
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </section>

          <div className="flex flex-col gap-6">
            <section className="rounded-[28px] border border-line bg-surface p-5 shadow-soft sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Signed in as
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium">
                    {user?.name || user?.email || "—"}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="h-8 rounded-full px-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-smoke hover:bg-ink/5 hover:text-ink"
                  >
                    <LogOut className="size-3" />
                    Sign out
                  </Button>
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-paper shadow-soft">
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-paper/40">
                  Studio contact + profile
                </p>

                <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-paper/10 bg-surface/40 p-5 text-paper/80">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-brand" />
                    <div>
                      <p className="text-[11px] font-semibold">Email</p>
                      <a
                        href={`mailto:${STUDIO.email}`}
                        className="text-[12px] leading-5 underline decoration-line underline-offset-2 hover:text-paper"
                      >
                        {STUDIO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/${STUDIO.mobile.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 bg-paper/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-paper/20"
                    >
                      WhatsApp
                      <ArrowUpRight className="size-3" />
                    </a>
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 bg-paper/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-paper/20"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3" />
                      </a>
                    ))}
                  </div>

                  <p className="mt-1 text-[9.5px] leading-5 text-paper/45">
                    A compact shortcut to the studio contact links.
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${STUDIO.email}?subject=${encodeURIComponent(`Project inquiry from ${userName}`)}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 shadow-soft transition-colors hover:border-ink/20"
              >
                <div>
                  <p className="text-[13px] font-semibold">Email a brief</p>
                  <p className="mt-0.5 text-[10px] text-smoke">
                    Opens your email app with the studio address and a pre-filled subject.
                  </p>
                </div>
                <span className="grid size-8 place-items-center rounded-full border border-line text-smoke transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </a>

              <a
                href={`https://wa.me/${STUDIO.mobile.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Clarinz, I'd like to discuss a project.\nFrom: ${userName}${userEmail ? `\nEmail: ${userEmail}` : ""}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 shadow-soft transition-colors hover:border-ink/20"
              >
                <div>
                  <p className="text-[13px] font-semibold">WhatsApp the studio</p>
                  <p className="mt-0.5 text-[10px] text-smoke">
                    Open a prepared chat with your name and contact details ready to send.
                  </p>
                </div>
                <span className="grid size-8 place-items-center rounded-full border border-line text-smoke transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-surface px-5 py-4">
              <p className="flex items-center gap-2 text-[10px] leading-5 text-smoke">
                <Check className="size-3.5 shrink-0 text-brand" />
                Every project file, domain, and account stays in your hands.
              </p>
            </div>

            <div>
              <p className="mt-1 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-smoke">
                Elsewhere
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-smoke">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
                <a href={`mailto:${STUDIO.email}`} className="transition-colors hover:text-ink">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 border-t border-line pt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-smoke/60">
            © {new Date().getFullYear()} THE DEVIGN STUDIO · BUILD TO PERFORM ONLY.
          </p>
        </footer>
      </main>
    </div>
  );
}
