import { getAllPostsAdmin, deletePost } from '@/app/actions/blog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default async function AdminPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div className="container max-w-5xl py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-deep-teal dark:text-cream font-instrument">Dashboard</h1>
        <Button asChild className="bg-deep-teal hover:bg-deep-teal/90 text-cream">
          <Link href="/admin/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-gold-dust/30 overflow-hidden bg-cream/50 dark:bg-rich-black/50 shadow-sm">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 border-b border-gold-dust/20 bg-gold-dust/10 font-instrument font-medium text-deep-teal dark:text-gold-dust">
          <div>Title</div>
          <div>Status</div>
          <div>Date</div>
          <div>Actions</div>
        </div>
        {posts.length === 0 ? (
          <div className="p-12 text-center text-olive-grey italic">
            No posts yet. Create one!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 p-4 border-b border-gold-dust/10 last:border-0 hover:bg-gold-dust/5 transition-colors"
            >
              <div className="font-medium text-rich-black dark:text-cream">{post.title}</div>
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${post.published
                    ? 'bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20 dark:text-turquoise'
                    : 'bg-olive-grey/10 text-olive-grey dark:bg-olive-grey/20 dark:text-gold-dust'
                    }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="text-sm text-olive-grey">
                {format(new Date(post.createdAt), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild className="text-deep-teal hover:text-deep-teal hover:bg-deep-teal/10">
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
  );
}
