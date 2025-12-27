import { updatePost } from "@/app/actions/blogs"
import { Editor } from "@/components/blog/editor"
import { notFound } from "next/navigation"
import { db, posts } from "@/db"
import { eq } from "drizzle-orm"

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1)

  const post = result[0] || null

  if (!post) {
    notFound()
  }

  return <Editor post={post} action={updatePost.bind(null, id)} />
}
