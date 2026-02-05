import { ImageResponse } from "next/og"
import { headers } from "next/headers"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 600,
}
export const contentType = "image/png"

const name = "Hanzalah Waheed"

export default async function Image() {
  let fontData: ArrayBuffer | null = null
  try {
    fontData = await fetch(
      "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf",
    ).then(res => res.arrayBuffer())
  } catch {
    fontData = null
  }

  const headersList = await headers()
  const host = headersList.get("host") ?? "hanzalahwaheed.com"
  const protocol = host.startsWith("localhost") ? "http" : "https"
  const bgUrl = `${protocol}://${host}/images/hollow_knight_bg.jpg`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b1323",
          color: "#f8fafc",
          fontFamily: fontData ? "Instrument Serif" : "serif",
        }}
      >
        <div
          style={{
            width: 1020,
            height: 440,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 110px",
            gap: 40,
            borderRadius: 36,
          }}
        >
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: 26,
              backgroundImage: `url(${bgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 12px 26px rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={`${protocol}://${host}/images/pfp.jpeg`}
              width={130}
              height={130}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              fontSize: 64,
              letterSpacing: -0.4,
              textShadow:
                "0 0 16px rgba(148,163,184,0.7), 0 0 30px rgba(148,163,184,0.5), 0 6px 22px rgba(0,0,0,0.65)",
            }}
          >
            {name}
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
