const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 z-50 w-fit max-w-4xl -translate-x-1/2 transform text-sm">
      <div className="min-h-8 rounded-lg border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
        <div className="flex items-center space-x-4 px-4 py-2">
          {/* Navigation Links */}
          <div className="flex items-start space-x-6">
            <a href="#about" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              About
            </a>
            <a href="#writing" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              Writing
            </a>
            <a href="#careers" className="font-medium text-white transition-colors duration-200 hover:text-blue-200">
              Careers
            </a>
          </div>

          {/* CTA Button */}
          <button
            className="ml-2 flex cursor-pointer items-center rounded-md bg-white px-2 py-1 font-medium text-black transition-colors duration-200"
            // Gradient Style
            // style={{
            //   background:
            //     "linear-gradient(to right, #061113, #0D1B21, #0E2128, #16282F, #1E383C)",
            // }}
          >
            <span>Resume</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
