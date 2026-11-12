import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const record = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const recent = await ctx.db
      .query("inquiries")
      .withIndex("by_email_created", (q) => q.eq("email", args.email))
      .order("desc")
      .first();

    if (recent && Date.now() - recent.createdAt < 45_000) {
      throw new Error("Please wait a moment before sending another inquiry.");
    }

    return await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
  },
});
