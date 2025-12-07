import { getPosts } from '@/app/actions/blog';
import { BlogCard } from '@/components/blog/blog-card';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, ideas, and tutorials.
          </p>
        </div>
        <div className="grid gap-6">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts found.</p>
          ) : (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}
