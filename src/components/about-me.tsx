import Image from "next/image"
import GitHubCalendar from "./github-calendar"
import { FlowingCarouselTechStack } from "./flowing-carousel-tech-stack"
import { TechStack } from "./tech-stack"
import Link from "next/link"

const AboutMe = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-16">
      {/* Content with relative z-index to appear above background */}
      <div className="relative z-10">
        <h1 className="text-glow mb-16 text-center text-4xl font-bold text-white">my story so far, tldr;</h1>

        {/* basic intro */}
        <div className="mx-auto mb-16 flex h-full w-full max-w-3xl flex-col items-center justify-center gap-8 lg:flex-row">
          <div className="flex-shrink-0">
            <Image src="/images/pfp.jpeg" alt="Hanzalah Waheed" width={250} height={250} className="rounded-3xl" />
          </div>
          <div className="flex h-full flex-1 flex-col justify-center text-center lg:text-left">
            <p className="flex-1 text-2xl leading-relaxed font-medium text-gray-300">
              I&apos;m a software engineer with a deep interest in building products that help people live better lives.
              I&apos;m currently working at{" "}
              <Link
                href="https://www.stockinsights.ai"
                className="text-[#66acb6] transition-colors hover:text-[#4fe0d0]"
                target="_blank"
                rel="noopener noreferrer"
              >
                StockInsights AI
              </Link>
              , where I build financial intelligence tools that empower investors to make better decisions.
            </p>
          </div>
        </div>
        {/* work */}
        <div className="mx-auto mt-16 w-full max-w-3xl">
          <h2 className="text-glow mb-8 text-center text-4xl text-white">my work</h2>
          <div className="grid gap-8">
            <div className="rounded-2xl bg-white/4 p-6 backdrop-blur-sm">
              <div className="flex justify-between">
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  <Link
                    href="https://www.stockinsights.ai"
                    className="text-[#66acb6] transition-colors hover:text-[#4fe0d0]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    StockInsights AI
                  </Link>
                  - Software Development Engineer
                </h3>
                <p>18 Months and Ongoing</p>
              </div>
              <p className="mb-4 text-gray-300">
                I&apos;ve been building financial intelligence tools that help investors make better decisions. Working
                on everything from data pipelines to user interfaces.
              </p>
            </div>
          </div>
          <div className="mt-4 gap-2">
            <h2 className="text-glow mb-8 text-center text-4xl text-white">my github</h2>
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
              <GitHubCalendar username="hanzalahwaheed" />
            </div>
          </div>
        </div>
        <div id="builds" className="mx-auto mt-16 w-full max-w-3xl">
          <h2 className="text-glow mb-8 text-center text-4xl text-white">my builds</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-2xl font-semibold text-white">StockInsights AI</h3>
              <p className="mb-4 text-gray-300">
                For the past 1.5 years, I&apos;ve been building financial intelligence tools that help investors make
                better decisions. Working on everything from data pipelines to user interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">React</span>
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-300">Node.js</span>
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300">Python</span>
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-300">PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>

        {/* tech stack */}
        <div className="mx-auto mt-16 w-full max-w-3xl">
          <h2 className="text-glow mb-8 text-center text-4xl text-white">Tech Stack</h2>
          <FlowingCarouselTechStack />
          {/* <TechStack /> */}
        </div>
      </div>
    </div>
  )
}

export default AboutMe
