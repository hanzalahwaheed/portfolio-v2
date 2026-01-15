import { instrumentSerif } from "@/app/fonts"
import Navbar from "@/components/navbar"
import Lines from "@/components/lines"
import AboutMe from "@/components/about-me"
import Socials from "@/components/socials"
import MoreBelow from "@/components/more-below"
import dynamic from "next/dynamic"
import Link from "next/link"

const Blogs = dynamic(() => import("@/components/blogs"), { loading: () => null })
const Bookery = dynamic(() => import("@/components/bookery"), { loading: () => null })
const Grind = dynamic(() => import("@/components/grind"), { loading: () => null })

const currentYear = new Date().getFullYear()

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
        <main className="space-y-8 text-center">
          <div
            className="relative h-screen w-screen bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hollow_knight_bg.jpg')",
            }}
          >
            <div className="absolute top-[45%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-transparent">
              <h1
                className={`${instrumentSerif.className} bg-gradient-background text-glow text-5xl text-white md:text-7xl lg:text-8xl`}
              >
                Hanzalah Waheed
              </h1>
              <br />
              <h2 className={`${instrumentSerif.className} text-lg text-white md:text-xl`}>
                Trying to understand how things work
              </h2>
              <div className="mt-8 flex items-center justify-center space-x-4">
                <Socials />
              </div>
            </div>
            <MoreBelow />
          </div>
        </main>
      </div>
      <Lines reverse={true} />

      <div id="about-me" className="mb-0.25">
        <div className="bg-gradient-background h-full w-full">
          <AboutMe />
        </div>
      </div>
      <Lines />

      <div id="blogs">
        <Blogs />
      </div>
      <Lines />

      <div id="bookery">
        <Bookery />
      </div>
      <Lines />

      <Grind />
      <Lines />

      <footer
        className={`flex h-48 flex-col items-center justify-center gap-4 bg-[#061113] ${instrumentSerif.className}`}
      >
        <p>Design and Development by Hanzalah Waheed</p>
        <p>&copy; {currentYear}</p>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="text-white hover:underline" target="_blank">
          Do not Click
        </Link>
      </footer>
      <Lines />
    </>
  )
}

export default Home
