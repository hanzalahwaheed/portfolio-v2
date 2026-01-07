import type { Metadata } from "next"
import { inter } from "./fonts"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "hanzlahwaheed",
  description: "Hanzlah Waheed Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-serif ${inter.className}`}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
