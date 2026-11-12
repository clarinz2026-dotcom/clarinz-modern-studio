import { useState } from "react";
import { useAction } from "convex/react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  Github,
  Globe,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  consultationHref,
  mailtoHref,
  SOCIAL_LINKS,
  STUDIO,
} from "@/lib/studio";
import { CtaLink, SectionLabel } from "./ui";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-smoke">
        {label}
      </span>
      {children}
    </label>
  );
}

function SocialIcon({ profile }: { profile: string }) {
  if (profile === "github") {
    return <Github className="size-3.5" aria-hidden="true" />;
  }
  if (profile === "linkedin") {
    return <Linkedin className="size-3.5" aria-hidden="true" />;
  }
  return <Globe className="size-3.5" aria-hidden="true" />;
}

export function ContactSection() {
  const submitInquiry = useAction(api.inquiries.submit);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [notified, setNotified] = useState(true);
  const [sentName, setSentName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const setField =
    (key: keyof typeof initialForm) =>
    (value: string) =>
      setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setError(null);

    if (
      form.name.trim().length < 2 ||
      !form.email.trim() ||
      form.subject.trim().length < 2 ||
      form.message.trim().length < 10
    ) {
      setError(
        "Please add your name, email, a subject and a little detail about the project.",
      );
      return;
    }

    setStatus("sending");

    try {
      const result = await submitInquiry({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        website: form.website,
      });

      setNotified(Boolean(result?.notified));
      setSentName(form.name.trim().split(/\s+/)[0] || "there");
      setStatus("sent");
      setForm((current) => ({
        ...initialForm,
        name: current.name,
        email: current.email,
      }));
      toast.success("Inquiry received. Thank you.");
    } catch (submissionError) {
      console.error("Inquiry submission error:", submissionError);
      setStatus("idle");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please email me directly instead.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden rounded-[32px] bg-ink px-6 py-12 text-paper sm:px-8 sm:py-14 lg:px-14 lg:py-16"
    >
      <div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 right-[-6%] size-[520px] rounded-full bg-brand/20 blur-[140px]"
        aria-hidden="true"
      />
      <div className="grain-overlay" />

      <div className="relative">
        <div className="flex flex-col gap-3 border-b border-paper/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <SectionLabel index="06" tone="paper">
            Contact
          </SectionLabel>
          <span className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-paper/40">
            {STUDIO.tagline}
          </span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-12">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-brand">
              {STUDIO.brand}
            </p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-paper/40">
              {STUDIO.fullName} — Founder
            </p>

            <h2 className="mt-5 font-display text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.85] text-paper">
              LET&rsquo;S BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-brand">WORTH CLICKING.</span>
            </h2>

            <p className="mt-5 max-w-[42ch] text-[13.5px] leading-7 text-paper/55">
              Have a project, a rebuild or a question? Tell me what you are
              building and what it needs to do. I read every inquiry myself.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink
                href={consultationHref}
                variant="paper"
                className="w-full sm:w-auto"
                icon={<CalendarCheck className="size-4" />}
              >
                Book a Consultation
              </CtaLink>
              <a
                href={mailtoHref}
                className="link-underline inline-flex items-center justify-center gap-1.5 self-start text-[11.5px] font-semibold text-paper/65 transition-colors hover:text-paper sm:self-auto"
              >
                Or email me directly
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={mailtoHref}
                className="group flex items-center gap-3 rounded-2xl border border-paper/12 bg-paper/[0.04] p-3.5 transition-colors hover:border-paper/25 hover:bg-paper/[0.07]"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-paper/15 bg-paper/5 text-brand">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.18em] text-paper/40">
                    Gmail
                  </span>
                  <span className="mt-1 block truncate text-[11.5px] font-medium text-paper/80 group-hover:text-paper">
                    {STUDIO.email}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-paper/30 transition-colors group-hover:text-brand" />
              </a>

              <a
                href={`tel:${STUDIO.phone}`}
                className="group flex items-center gap-3 rounded-2xl border border-paper/12 bg-paper/[0.04] p-3.5 transition-colors hover:border-paper/25 hover:bg-paper/[0.07]"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-paper/15 bg-paper/5 text-brand">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.18em] text-paper/40">
                    Mobile
                  </span>
                  <span className="mt-1 block text-[11.5px] font-medium text-paper/80 group-hover:text-paper">
                    {STUDIO.phoneDisplay}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-paper/30 transition-colors group-hover:text-brand" />
              </a>
            </div>

            <div className="mt-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-paper/40">
                Online profiles
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((profile) => (
                  <a
                    key={profile.key}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.label} (opens in a new tab)`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-paper/15 px-3.5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-paper/60 transition-colors hover:border-paper/30 hover:text-paper"
                  >
                    <span className="text-brand">
                      <SocialIcon profile={profile.key} />
                    </span>
                    {profile.label}
                    <ArrowUpRight className="size-3 text-paper/30" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-surface p-5 text-ink shadow-lift sm:p-7">
            {status === "sent" ? (
              <div
                className="flex min-h-[420px] flex-col justify-between gap-8"
                aria-live="polite"
              >
                <div>
                  <span className="grid size-12 place-items-center rounded-full bg-brand/10 text-brand">
                    <Check className="size-5" strokeWidth={2.4} />
                  </span>
                  <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-smoke">
                    Inquiry received
                  </p>
                  <h3 className="mt-2 text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
                    Thanks, {sentName}.
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-[12.5px] leading-6 text-smoke">
                    {notified
                      ? `Your inquiry is on its way to ${STUDIO.brand}. I’ll reply directly to the email you provided.`
                      : `Your inquiry has been saved. For the fastest reply, email ${STUDIO.email} directly.`}
                  </p>

                  <div className="mt-6 rounded-2xl border border-line bg-paper/60 px-4 py-3">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-smoke">
                      Need to talk sooner?
                    </p>
                    <a
                      href={consultationHref}
                      className="link-underline mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-ink"
                    >
                      Book a Consultation
                      <ArrowUpRight className="size-3.5 text-brand" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-line pt-5 sm:flex-row">
                  <Button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setError(null);
                    }}
                    className="h-11 flex-1 rounded-full bg-ink text-[11.5px] font-semibold text-paper hover:bg-graphite"
                  >
                    Send another inquiry
                  </Button>
                  <a
                    href={mailtoHref}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-line text-[11.5px] font-semibold text-ink transition-colors hover:bg-ink/[0.04]"
                  >
                    <Mail className="size-3.5" />
                    Email directly
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-smoke">
                      Inquiry form
                    </p>
                    <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.035em]">
                      Send an inquiry
                    </h3>
                    <p className="mt-1.5 max-w-[36ch] text-[11.5px] leading-5 text-smoke">
                      A few details now saves a lot of back and forth later.
                    </p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-brand/15 bg-brand/10 text-brand">
                    <Send className="size-4" />
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name">
                      <Input
                        name="name"
                        required
                        minLength={2}
                        maxLength={80}
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(event) =>
                          setField("name")(event.target.value)
                        }
                        disabled={status === "sending"}
                        className="h-11 rounded-xl border-line bg-paper/70 text-base sm:text-[13px]"
                      />
                    </Field>
                    <Field label="Email">
                      <Input
                        name="email"
                        type="email"
                        required
                        maxLength={160}
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(event) =>
                          setField("email")(event.target.value)
                        }
                        disabled={status === "sending"}
                        className="h-11 rounded-xl border-line bg-paper/70 text-base sm:text-[13px]"
                      />
                    </Field>
                  </div>

                  <Field label="Subject">
                    <Input
                      name="subject"
                      required
                      minLength={2}
                      maxLength={140}
                      placeholder="New site, redesign, consultation…"
                      value={form.subject}
                      onChange={(event) =>
                        setField("subject")(event.target.value)
                      }
                      disabled={status === "sending"}
                      className="h-11 rounded-xl border-line bg-paper/70 text-base sm:text-[13px]"
                    />
                  </Field>

                  <Field label="Message">
                    <Textarea
                      name="message"
                      required
                      minLength={10}
                      maxLength={3000}
                      rows={5}
                      placeholder="What are you building, who is it for, and what should it make people do?"
                      value={form.message}
                      onChange={(event) =>
                        setField("message")(event.target.value)
                      }
                      disabled={status === "sending"}
                      className="min-h-32 resize-none rounded-xl border-line bg-paper/70 text-base leading-6 sm:text-[13px]"
                    />
                  </Field>

                  <div className="sr-only" aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(event) =>
                          setField("website")(event.target.value)
                        }
                      />
                    </label>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-[11px] leading-5 text-destructive"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 h-12 w-full rounded-full bg-brand text-[12.5px] font-semibold text-white hover:bg-brand-deep"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending inquiry…
                      </>
                    ) : (
                      <>
                        Send inquiry
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[10px] leading-5 text-smoke">
                  <Mail className="size-3.5 text-brand" aria-hidden="true" />
                  <span>Prefer email?</span>
                  <a
                    href={mailtoHref}
                    className="font-semibold text-ink underline decoration-line underline-offset-2 hover:text-brand"
                  >
                    {STUDIO.email}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
