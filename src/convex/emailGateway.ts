import { action } from "./_generated/server";
import { v } from "convex/values";

import { STUDIO } from "@/lib/studio";

export const send = action({
  args: {
    to: v.string(),
    replyTo: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await sendEmailViaGateway(ctx, {
      to: args.to,
      replyTo: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
    });
  },
});

// Internal fallback path used by studio notifications when the project’s
// primary email integration is temporarily unavailable.

export const sendFallback = action({
  args: {
    to: v.string(),
    replyTo: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await sendEmailViaGateway(ctx, {
      to: args.to,
      replyTo: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
    });
  },
});


async function sendEmailViaGateway(
  ctx: Parameters<typeof action<"email", "send">>[0],
  request: {
    to: string;
    replyTo: string;
    subject: string;
    html: string;
    text: string;
  },
): Promise<{ ok: boolean; notified: boolean }> {
  // Delegate to the existing project email integration surface. If that path
  // is not reachable from this Convex deployment, the caller still has the
  // stored record and the dashboard inbox path as a fallback.
  const body = {
    to: request.to,
    replyTo: request.replyTo,
    subject: request.subject,
    html: request.html,
    text: request.text,
  };

  // Keep this mirrored with whatever project email integration is active.
  // Today that is the Freebuff email gateway used elsewhere in this project.
  const response = await fetch(
    `${process.env.VLY_INTEGRATION_BASE_URL ?? "https://integrations.vly.ai"}/v1/email/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VLY_INTEGRATION_KEY}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Email gateway returned ${response.status}: ${text.slice(0, 500)}`,
    );
  }

  return { ok: true, notified: true };
}
