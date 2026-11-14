import { action } from "./_generated/server";
import type { ActionCtx } from "./_generated/server";
import { v } from "convex/values";

export const send = action({
  args: {
    to: v.string(),
    replyTo: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) =>
    sendEmailViaGateway(ctx, {
      to: args.to,
      replyTo: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
    }),
});

export const sendFallback = action({
  args: {
    to: v.string(),
    replyTo: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) =>
    sendEmailViaGateway(ctx, {
      to: args.to,
      replyTo: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
    }),
});

async function sendEmailViaGateway(
  _ctx: ActionCtx,
  request: {
    to: string;
    replyTo: string;
    subject: string;
    html: string;
    text: string;
  },
): Promise<{ ok: boolean; notified: boolean }> {
  const response = await fetch(
    `${process.env.VLY_INTEGRATION_BASE_URL ?? "https://integrations.vly.ai"}/v1/email/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VLY_INTEGRATION_KEY}`,
      },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      `Email gateway returned ${response.status}: ${responseText.slice(0, 500)}`,
    );
  }

  return { ok: true, notified: true };
}
