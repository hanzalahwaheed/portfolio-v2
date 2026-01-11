import type { Metadata } from "next"
import { inter } from "./fonts"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "hanzlahwaheed",
  description: "Hanzlah Waheed Portfolio",
  metadataBase: new URL("https://hanzalahwaheed.com"),
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-serif antialiased ${inter.className}`}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
