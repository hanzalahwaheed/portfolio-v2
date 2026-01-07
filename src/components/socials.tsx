import Link from "next/link"
import React from "react"
import { socialLinks } from "../config"
import { instrumentSerif } from "@/app/fonts"

const Socials = () => {
  return (
    <div className="flex space-x-4">
      <Link
        href={socialLinks.github}
        className={`${instrumentSerif.className} font-bold text-white transition-all duration-300 hover:scale-110`}
      >
        Github
      </Link>
      <Link
        href={socialLinks.twitter}
        className={`${instrumentSerif.className} font-bold text-white transition-all duration-300 hover:scale-110`}
      >
        Twitter
      </Link>
      <Link
        href={socialLinks.linkedin}
        className={`${instrumentSerif.className} font-bold text-white transition-all duration-300 hover:scale-110`}
      >
        Linkedin
      </Link>
    </div>
  )
}

export default Socials
