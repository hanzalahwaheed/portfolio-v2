import { ImageResponse } from "next/og"
import { headers } from "next/headers"
import { getPost } from "@/app/actions/blogs"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 600,
}
export const contentType = "image/png"

export default async function Image({ params }: { params: { slug: string } }) {
  let fontData: ArrayBuffer | null = null
  try {
    fontData = await fetch(
      "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf",
    ).then(res => res.arrayBuffer())
  } catch {
    fontData = null
  }

  const post = await getPost(params.slug)
  const title = post?.title || "Blog Post"
  const coverImage = post?.coverImage || null

  const headersList = await headers()
  const host = headersList.get("host") ?? "hanzalahwaheed.com"
  const protocol = host.startsWith("localhost") ? "http" : "https"
  const fallbackImage = `${protocol}://${host}/images/pfp.jpeg`
  const imageUrl = coverImage
    ? coverImage.startsWith("http")
      ? coverImage
      : `${protocol}://${host}${coverImage.startsWith("/") ? coverImage : `/${coverImage}`}`
    : fallbackImage

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          backgroundColor: "#141414",
          color: "#f8fafc",
          fontFamily: fontData ? "Instrument Serif" : "serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 430,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            width: "100%",
            height: 170,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 70px",
            backgroundColor: "#141414",
          }}
        >
          <div
            style={{
              fontSize: 52,
              lineHeight: 1.1,
              letterSpacing: -0.3,
              textAlign: "center",
              textShadow:
                "0 0 14px rgba(148,163,184,0.7), 0 0 26px rgba(148,163,184,0.45), 0 8px 22px rgba(0,0,0,0.6)",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      fonts: fontData
        ? [
            {
              name: "Instrument Serif",
              data: fontData,
              style: "normal",
            },
          ]
        : [],
    },
  )
}
