"use client"

import { useEffect, useState } from "react"
import { Link, Events, scrollSpy } from "react-scroll"
import NextLink from "next/link"

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSmoothScrolling, setIsSmoothScrolling] = useState(false)

  useEffect(() => {
    // Register scroll events
    Events.scrollEvent.register("begin", () => {
      setIsSmoothScrolling(true)
      setIsVisible(true)
    })

    Events.scrollEvent.register("end", () => {
      setIsSmoothScrolling(false)
    })

    scrollSpy.update()

    // Handle manual scroll
    const handleScroll = () => {
      if (isSmoothScrolling) return

      const currentScrollY = window.scrollY

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      }
      // Hide navbar when scrolling down (but not at the very top)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      Events.scrollEvent.remove("begin")
      Events.scrollEvent.remove("end")
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY, isSmoothScrolling])

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 w-[95%] -translate-x-1/2 transform text-sm transition-all duration-300 ease-in-out md:w-auto md:min-w-xl md:text-lg ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="min-h-8 rounded-xl bg-white/10 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-center space-x-4 px-4 py-2">
          {/* Navigation Links */}
          <div className="flex items-center justify-center space-x-3 md:space-x-6">
            <Link
              to="about-me"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer font-medium text-white transition-colors duration-200 hover:text-blue-200"
            >
              {/* &apos;Bout Me */}
              Me
            </Link>
            <Link
              to="builds"
              smooth={true}
              duration={500}
              offset={-80}
              className="hover:text-glow cursor-pointer font-medium text-white transition-colors duration-200"
            >
              Builds
            </Link>
            <NextLink
              href="/blogs"
              target="_blank"
              className="cursor-pointer font-medium text-white transition-colors duration-200 hover:text-blue-200"
            >
              Blogs
            </NextLink>
            <Link
              to="bookery"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer font-medium text-white transition-colors duration-200 hover:text-blue-200"
            >
              Bookery
            </Link>
            <NextLink
              href="/resume"
              className="rounded-md bg-white px-2 font-medium text-black transition-colors duration-200"
            >
              Resume
            </NextLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
