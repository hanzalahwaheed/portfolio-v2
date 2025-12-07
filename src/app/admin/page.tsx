import { getAllPostsAdmin, deletePost } from '@/app/actions/blog';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  const posts = await getAllPostsAdmin();

  return (
    <div className="container max-w-5xl py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/admin/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="rounded-md border border-border">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 border-b border-border bg-muted/50 font-medium">
          <div>Title</div>
          <div>Status</div>
          <div>Date</div>
          <div>Actions</div>
        </div>
        {posts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No posts yet. Create one!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
            >
              <div className="font-medium">{post.title}</div>
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${post.published
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                    }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(post.createdAt), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
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
