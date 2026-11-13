import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Brand, CtaLink } from "./ui";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const threshold = hero
        ? Math.max(320, hero.offsetHeight - 96)
        : Math.max(420, window.innerHeight * 0.9);
      setSolid(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,box-shadow] duration-500",
        solid
          ? "border-b border-line/80 bg-paper/85 text-ink shadow-[0_18px_40px_-32px_rgba(17,17,16,0.4)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent text-paper",
      )}
    >
      <div className="mx-auto flex h-18 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <div className="nav-drop" style={{ animationDelay: "80ms" }}>
          <Brand tone={solid ? "ink" : "paper"} />
        </div>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline text-[10.5px] font-semibold uppercase tracking-[0.2em] opacity-70 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:block">
            <CtaLink
              href="#contact"
              variant="brand"
              className="h-10 px-5 text-[12px]"
            >
              Start a project
            </CtaLink>
          </span>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "grid size-10 place-items-center rounded-full border transition-colors lg:hidden",
              solid
                ? "border-line bg-surface text-ink hover:bg-ink hover:text-paper"
                : "border-paper/15 bg-paper/5 text-paper hover:bg-paper/10",
            )}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-3 mb-3 overflow-hidden rounded-3xl border border-line bg-surface p-5 text-ink shadow-lift sm:mx-4 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line/70 py-3.5 text-[13px] font-semibold"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] tracking-[0.18em] text-smoke">
                    0{index + 1}
                  </span>
                </a>
              ))}
            </nav>
            <CtaLink
              href="#contact"
              className="mt-5 w-full"
            >
              Start a project
            </CtaLink>
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-smoke">
              Fixed price before work starts
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
