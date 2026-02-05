import { getPost } from "@/app/actions/blogs"
import { notFound } from "next/navigation"
import { MinimalBlogContent } from "@/components/blog/minimal-blog-content"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

const siteUrl = "https://hanzalahwaheed.com"

const createExcerpt = (content: string, fallbackLength = 160) => {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return plainText.length > fallbackLength ? `${plainText.slice(0, fallbackLength - 1)}…` : plainText
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || !post.published) {
    return {}
  }

  const title = `${post.title} | Hanzalah Waheed`
  const description = post.excerpt?.trim() || createExcerpt(post.content)
  const url = new URL(`/blogs/${post.slug}`, siteUrl)
  const ogImage = new URL(`/blogs/${post.slug}/opengraph-image`, siteUrl)
  const twitterImage = new URL(`/blogs/${post.slug}/twitter-image`, siteUrl)

  return {
    title,
    description,
    alternates: {
      canonical: url.pathname,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || !post.published) {
    notFound()
  }

  const description = post.excerpt?.trim() || createExcerpt(post.content)
  const url = `${siteUrl}/blogs/${post.slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    author: {
      "@type": "Person",
      name: "Hanzalah Waheed",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Hanzalah Waheed",
      url: siteUrl,
    },
    mainEntityOfPage: url,
    url,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MinimalBlogContent post={post} />
    </>
  )
}
