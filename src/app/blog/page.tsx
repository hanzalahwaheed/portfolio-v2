import { getPosts } from '@/app/actions/blog';
import { BlogCard } from '@/components/blog/blog-card';
import Image from 'next/image';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <Image
          src="/images/temp.avif"
          alt="Background"
          fill
          className="object-cover opacity-20 dark:opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/80 to-cream/90 dark:from-rich-black/90 dark:via-rich-black/80 dark:to-rich-black/90" />
      </div>

      <div className="container max-w-4xl py-12 md:py-24 relative z-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-deep-teal dark:text-cream font-instrument">
              Blog
            </h1>
            <p className="text-xl text-olive-grey dark:text-gold-dust">
              Thoughts, ideas, and tutorials.
            </p>
            <div className="h-1 w-20 bg-gold-dust rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className="grid gap-8">
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-12 italic">
                No posts found.
              </p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="group relative">
                  <div className="absolute -inset-4 rounded-xl bg-gold-dust/0 transition-all duration-300 group-hover:bg-gold-dust/10 dark:group-hover:bg-gold-dust/5" />
                  <BlogCard post={post} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
