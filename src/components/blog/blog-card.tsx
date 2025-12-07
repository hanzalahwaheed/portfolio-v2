import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '@prisma/client';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group relative flex flex-col gap-2 rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-2xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </time>
            )}
          </div>
        </div>
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0 rounded-xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="sr-only">View post</span>
      </Link>
    </div>
  );
}
