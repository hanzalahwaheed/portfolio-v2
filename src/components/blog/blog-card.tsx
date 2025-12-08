import Link from "next/link"
import { format } from "date-fns"
import { Post } from "@/db"

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group bg-cream dark:bg-rich-black/50 relative flex flex-col gap-3 rounded-xl p-6 transition-all hover:shadow-[0_0_20px_-5px_var(--color-gold-dust)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-rich-black dark:text-cream hover:text-deep-teal dark:hover:text-turquoise font-instrument text-2xl font-bold tracking-tight transition-colors"
          >
            {post.title}
          </Link>
          <div className="text-olive-grey flex items-center gap-2 text-sm font-medium">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>{format(new Date(post.publishedAt), "MMM d, yyyy")}</time>
            )}
          </div>
        </div>
        {post.excerpt && (
          <p className="text-rich-black/80 dark:text-cream/80 line-clamp-3 leading-relaxed">{post.excerpt}</p>
        )}
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="ring-offset-background focus-visible:ring-deep-teal absolute inset-0 rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <span className="sr-only">View post</span>
      </Link>
    </div>
  )
}
