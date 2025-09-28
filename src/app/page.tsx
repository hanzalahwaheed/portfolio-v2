import { instrumentSerif } from "@/app/fonts"
import Navbar from "@/components/navbar"
import Lines from "@/components/lines"
import AboutMe from "@/components/about-me"
import Socials from "@/components/socials"
import Link from "next/link"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
        <main className="space-y-8 text-center">
          <div
            className="relative h-screen w-screen bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hk_bg.png')",
            }}
          >
            <div className="absolute top-[45%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-transparent">
              <h1 className={`${instrumentSerif.className} bg-gradient-background text-glow text-8xl text-white`}>
                Hanzalah Waheed
              </h1>
              <br />
              <h2 className={`${instrumentSerif.className} text-xl text-white`}>
                Trying to understand how things work
              </h2>
              <div className="mt-8 flex items-center justify-center space-x-4">
                <Socials />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Lines />

      <div id="about" className="mb-0.25 bg-black">
        <div className="bg-gradient-background h-full w-full">
          <AboutMe />
        </div>
      </div>
      <Lines />
      <footer className="flex h-48 flex-col items-center justify-center gap-4 bg-[#061113]">
        <p>Design and Development by Hanzalah Waheed</p>
        <p>&copy; {new Date().getFullYear()}</p>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="text-white hover:underline" target="_blank">
          Do not Click
        </Link>
      </footer>
      <Lines />
    </>
  )
}

export default Home
