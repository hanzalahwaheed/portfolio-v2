import React from "react"
import { SocialIcon } from "react-social-icons"

const socials = () => {
  return (
    <div className="flex space-x-3">
      <SocialIcon
        url="https://github.com/hanzalahwaheed"
        style={{ height: 32, width: 32 }}
        bgColor="transparent"
        fgColor="white"
      />
      <SocialIcon
        url="https://linkedin.com/in/hanzalahwaheed"
        style={{ height: 32, width: 32 }}
        bgColor="transparent"
        fgColor="white"
      />
      <SocialIcon
        url="https://twitter.com/hanzalahwaheed"
        style={{ height: 32, width: 32 }}
        bgColor="transparent"
        fgColor="white"
      />
    </div>
  )
}

export default socials
