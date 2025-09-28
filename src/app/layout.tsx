import type { Metadata } from "next"
import { instrumentSerif } from "./fonts"
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
      <body className={`antialiased ${instrumentSerif.className}`}>{children}</body>
    </html>
  )
}
