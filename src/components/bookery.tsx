import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
})

const Bookery = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-4 py-16">
      <h2 className={`${instrumentSerif.className} text-glow mb-16 text-center text-6xl text-white`}>
        Bookery
      </h2>
      <div className="text-center text-gray-400">
        <p className="text-xl">Coming Soon...</p>
      </div>
    </div>
  )
}

export default Bookery
