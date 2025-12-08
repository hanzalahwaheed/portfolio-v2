import { getPosts } from "@/app/actions/blog"
import { BlogCard } from "@/components/blog/blog-card"
import Image from "next/image"

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[-1]">
        <Image
          src="/images/image copy 3.png"
          alt="Background"
          fill
          className="object-cover opacity-20 dark:opacity-90"
          priority
        />
        <div className="from-cream/90 via-cream/80 to-cream/90 dark:from-rich-black/90 dark:via-rich-black/80 dark:to-rich-black/90 absolute inset-0 bg-gradient-to-b" />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl py-4 md:py-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl font-bold lg:text-5xl">Blogs</h1>
            <p className="text-xl">Thoughts, ideas, and tutorials.</p>
            <div className="bg-gold-dust mx-auto h-1 w-20 rounded-full md:mx-0"></div>
          </div>

          <div className="grid gap-8">
            {posts.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center italic">No posts found.</p>
            ) : (
              posts.map(post => (
                <div key={post.id} className="group relative">
                  <div className="" />
                  <BlogCard post={post} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
