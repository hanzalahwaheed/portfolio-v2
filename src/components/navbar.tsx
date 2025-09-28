"use client"

import { useEffect, useState } from "react"
import SmoothScroll from "smooth-scroll"

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSmoothScrolling, setIsSmoothScrolling] = useState(false)

  useEffect(() => {
    // Initialize smooth scroll for all anchor links
    const scroll = new SmoothScroll('a[href*="#"]', {
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
    document.addEventListener('scrollStart', handleSmoothScrollStart)
    document.addEventListener('scrollStop', handleSmoothScrollEnd)

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
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup on unmount
    return () => {
      scroll.destroy()
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('scrollStart', handleSmoothScrollStart)
      document.removeEventListener('scrollStop', handleSmoothScrollEnd)
    }
  }, [lastScrollY, isSmoothScrolling])

  return (
    <nav 
      className={`fixed top-4 left-1/2 z-50 min-w-xl -translate-x-1/2 transform text-lg transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="min-h-8 rounded-xl bg-white/10 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-center space-x-4 px-4 py-2">
          {/* Navigation Links */}
          <div className="flex items-center justify-center space-x-6">
            <a href="#about" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              About
            </a>
            <a href="#writing" className="hover:text-glow font-medium text-white transition-colors duration-200">
              Projects
            </a>
            <a href="#writing" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              Reads
            </a>
            <a href="#writing" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              Writes
            </a>
            <a href="#writing" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              {/* Add some special animation here */}
              Email
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
