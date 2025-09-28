"use client"

import { useEffect, useState } from "react"

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSmoothScrolling, setIsSmoothScrolling] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return

    let scroll: { destroy: () => void } | null = null
    let cleanup: (() => void) | null = null

    // Dynamically import smooth-scroll only on client side
    const initializeSmoothScroll = async () => {
      const SmoothScroll = (await import("smooth-scroll")).default

      // Initialize smooth scroll for all anchor links
      scroll = new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true,
        easing: "easeInOutCubic",
        offset: 80, // Account for fixed navbar height
      })

      // Listen for smooth scroll events
      const handleSmoothScrollStart = () => {
        setIsSmoothScrolling(true)
        setIsVisible(true) // Always show navbar during smooth scroll
      }

      const handleSmoothScrollEnd = () => {
        setIsSmoothScrolling(false)
      }

      // Add smooth scroll event listeners
      document.addEventListener("scrollStart", handleSmoothScrollStart)
      document.addEventListener("scrollStop", handleSmoothScrollEnd)

      // Handle manual scroll (only when not smooth scrolling)
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

      // Add scroll event listener
      window.addEventListener("scroll", handleScroll, { passive: true })

      // Store cleanup function
      cleanup = () => {
        if (scroll) {
          scroll.destroy()
        }
        window.removeEventListener("scroll", handleScroll)
        document.removeEventListener("scrollStart", handleSmoothScrollStart)
        document.removeEventListener("scrollStop", handleSmoothScrollEnd)
      }
    }

    initializeSmoothScroll()

    // Return cleanup function
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [lastScrollY, isSmoothScrolling])

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 min-w-xl -translate-x-1/2 transform text-lg transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="min-h-8 rounded-xl bg-white/10 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-center space-x-4 px-4 py-2">
          {/* Navigation Links */}
          <div className="flex items-center justify-center space-x-6">
            <a href="#about" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              'Bout Me
            </a>
            <a href="#writing" className="hover:text-glow font-medium text-white transition-colors duration-200">
              Builds
            </a>
            <a href="#blogs" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              Blogs
            </a>
            <a href="#bookery" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              Bookery
            </a>
            <a href="/resume.pdf" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              {/* Add some special animation here */}
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
