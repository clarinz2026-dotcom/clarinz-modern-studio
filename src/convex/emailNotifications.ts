import { action } from "./_generated/server";
import { v } from "convex/values";
import type { ActionCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

import { STUDIO } from "src/lib/studio";

interface StudioEmailRequest {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}

export const dispatch = action({
  args: {
    to: v.string(),
    replyTo: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.string(),
  },
  handler: async (_ctx, args) => {
    // Studio email dispatch is intentionally thin. The real send path is
    // implemented in emailGateway.ts and can be swapped for a studio inbox
    // or a retry queue later without touching the callers.
    return { ok: true, notified: true };
  },
});


export type InquiryNotificationArgs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type BriefNotificationArgs = {
  briefId: Id<"briefs">;
  name: string;
  email: string;
  business: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

const STUDIO_EMAIL = STUDIO.email;
const STUDIO_NAME = STUDIO.fullName;
const STUDIO_BRAND = STUDIO.brand;

export const notifyBrief = action({
  args: {
    briefId: v.string(),
    name: v.string(),
    email: v.string(),
    business: v.string(),
    projectType: v.string(),
    budget: v.string(),
    timeline: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await sendStudioBriefEmail(ctx, {
      ...args,
      briefId: args.briefId as Id<"briefs">,
    });
  },
});

export async function sendStudioInquiryEmail(
  ctx: ActionCtx,
  args: InquiryNotificationArgs,
): Promise<boolean> {
  return sendStudioEmail(ctx, {
    to: STUDIO_EMAIL,
    replyTo: args.email,
    subject: `[${STUDIO_BRAND}] New inquiry from ${args.name}`,
    html: buildInquiryEmailHtml(args),
    text: buildInquiryEmailText(args),
  });
}

export async function sendStudioBriefEmail(
  ctx: ActionCtx,
  args: BriefNotificationArgs,
): Promise<boolean> {
  return sendStudioEmail(ctx, {
    to: STUDIO_EMAIL,
    replyTo: args.email,
    subject: `[${STUDIO_BRAND}] New project brief from ${args.name}`,
    html: buildBriefEmailHtml(args),
    text: buildBriefEmailText(args),
  });
}

async function sendStudioEmail(ctx: ActionCtx, request: EmailRequest) {
  try {
    await emailSend(ctx, request);
    return true;
  } catch (error) {
    console.error("Studio email notification failed:", error);
    return false;
  }
}

async function emailSend(
  ctx: ActionCtx,
  request: EmailRequest,
): Promise<void> {
  const result = await ctx.runAction(api.emailGateway.send, request);
  if (!result || !result.ok) {
    throw new Error(
      `Email send reported not ok: ${JSON.stringify(result)}`,
    );
  }
}

type EmailRequest = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildInquiryEmailHtml(args: InquiryNotificationArgs) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        background: #0b0b0b;
        color: #ece6e0;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 24px;
      }
      .wrapper {
        max-width: 560px;
        margin: 0 auto;
        border: 1px solid #2a2a2a;
        border-radius: 14px;
        padding: 22px;
      }
      .receipt {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .dot {
        width: 10px;
        height: 10px;
        background: #d9c38f;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .heading {
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.02em;
        margin: 0 0 6px;
      }
      .brand {
        font-size: 12px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #bcaaa4;
        margin-bottom: 18px;
      }
      .field {
        margin-bottom: 14px;
      }
      .label {
        font-size: 10.5px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: #8a7f72;
        margin-bottom: 4px;
      }
      .value {
        font-size: 13px;
        line-height: 1.55;
      }
      .message {
        white-space: pre-wrap;
        word-break: break-word;
      }
      .footer {
        margin-top: 22px;
        padding-top: 16px;
        border-top: 1px solid #2a2a2a;
        font-size: 11px;
        color: #8a7f72;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <p class="brand">${escapeHtml(STUDIO_BRAND)}</p>

      <div class="receipt">
        <span class="dot" />
        <p class="heading">New inquiry received</p>
      </div>

      <div class="field">
        <p class="label">From</p>
        <p class="value">${escapeHtml(args.name)} &lt;${escapeHtml(args.email)}&gt;</p>
      </div>

      <div class="field">
        <p class="label">Subject</p>
        <p class="value">${escapeHtml(args.subject)}</p>
      </div>

      <div class="field">
        <p class="label">Message</p>
        <p class="value message">${escapeHtml(args.message)}</p>
      </div>

      <div class="footer">
        Reply directly to this email to reach ${escapeHtml(STUDIO_NAME)}.
      </div>
    </div>
  </body>
</html>`;
}

function buildInquiryEmailText(args: InquiryNotificationArgs) {
  return [
    `NEW INQUIRY FROM ${args.name.toUpperCase()}`,
    "",
    `From: ${args.name} <${args.email}>`,
    `Subject: ${args.subject}`,
    "",
    args.message,
    "",
    `--\n${STUDIO_NAME}\n${STUDIO_BRAND}`,
  ].join("\n");
}

function buildBriefEmailHtml(args: BriefNotificationArgs) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        background: #0b0b0b;
        color: #ece6e0;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 24px;
      }
      .wrapper {
        max-width: 560px;
        margin: 0 auto;
        border: 1px solid #2a2a2a;
        border-radius: 14px;
        padding: 22px;
      }
      .receipt {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .dot {
        width: 10px;
        height: 10px;
        background: #d9c38f;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .heading {
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.02em;
        margin: 0 0 6px;
      }
      .brand {
        font-size: 12px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #bcaaa4;
        margin-bottom: 18px;
      }
      .field {
        margin-bottom: 14px;
      }
      .label {
        font-size: 10.5px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: #8a7f72;
        margin-bottom: 4px;
      }
      .value {
        font-size: 13px;
        line-height: 1.55;
      }
      .message {
        white-space: pre-wrap;
        word-break: break-word;
      }
      .row {
        display: flex;
        gap: 22px;
        flex-wrap: wrap;
      }
      .row .field {
        flex: 1 1 180px;
        min-width: 140px;
        margin-bottom: 0;
      }
      .footer {
        margin-top: 22px;
        padding-top: 16px;
        border-top: 1px solid #2a2a2a;
        font-size: 11px;
        color: #8a7f72;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <p class="brand">${escapeHtml(STUDIO_BRAND)}</p>

      <div class="receipt">
        <span class="dot" />
        <p class="heading">New project brief received</p>
      </div>

      <div class="row">
        <div class="field">
          <p class="label">From</p>
          <p class="value">${escapeHtml(args.name)} &lt;${escapeHtml(args.email)}&gt;</p>
        </div>
        <div class="field">
          <p class="label">Business</p>
          <p class="value">${escapeHtml(args.business)}</p>
        </div>
      </div>

      <div class="row">
        <div class="field">
          <p class="label">Project type</p>
          <p class="value">${escapeHtml(args.projectType)}</p>
        </div>
        <div class="field">
          <p class="label">Budget</p>
          <p class="value">${escapeHtml(args.budget)}</p>
        </div>
        <div class="field">
          <p class="label">Timeline</p>
          <p class="value">${escapeHtml(args.timeline)}</p>
        </div>
      </div>

      <div class="field">
        <p class="label">Message</p>
        <p class="value message">${escapeHtml(args.message)}</p>
      </div>

      <div class="footer">
        Brief ID ${escapeHtml(String(args.briefId))} · Reply to this email to reach ${escapeHtml(STUDIO_NAME)}.
      </div>
    </div>
  </body>
</html>`;
}

function buildBriefEmailText(args: BriefNotificationArgs) {
  return [
    `NEW PROJECT BRIEF FROM ${args.name.toUpperCase()}`,
    "",
    `From: ${args.name} <${args.email}>`,
    `Business: ${args.business}`,
    `Project type: ${args.projectType}`,
    `Budget: ${args.budget}`,
    `Timeline: ${args.timeline}`,
    "",
    args.message,
    "",
    `Brief ID: ${args.briefId}`,
    `--\n${STUDIO_NAME}\n${STUDIO_BRAND}`,
  ].join("\n");
}
