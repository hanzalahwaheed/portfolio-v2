import type { MetadataRoute } from "next"
import { getPosts } from "@/app/actions/blogs"

const siteUrl = "https://hanzalahwaheed.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const postEntries = posts.map(post => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt ?? post.createdAt,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
    },
    ...postEntries,
  ]
}
