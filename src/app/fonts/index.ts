import { Instrument_Serif } from "next/font/google"
import localFont from "next/font/local"

export const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
})

export const googleSans = localFont({
  src: [
    {
      path: "./Google_Sans/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "./Google_Sans/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
})
