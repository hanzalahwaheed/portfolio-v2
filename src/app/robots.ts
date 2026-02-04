import type { MetadataRoute } from "next"

const siteUrl = "https://hanzalahwaheed.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
