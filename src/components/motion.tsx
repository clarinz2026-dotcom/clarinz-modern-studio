import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts a block into view once it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Masks a line of text and lifts it up on scroll, like a letterpress slot. */
export function LineRise({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={cn("slot-mask block", className)}>
      <motion.span
        className="block will-change-transform"
        initial={reduce ? false : { y: "112%" }}
        whileInView={reduce ? undefined : { y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Per-letter masked reveal for the big Anton section headings. */
export function LetterRise({
  text,
  className,
  delay = 0,
  stagger = 0.035,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {text.split(" ").map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className="slot-mask mr-[0.22em] inline-flex last:mr-0"
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${char}-${charIndex}`}
                className="inline-block will-change-transform"
                initial={reduce ? false : { y: "112%", rotate: 3 }}
                whileInView={reduce ? undefined : { y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.85,
                  delay:
                    delay + wordIndex * 0.07 + charIndex * stagger,
                  ease: EASE,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
