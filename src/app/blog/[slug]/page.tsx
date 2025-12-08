import { getPost } from "@/app/actions/blog"
import { notFound } from "next/navigation"
import { MinimalBlogContent } from "@/components/blog/minimal-blog-content"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || !post.published) {
    notFound()
  }

  return <MinimalBlogContent post={post} />
}
