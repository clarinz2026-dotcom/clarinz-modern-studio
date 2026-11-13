import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { sendStudioInquiryEmail } from "./emailNotifications";

const LIMITS = {
  name: 80,
  email: 160,
  subject: 140,
  message: 3000,
} as const;

function clean(value: string, limit: number) {
  return value.trim().replace(/\s+/g, " ").slice(0, limit);
}

export const submit = action({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Honeypot: pretend success so naive bots do not retry.
    if (args.website?.trim()) {
      return { ok: true, notified: false };
    }

    const name = clean(args.name, LIMITS.name);
    const email = clean(args.email, LIMITS.email);
    const subject = clean(args.subject, LIMITS.subject);
    const message = args.message.trim().slice(0, LIMITS.message);

    if (name.length < 2) {
      throw new Error("Please add your name.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please add an email address I can reply to.");
    }
    if (subject.length < 2) {
      throw new Error("Please add a subject.");
    }
    if (message.length < 10) {
      throw new Error("Please add a little more detail (10+ characters).");
    }

    await ctx.runMutation(internal.inquiriesData.record, {
      name,
      email,
      subject,
      message,
    });

    const notified = await sendStudioInquiryEmail(ctx, {
      name,
      email,
      subject,
      message,
    });

    return { ok: true, notified };
  },
});
