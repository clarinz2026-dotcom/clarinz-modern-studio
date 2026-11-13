import { Button } from "@/components/ui/button";
import { Brand } from "@/components/site/ui";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

/**
 * Wraps a route that requires a signed-in user.
 *
 * Signed-out visitors used to be bounced straight to `/auth`, which left them
 * on a bare sign-in form with no idea which page they had asked for or why they
 * were moved. The block is now stated on the page they landed on, and sign-in
 * still returns them to it via `returnTo`. Pass `redirectImmediately` for a
 * route where the bounce really is the better experience.
 */
export function RequireAuth({
  children,
  title = "Sign in to continue",
  description = "This page is only available to signed-in users.",
  redirectImmediately = false,
}: {
  children: ReactNode;
  /** Headline on the blocked screen. */
  title?: string;
  /** Says what the visitor gets by signing in. */
  description?: string;
  /** Skip the explanation and go straight to `/auth`. */
  redirectImmediately?: boolean;
}) {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-paper">
        <Loader2 className="size-6 animate-spin text-smoke" />
      </main>
    );
  }

  if (!isAuthenticated) {
    const returnTo = `${location.pathname}${location.search}`;
    const signInHref = `/auth?returnTo=${encodeURIComponent(returnTo)}`;

    if (redirectImmediately) {
      return <Navigate to={signInHref} replace />;
    }

    return (
      <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-paper px-5 py-12 text-ink">
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] size-[520px] rounded-full bg-brand/8 blur-[140px]"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-md">
          <div className="flex justify-center">
            <Brand />
          </div>

          <div className="mt-7 rounded-[28px] border border-line bg-surface p-7 text-center sm:p-9">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-brand/10 text-brand">
              <Lock className="size-5" strokeWidth={2.2} />
            </span>

            <h1 className="mt-5 text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
              {title}
            </h1>
            <p className="mt-3 text-[12.5px] leading-6 text-smoke">
              {description}
            </p>
            <p className="mt-4 text-[11px] leading-5 text-smoke/80">
              You&rsquo;ll come straight back to this page once you&rsquo;re
              signed in.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <Button
                className="h-11 w-full cursor-pointer rounded-full bg-brand text-[12.5px] font-semibold text-white hover:bg-brand-deep"
                onClick={() => navigate(signInHref)}
              >
                Sign in
              </Button>
              <Button
                variant="ghost"
                className="h-11 w-full cursor-pointer rounded-full text-[12px] font-semibold text-smoke hover:bg-ink/5 hover:text-ink"
                onClick={() => navigate("/")}
              >
                Back to home
              </Button>
            </div>
          </div>

          <p className="mt-5 text-center text-[9px] uppercase tracking-[0.18em] text-smoke">
            No spam. No sales calls. Just a straight reply.
          </p>
        </div>
      </main>
    );
  }

  return children;
}
