import { getAllPostsAdmin, deletePost } from "@/app/actions/blog"
import { format } from "date-fns"
import Link from "next/link"
import { Plus, Pencil, Trash2, FileText } from "lucide-react"

export default async function AdminPage() {
  const posts = await getAllPostsAdmin()

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-instrument selection:bg-neutral-800 selection:text-white">

      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur-md border-b border-neutral-900 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FileText size={16} className="text-neutral-500" />
          <span className="text-sm font-medium text-white font-instrument">Dashboard</span>
          <span className="text-neutral-800 text-sm">/</span>
          <span className="text-xs text-neutral-500 font-mono uppercase tracking-widest">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>

        <Link
          href="/admin/new"
          className="inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors bg-white text-black hover:bg-neutral-200 h-9 px-4 py-2"
        >
          <Plus size={14} className="mr-2" />
          New Post
        </Link>
      </nav>

      <main className="pt-14">
        <div className="max-w-4xl mx-auto p-8 md:p-12">

          {/* Section Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-instrument text-white mb-2">All Posts</h1>
            <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
              Manage your blog content
            </p>
          </div>

          {/* Posts Table */}
          <div className="border border-neutral-900 rounded-sm overflow-hidden">
            {/* Table Header */}
            <div className="bg-neutral-900/50 border-b border-neutral-900 grid grid-cols-[1fr_auto_auto_auto] gap-6 p-4">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">Title</div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">Status</div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">Date</div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">Actions</div>
            </div>

            {posts.length === 0 ? (
              <div className="p-16 text-center">
                <FileText size={32} className="mx-auto mb-4 text-neutral-700" />
                <p className="text-neutral-600 italic font-instrument">No posts yet. Create your first one!</p>
              </div>
            ) : (
              posts.map(post => (
                <div
                  key={post.id}
                  className="border-b border-neutral-900 hover:bg-neutral-900/30 grid grid-cols-[1fr_auto_auto_auto] items-center gap-6 p-4 transition-colors last:border-0"
                >
                  <div className="text-white font-medium font-instrument">{post.title}</div>
                  <div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${post.published
                          ? "border-neutral-600 text-neutral-300"
                          : "border-neutral-800 text-neutral-600"
                        }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="text-neutral-500 text-sm font-mono">
                    {format(new Date(post.createdAt), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/edit/${post.id}`}
                      className="p-2 rounded-sm text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                      <Pencil size={14} />
                      <span className="sr-only">Edit</span>
                    </Link>
                    <form action={deletePost.bind(null, post.id)}>
                      <button
                        type="submit"
                        className="p-2 rounded-sm text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                      >
                        <Trash2 size={14} />
                        <span className="sr-only">Delete</span>
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
