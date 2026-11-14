import { api } from "./_generated/api";
import { action } from "./_generated/server";
import { v } from "convex/values";
import type { ActionCtx, Id } from "./_generated/server";

import { STUDIO } from "../lib/studio";

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

const STUDIO_EMAIL = STUDIO.contact.email;
const STUDIO_NAME = STUDIO.contact.name;
const STUDIO_BRAND = STUDIO.brand;

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

async function emailSend(ctx: ActionCtx, request: EmailRequest): Promise<void> {
  const result = await ctx.runAction(api.emailGateway.send, request);
  if (!result || !result.ok) {
    throw new Error(`Email send reported not ok: ${JSON.stringify(result)}`);
  }
}

type EmailRequest = StudioEmailRequest;

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
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="background:#0b0b0b;color:#ece6e0;font-family:Arial,sans-serif;margin:0;padding:24px">
    <div style="max-width:560px;margin:0 auto;border:1px solid #2a2a2a;border-radius:14px;padding:22px">
      <p style="color:#bcaaa4;letter-spacing:.14em;text-transform:uppercase">${escapeHtml(STUDIO_BRAND)}</p>
      <h2>New inquiry received</h2>
      <p><strong>From:</strong> ${escapeHtml(args.name)} &lt;${escapeHtml(args.email)}&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(args.subject)}</p>
      <p><strong>Message:</strong></p><p style="white-space:pre-wrap">${escapeHtml(args.message)}</p>
      <hr /><p>Reply directly to this email to reach ${escapeHtml(STUDIO_NAME)}.</p>
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
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="background:#0b0b0b;color:#ece6e0;font-family:Arial,sans-serif;margin:0;padding:24px">
    <div style="max-width:560px;margin:0 auto;border:1px solid #2a2a2a;border-radius:14px;padding:22px">
      <p style="color:#bcaaa4;letter-spacing:.14em;text-transform:uppercase">${escapeHtml(STUDIO_BRAND)}</p>
      <h2>New project brief received</h2>
      <p><strong>From:</strong> ${escapeHtml(args.name)} &lt;${escapeHtml(args.email)}&gt;</p>
      <p><strong>Business:</strong> ${escapeHtml(args.business)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(args.projectType)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(args.budget)}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(args.timeline)}</p>
      <p><strong>Message:</strong></p><p style="white-space:pre-wrap">${escapeHtml(args.message)}</p>
      <hr /><p>Brief ID ${escapeHtml(String(args.briefId))} · Reply to reach ${escapeHtml(STUDIO_NAME)}.</p>
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
