import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core"

// Note: Prisma typically creates tables with the exact model name (case-sensitive)
// If your table is lowercase 'post', change 'Post' to 'post' below
export const posts = pgTable("Post", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("coverImage"),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
