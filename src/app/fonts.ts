import { Instrument_Serif, Inter, Space_Mono, Bricolage_Grotesque } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
})

export const inter = Inter({
  weight: ["300"],
  subsets: ["latin"],
})

export const monospace = Space_Mono({
  weight: ["400"],
  subsets: ["latin"],
})

export const bricolageGrotesque = Bricolage_Grotesque({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
})

export const geistSans = GeistSans
export const geistMono = GeistMono
