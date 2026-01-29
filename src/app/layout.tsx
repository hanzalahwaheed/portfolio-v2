import type { Metadata } from "next"
import "./globals.css"
import { googleSans } from "@/app/fonts"

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
      <body className={`font-serif antialiased ${googleSans.variable}`}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
