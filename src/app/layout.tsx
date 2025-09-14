import type { Metadata } from "next"
import { inter } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "hanzlahwaheed",
  description: "hanzlah waheed portfolio - hollow knight theme",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>{children}</body>
    </html>
  )
}
