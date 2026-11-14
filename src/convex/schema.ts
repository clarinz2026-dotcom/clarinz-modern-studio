import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    ...authTables,
    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
    }).index("email", ["email"]),
    briefs: defineTable({
      userId: v.optional(v.id("users")),
      name: v.string(),
      email: v.string(),
      business: v.string(),
      projectType: v.string(),
      budget: v.string(),
      timeline: v.string(),
      message: v.string(),
      status: v.union(
        v.literal("new"),
        v.literal("reviewing"),
        v.literal("scheduled"),
      ),
      createdAt: v.number(),
    }).index("by_user", ["userId"]),
    inquiries: defineTable({
      name: v.string(),
      email: v.string(),
      subject: v.string(),
      message: v.string(),
      status: v.union(v.literal("new"), v.literal("read")),
      createdAt: v.number(),
    })
      .index("by_email_created", ["email", "createdAt"])
      .index("by_created", ["createdAt"]),
  },
  { schemaValidation: false },
);

export default schema;
