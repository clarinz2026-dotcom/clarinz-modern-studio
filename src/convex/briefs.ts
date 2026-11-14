import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

import { sendStudioBriefEmail } from "./emailNotifications";

const MAX = {
  name: 80,
  email: 160,
  business: 120,
  message: 2000,
  choice: 60,
} as const;

function clean(value: string, limit: number) {
  return value.trim().replace(/\s+/g, " ").slice(0, limit);
}

/** All briefs that belong to the signed-in client, newest first. */
export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];

    return await ctx.db
      .query("briefs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

/** Save a new project brief for the signed-in client. */
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    business: v.string(),
    projectType: v.string(),
    budget: v.string(),
    timeline: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    const business = clean(args.business, MAX.business);
    const message = args.message.trim().slice(0, MAX.message);
    const email = clean(args.email, MAX.email);
    const name = clean(args.name, MAX.name);
    const projectType = clean(args.projectType, MAX.choice);
    const budget = clean(args.budget, MAX.choice);
    const timeline = clean(args.timeline, MAX.choice);

    if (business.length < 2) {
      throw new Error("Add the name of your business.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Add an email I can reply to.");
    }
    if (message.length < 20) {
      throw new Error("Tell me a little more about the project (20+ characters).");
    }

    let storedBriefId: Parameters<typeof ctx.db.insert<"briefs">>[0]["_id"];

    if (userId !== null) {
      const existing = await ctx.db
        .query("briefs")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .collect();

      if (existing.length >= 8) {
        throw new Error(
          "You already have 8 open briefs. Reply to the latest one by email instead.",
        );
      }

      storedBriefId = await ctx.db.insert("briefs", {
        userId,
        name,
        email,
        business,
        projectType,
        budget,
        timeline,
        message,
        status: "new",
        createdAt: Date.now(),
      });
    } else {
      storedBriefId = await ctx.db.insert("briefs", {
        userId: null as unknown as Parameters<typeof ctx.db.insert<"briefs">>[0]["userId"],
        name,
        email,
        business,
        projectType,
        budget,
        timeline,
        message,
        status: "new",
        createdAt: Date.now(),
      });
    }

    const emailSent = await sendStudioBriefEmail(ctx, {
      briefId: storedBriefId,
      name,
      email,
      business,
      projectType,
      budget,
      timeline,
      message,
    });

    return { id: storedBriefId, notified: emailSent };
  },
});

/** Remove one of the signed-in client's briefs. */
export const remove = mutation({
  args: { id: v.id("briefs") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Sign in first.");
    }

    const brief = await ctx.db.get(id);
    if (!brief || brief.userId !== userId) {
      throw new Error("That brief could not be found.");
    }

    await ctx.db.delete(id);
  },
});
