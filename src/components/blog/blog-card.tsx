import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '@prisma/client';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-gold-dust/30 bg-cream dark:bg-rich-black/50 p-6 transition-all hover:shadow-[0_0_20px_-5px_var(--color-gold-dust)] hover:border-gold-dust/60">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-2xl font-bold tracking-tight text-rich-black dark:text-cream hover:text-deep-teal dark:hover:text-turquoise transition-colors font-instrument"
          >
            {post.title}
          </Link>
          <div className="flex items-center gap-2 text-sm text-olive-grey font-medium">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </time>
            )}
          </div>
        </div>
        {post.excerpt && (
          <p className="text-rich-black/80 dark:text-cream/80 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0 rounded-xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2"
      >
        <span className="sr-only">View post</span>
      </Link>
    </div>
  );
}
