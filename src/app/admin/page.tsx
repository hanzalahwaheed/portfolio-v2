import { getAllPostsAdmin, deletePost } from "@/app/actions/blog"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import Link from "next/link"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function AdminPage() {
  const posts = await getAllPostsAdmin()

  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-deep-teal dark:text-cream font-instrument text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild className="bg-deep-teal hover:bg-deep-teal/90 text-cream">
          <Link href="/admin/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="border-gold-dust/30 bg-cream/50 dark:bg-rich-black/50 overflow-hidden rounded-lg border shadow-sm">
        <div className="border-gold-dust/20 bg-gold-dust/10 font-instrument text-deep-teal dark:text-gold-dust grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b p-4 font-medium">
          <div>Title</div>
          <div>Status</div>
          <div>Date</div>
          <div>Actions</div>
        </div>
        {posts.length === 0 ? (
          <div className="text-olive-grey p-12 text-center italic">No posts yet. Create one!</div>
        ) : (
          posts.map(post => (
            <div
              key={post.id}
              className="border-gold-dust/10 hover:bg-gold-dust/5 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b p-4 transition-colors last:border-0"
            >
              <div className="text-rich-black dark:text-cream font-medium">{post.title}</div>
              <div>
                <span
                  className={`focus:ring-ring inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                    post.published
                      ? "bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20 dark:text-turquoise"
                      : "bg-olive-grey/10 text-olive-grey dark:bg-olive-grey/20 dark:text-gold-dust"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="text-olive-grey text-sm">{format(new Date(post.createdAt), "MMM d, yyyy")}</div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-deep-teal hover:text-deep-teal hover:bg-deep-teal/10"
                >
                  <Link href={`/admin/edit/${post.id}`}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <form action={deletePost.bind(null, post.id)}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
