import { instrumentSerif } from "@/app/fonts"
import Navbar from "@/components/navbar"
import Lines from "@/components/lines"
import AboutMe from "@/components/about-me"
import { SocialIcon } from "react-social-icons"
import Socials from "@/components/socials"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
        <main className="space-y-8 text-center">
          <div
            style={{
              // use relative position for the parent div
              position: "relative",
              width: "100vw",
              height: "100vh",
              backgroundImage: "url('/images/hk_bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Remove the Image component and keep the child div */}
            <div
              style={{
                // use absolute position for the child element
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                // use higher zIndex than the image
                zIndex: 1,
                background: "transparent",
              }}
            >
              <h1 className={`${instrumentSerif.className} bg-gradient-background text-glow text-8xl text-white`}>
                Hanzalah Waheed
              </h1>
              <br />
              <h2 className={`${instrumentSerif.className} text-xl text-white`}>
                Trying to understand how things work
              </h2>
              <div className="flex items-center justify-center space-x-4">
                {" "}
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
                </button>{" "}
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
        <br />
        <h2 className="text-xl text-white">hey</h2>
        <p className="text-xl text-white">Trying to understand how things work</p>
      </div>
      <footer>
        <p>&copy; {new Date().getFullYear()} Hanzalah Waheed</p>
      </footer>
    </>
  )
}

export default Home
