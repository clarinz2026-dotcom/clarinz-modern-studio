import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Brand } from "@/components/site/ui";
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Mail,
  UserX,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("The verification code you entered is incorrect.");
      setIsLoading(false);
      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      setError(
        `Failed to sign in as guest: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-paper text-ink">
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] size-[520px] rounded-full bg-brand/8 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] size-[420px] rounded-full bg-[#d8bfa8]/20 blur-[130px]"
        aria-hidden="true"
      />

      <header className="relative mx-auto flex max-w-[1120px] items-center justify-between px-5 py-6 sm:px-8">
        <Brand />
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-smoke shadow-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" />
          Back to site
        </Link>
      </header>

      <main className="relative mx-auto w-full max-w-[1120px] px-5 pb-12 sm:px-8">
        <div className="grid overflow-hidden rounded-[32px] border border-line bg-surface shadow-lift lg:grid-cols-[0.92fr_1.08fr]">
          <aside className="relative hidden overflow-hidden bg-ink p-10 text-paper lg:flex lg:flex-col lg:justify-between">
            <div
              className="hero-grid pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -top-32 -right-20 size-80 rounded-full bg-brand/20 blur-[100px]"
              aria-hidden="true"
            />
            <div className="grain-overlay" />

            <div className="relative">
              <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-paper/40">
                <span className="size-1.5 rounded-full bg-brand" />
                Client portal
              </p>
              <p className="mt-5 font-display text-[clamp(2.6rem,4vw,3.7rem)] leading-[0.9]">
                YOUR PROJECT,
                <br />
                IN ONE CALM
                <br />
                <span className="text-brand">PLACE.</span>
              </p>
              <p className="mt-5 max-w-[34ch] text-[12.5px] leading-6 text-paper/50">
                Send a brief, see what happens next, and keep the whole project
                in one place — without another app to learn.
              </p>

              <ul className="mt-7 flex flex-col gap-3">
                {[
                  "A fixed price before work starts",
                  "One person from brief to launch",
                  "Your files, your domain, your site",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[11.5px] text-paper/65"
                  >
                    <span className="grid size-4.5 shrink-0 place-items-center rounded-full border border-paper/15">
                      <Check className="size-2.5 text-brand" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex items-center justify-between border-t border-paper/10 pt-5 text-[8.5px] uppercase tracking-[0.18em] text-paper/35">
              <span>Clarinz Abrasaldo</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#8fbf9f]" />
                Booking Q1 2027
              </span>
            </div>
          </aside>

          <section className="p-6 sm:p-10 lg:p-12">
            {step === "signIn" ? (
              <>
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-smoke">
                  Welcome
                </p>
                <h1 className="mt-3 text-[clamp(1.9rem,3.2vw,2.5rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
                  Sign in to your project.
                </h1>
                <p className="mt-3 max-w-[38ch] text-[12.5px] leading-6 text-smoke">
                  Enter your email and I’ll send a six-digit code. No password
                  to remember, no account setup maze.
                </p>

                <form onSubmit={handleEmailSubmit} className="mt-7 flex flex-col gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-smoke">
                      Email address
                    </span>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-smoke" />
                      <Input
                        name="email"
                        placeholder="you@business.com"
                        type="email"
                        autoComplete="email"
                        className="h-12 rounded-xl border-line bg-paper/70 pl-10 text-[13px]"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </label>

                  {error && (
                    <p className="rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-[11px] leading-5 text-destructive">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 w-full rounded-full bg-brand text-[12.5px] font-semibold text-white hover:bg-brand-deep"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending code…
                      </>
                    ) : (
                      <>
                        Email me a code
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-line" />
                  <span className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-smoke">
                    or
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="h-12 w-full rounded-full border-line bg-transparent text-[12px] text-ink hover:bg-ink/[0.04]"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                >
                  <UserX className="size-4" />
                  Continue as guest
                </Button>

                <p className="mt-4 text-center text-[10px] leading-5 text-smoke">
                  Guest mode keeps briefs tied to this browser session.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("signIn");
                      setError(null);
                      setOtp("");
                    }}
                    className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-smoke transition-colors hover:text-ink"
                  >
                    <ArrowLeft className="size-3.5" />
                    Different email
                  </button>
                  <span className="text-[8.5px] uppercase tracking-[0.18em] text-smoke">
                    Step 2 of 2
                  </span>
                </div>

                <h1 className="mt-5 text-[clamp(1.9rem,3.2vw,2.5rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
                  Check your inbox.
                </h1>
                <p className="mt-3 text-[12.5px] leading-6 text-smoke">
                  I sent a six-digit code to{" "}
                  <span className="font-semibold text-ink">{step.email}</span>.
                  It expires in 15 minutes.
                </p>

                <form onSubmit={handleOtpSubmit} className="mt-7">
                  <input type="hidden" name="email" value={step.email} />
                  <input type="hidden" name="code" value={otp} />

                  <div className="flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      disabled={isLoading}
                      autoFocus
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          otp.length === 6 &&
                          !isLoading
                        ) {
                          const form = (
                            event.target as HTMLElement
                          ).closest("form");
                          if (form) form.requestSubmit();
                        }
                      }}
                    >
                      <InputOTPGroup className="gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="size-11 rounded-xl border border-line bg-paper/70 text-[15px] sm:size-12"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {error && (
                    <p className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-center text-[11px] leading-5 text-destructive">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="mt-5 h-12 w-full rounded-full bg-brand text-[12.5px] font-semibold text-white hover:bg-brand-deep"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Verifying…
                      </>
                    ) : (
                      <>
                        Verify and continue
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setStep("signIn");
                      setError(null);
                    }}
                    disabled={isLoading}
                    className="mt-2 h-10 w-full rounded-full text-[11px] text-smoke hover:bg-ink/5 hover:text-ink"
                  >
                    Use a different email
                  </Button>
                </form>
              </>
            )}

            <p className="mt-8 border-t border-line pt-5 text-center text-[9.5px] text-smoke">
              Secured by{" "}
              <a
                href="https://freebuff.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-2 transition-colors hover:text-ink"
              >
                freebuff.com
              </a>
            </p>
          </section>
        </div>

        <p className="mt-6 text-center text-[9px] uppercase tracking-[0.18em] text-smoke">
          No spam. No sales calls. Just a straight reply.
        </p>
      </main>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
