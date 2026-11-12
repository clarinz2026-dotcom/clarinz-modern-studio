import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Loader2,
  LogOut,
  Mail,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Brand } from "@/components/site/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "New website",
  "Website redesign",
  "Landing page",
  "Brand + website",
  "Something else",
];

const BUDGETS = ["Under $2k", "$2k–$5k", "$5k–$10k", "$10k+", "Not sure yet"];

const TIMELINES = ["As soon as possible", "1–2 months", "3–6 months", "Just exploring"];

const emptyForm = {
  name: "",
  email: "",
  business: "",
  projectType: PROJECT_TYPES[0],
  budget: BUDGETS[1],
  timeline: TIMELINES[1],
  message: "",
};

const statusStyles = {
  new: "bg-brand/10 text-brand",
  reviewing: "bg-[#d9c38f]/30 text-[#7a5a1c]",
  scheduled: "bg-[#c9dbc9]/50 text-[#3c6448]",
} as const;

const statusLabels = {
  new: "New",
  reviewing: "In review",
  scheduled: "Scheduled",
} as const;

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

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const briefs = useQuery(api.briefs.listMine);
  const createBrief = useMutation(api.briefs.create);
  const removeBrief = useMutation(api.briefs.remove);

  const [form, setForm] = useState(emptyForm);
  const [prefilled, setPrefilled] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (prefilled || !user) return;
    setForm((current) => ({
      ...current,
      name: current.name || user.name || "",
      email: current.email || user.email || "",
    }));
    setPrefilled(true);
  }, [prefilled, user]);

  const setField =
    (key: keyof typeof emptyForm) =>
    (value: string) =>
      setForm((current) => ({ ...current, [key]: value }));

  const firstName = user?.name?.trim().split(/\s+/)[0];
  const initial = (user?.name?.trim()?.[0] ?? user?.email?.[0] ?? "C").toUpperCase();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await createBrief(form);
      toast.success("Brief received. I’ll reply within 24 hours.");
      setForm((current) => ({
        ...current,
        business: "",
        message: "",
        projectType: PROJECT_TYPES[0],
        budget: BUDGETS[1],
        timeline: TIMELINES[1],
      }));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not send the brief.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  async function handleRemove(id: Id<"briefs">) {
    try {
      await removeBrief({ id });
      toast.success("Brief removed.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not remove the brief.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-3 px-5 sm:px-8">
          <Brand />
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-smoke transition-colors hover:text-ink sm:inline-flex"
            >
              <ArrowLeft className="size-3.5" />
              Back to site
            </Link>
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
              Client portal
            </p>
            <h1 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98] font-semibold tracking-[-0.05em]">
              Let’s get your project moving
              {firstName ? `, ${firstName}` : ""}.
            </h1>
            <p className="mt-4 max-w-[54ch] text-[13.5px] leading-6 text-smoke">
              Send a brief, keep track of it here, and skip the back-and-forth.
              I read every one myself.
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
                Q1 2027 · 2 spots left
              </p>
            </div>
          </div>
        </div>

        {user?.isAnonymous && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#d9c38f]/60 bg-[#f4ead6]/60 px-4 py-3">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-[#8a671f]" />
            <p className="text-[11.5px] leading-5 text-[#6b5118]">
              You’re exploring as a guest. Briefs stay tied to this browser
              session — sign in with your email to keep them with you.
            </p>
          </div>
        )}

        <div className="mt-9 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[28px] border border-line bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-smoke">
                  New brief
                </p>
                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em]">
                  Start a project
                </h2>
              </div>
              <span className="grid size-10 place-items-center rounded-xl border border-brand/15 bg-brand/10 text-brand">
                <Sparkles className="size-4.5" />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name">
                  <Input
                    value={form.name}
                    onChange={(event) => setField("name")(event.target.value)}
                    placeholder="Clarinz Abrasaldo"
                    autoComplete="name"
                    className="h-11 rounded-xl border-line bg-paper/60 text-[13px]"
                  />
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => setField("email")(event.target.value)}
                    placeholder="you@business.com"
                    autoComplete="email"
                    className="h-11 rounded-xl border-line bg-paper/60 text-[13px]"
                  />
                </Field>
              </div>

              <Field label="Business name">
                <Input
                  required
                  value={form.business}
                  onChange={(event) => setField("business")(event.target.value)}
                  placeholder="What’s it called?"
                  className="h-11 rounded-xl border-line bg-paper/60 text-[13px]"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Project type">
                  <Select
                    value={form.projectType}
                    onValueChange={setField("projectType")}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-line bg-paper/60 text-[13px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Budget">
                  <Select
                    value={form.budget}
                    onValueChange={setField("budget")}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-line bg-paper/60 text-[13px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {BUDGETS.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field label="Timeline">
                <Select
                  value={form.timeline}
                  onValueChange={setField("timeline")}
                >
                  <SelectTrigger className="h-11 w-full rounded-xl border-line bg-paper/60 text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {TIMELINES.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>
                        {timeline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="What are we building?">
                <Textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(event) => setField("message")(event.target.value)}
                  placeholder="What does the business do, who are the customers, and what should the site make them do?"
                  className="min-h-28 resize-none rounded-xl border-line bg-paper/60 text-[13px] leading-6"
                />
              </Field>

              <Button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-full bg-brand text-[13px] font-semibold text-white hover:bg-brand-deep"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending brief…
                  </>
                ) : (
                  <>
                    Send project brief
                    <ArrowUpRight className="size-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-[10.5px] text-smoke">
              This goes straight to me — not a sales team.
            </p>
          </section>

          <div className="flex flex-col gap-6">
            <section className="rounded-[28px] border border-line bg-surface p-5 shadow-soft sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-semibold tracking-[-0.02em]">
                  Your briefs
                </h2>
                <span className="rounded-full border border-line px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-smoke">
                  {briefs?.length ?? 0} sent
                </span>
              </div>

              {briefs === undefined ? (
                <div className="mt-5 flex items-center gap-2 text-[11px] text-smoke">
                  <Loader2 className="size-3.5 animate-spin" />
                  Loading your briefs…
                </div>
              ) : briefs.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-line px-5 py-8 text-center">
                  <span className="mx-auto grid size-9 place-items-center rounded-full bg-paper">
                    <Mail className="size-4 text-smoke" />
                  </span>
                  <p className="mt-3 text-[12px] font-medium">
                    No briefs yet.
                  </p>
                  <p className="mt-1 text-[10.5px] leading-5 text-smoke">
                    The form next door is the place to start.
                  </p>
                </div>
              ) : (
                <ul className="mt-4 flex flex-col">
                  {briefs.map((brief) => (
                    <li
                      key={brief._id}
                      className="border-t border-line py-4 first:border-t-0 first:pt-1 last:pb-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold">
                            {brief.business}
                          </p>
                          <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.14em] text-smoke">
                            {brief.projectType} · {formatDate(brief.createdAt)}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em]",
                            statusStyles[brief.status],
                          )}
                        >
                          {statusLabels[brief.status]}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-[11.5px] leading-5 text-smoke">
                        {brief.message}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between gap-3">
                        <p className="text-[10px] text-smoke">
                          {brief.budget} · {brief.timeline}
                        </p>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-[10px] text-smoke transition-colors hover:text-destructive"
                            >
                              <Trash2 className="size-3" />
                              Remove
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-3xl border-line bg-surface">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove this brief?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-[12.5px] leading-6 text-smoke">
                                “{brief.business}” will be deleted from your
                                portal. This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-full">
                                Keep it
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemove(brief._id)}
                                className="rounded-full bg-brand text-white hover:bg-brand-deep"
                              >
                                Remove brief
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-paper shadow-soft">
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-paper/40">
                  What happens next
                </p>
                <ol className="mt-5 flex flex-col gap-4">
                  {[
                    { title: "I read the brief", copy: "Usually the same day." },
                    {
                      title: "You get a straight reply",
                      copy: "With questions, a direction and a price.",
                    },
                    {
                      title: "We book 20 minutes",
                      copy: "Only if it’s a fit on both sides.",
                    },
                  ].map((step, index) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-paper/15 text-[9px] font-semibold text-brand">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-[12px] font-medium">{step.title}</p>
                        <p className="mt-0.5 text-[10.5px] leading-5 text-paper/45">
                          {step.copy}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex items-center gap-2 border-t border-paper/10 pt-4 text-[9.5px] uppercase tracking-[0.14em] text-paper/40">
                  <Mail className="size-3.5 text-brand" />
                  Replies within 24 hours
                </div>
              </div>
            </section>

            <a
              href="/#packages"
              className="group flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 shadow-soft transition-colors hover:border-ink/20"
            >
              <div>
                <p className="text-[12px] font-semibold">Browse packages</p>
                <p className="mt-0.5 text-[10px] text-smoke">
                  See what’s included at each level.
                </p>
              </div>
              <span className="grid size-8 place-items-center rounded-full border border-line text-smoke transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <ArrowUpRight className="size-3.5" />
              </span>
            </a>

            <div className="flex items-center gap-2 px-1 text-[10px] text-smoke">
              <Check className="size-3.5 text-brand" />
              You own every file, domain and account.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
