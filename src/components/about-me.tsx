import Image from "next/image"
import { FlowingCarouselTechStack } from "./flowing-carousel-tech-stack"
import { MyBuilds } from "./my-builds"
import { MyWork } from "./my-work"
import Link from "next/link"
import { TechStack } from "./tech-stack"

const AboutMe = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-x-hidden px-4 py-16">
      {/* Content with relative z-index to appear above background */}
      <div className="relative z-10 w-full">
        <h1 className="text-glow mb-16 text-center text-3xl font-bold text-white md:text-4xl">
          my story so far, tldr;
        </h1>

        {/* basic intro */}
        <div className="mx-auto mb-16 flex h-full w-full max-w-3xl flex-col items-center justify-center gap-8 lg:flex-row">
          <div className="flex-shrink-0">
            <Image src="/images/pfp.jpeg" alt="Hanzalah Waheed" width={250} height={250} className="rounded-3xl" />
          </div>
          <div className="flex h-full flex-1 flex-col justify-center text-center lg:text-left">
            <p className="flex-1 text-lg leading-relaxed font-medium text-gray-300 md:text-2xl">
              sup? I enjoy turning vague ideas and messy data into clean and scalable software.
              <br />
              I&apos;m currently building AI-powered financial tools at{" "}
              <Link
                href="https://www.stockinsights.ai"
                className="text-[#66acb6] transition-colors hover:text-[#4fe0d0]"
                target="_blank"
                rel="noopener noreferrer"
              >
                StockInsights AI
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Work, OSS, and GitHub */}
        <MyWork />

        <MyBuilds />

        {/* tech stack */}
        <div className="mx-auto mt-16 w-full max-w-3xl">
          <h2 className="text-glow mb-8 text-center text-3xl text-white md:text-4xl">Tech Stack</h2>
          <FlowingCarouselTechStack />
          {/* <TechStack /> */}
        </div>
      </div>
    </div>
  )
}

export default AboutMe
