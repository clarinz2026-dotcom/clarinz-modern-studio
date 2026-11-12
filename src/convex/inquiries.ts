"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { vly } from "../lib/vly-integrations";
import { STUDIO } from "../lib/studio";

const LIMITS = {
  name: 80,
  email: 160,
  subject: 140,
  message: 3000,
} as const;

function clean(value: string, limit: number) {
  return value.trim().replace(/\s+/g, " ").slice(0, limit);
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (char) => entities[char] ?? char);
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

    let notified = false;

    try {
      const result = await vly.email.send(
        {
          to: STUDIO.email,
          replyTo: email,
          subject: `New inquiry — ${subject}`,
          text: [
            `New inquiry via ${STUDIO.brand}`,
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            "",
            message,
          ].join("\n"),
          html: `
            <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#111110;background:#fbfaf6;border:1px solid #ddd9ce;border-radius:18px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#b84028;">New website inquiry</p>
              <h1 style="margin:0 0 24px;font-size:24px;line-height:1.2;">${escapeHtml(subject)}</h1>
              <p style="margin:0 0 6px;font-size:13px;line-height:1.6;"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin:0 0 6px;font-size:13px;line-height:1.6;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#b84028;">${escapeHtml(email)}</a></p>
              <div style="margin:24px 0 0;padding:18px;border-left:3px solid #b84028;background:#f4f2ec;font-size:14px;line-height:1.7;color:#2b2b26;">
                ${escapeHtml(message).replace(/\n/g, "<br />")}
              </div>
              <p style="margin:24px 0 0;font-size:11px;line-height:1.6;color:#6b6860;">Sent from the ${STUDIO.brand} contact form.</p>
            </div>
          `,
        },
        { timeout: 12_000, retries: 1 },
      );

      notified = result.success && result.data?.status !== "failed";

      if (!notified) {
        console.error(
          "[inquiries] Email notification failed:",
          result.error ?? result.data?.error ?? "Unknown email error",
        );
      }
    } catch (error) {
      // The inquiry is already saved. Never lose it because email delivery failed.
      console.error("[inquiries] Email notification threw:", error);
    }

    return { ok: true, notified };
  },
});
