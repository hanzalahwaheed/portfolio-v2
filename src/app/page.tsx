import { instrumentSerif } from "@/app/fonts"
import Navbar from "@/components/navbar"

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
              backgroundImage: "url('/images/hk_bg_1.png')",
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
            </div>
          </div>
        </main>
      </div>

      <div className="mb-0.25 h-2 w-full bg-[#061113]" />
      <div className="mb-0.25 h-2 w-full bg-[#0D1B21]" />
      <div className="mb-0.25 h-2 w-full bg-[#0E2128]" />
      <div className="mb-0.25 h-2 w-full bg-[#16282F]" />
      <div className="mb-0.25 h-2 w-full bg-[#1E383C]" />
      <div className="mb-0.25 h-2 w-full bg-[#1E383C]" />
      <div className="mb-0.25 bg-black">
        <div className="bg-gradient-background h-full w-full">
          <h1 className="text-glow text-8xl text-white">More about me:</h1>
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
