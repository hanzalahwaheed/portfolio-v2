import Link from "next/link"
import { Github } from "lucide-react"

interface Build {
  name: string
  description: string
  url: string
  techStack: string[]
  githubUrl?: string
}

const builds: Build[] = [
  {
    name: "A/B Image Generator",
    description:
      "An application that helps you club together multiple images and then generate an A/B image for you, that you can post anywhere to A/B test your ideas. This project was launched on Peerlist and managed to reach top 30 on the leaderboard, is fully opensourced and has 25+ stars on GitHub!",
    url: "https://ab-img-gen.vercel.app/",
    techStack: ["Nextjs", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/hanzalahwaheed/ab-image-generator",
  },
  {
    name: "Product Owl",
    description:
      "A web app that helps you track your favourite Amazon products at notifies you when they are at their cheapest! Implemented with the help of Web Scraping!",
    url: "https://product-owl.vercel.app/",
    techStack: ["Nextjs", "Tailwind CSS", "TypeScript", "PostgreSQL", "Web Scraping"],
    githubUrl: "https://github.com/hanzalahwaheed/product-owl",
  },
  {
    name: "Imagine Text",
    description:
      "An image to text extractor using tesseractJS. Extremely slow by current standards. Would not recommend for production use anymore :/",
    url: "https://imagine-text.vercel.app/",
    techStack: ["NextJS", "Tailwind CSS", "TypeScript", "TesseractJS", "Cloudinary"],
    githubUrl: "https://github.com/hanzalahwaheed/imagine-text",
  },
  {
    name: "News Nation",
    description:
      "News Nation is a Platform that shows you India's top headlines and keeps you up to date with the Current Affairs. PS. This was one of my first projects that I built back in 2020!",
    url: "https://news-nation-eta.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/hanzalahwaheed/news-nation",
  },
]

export const MyBuilds = () => {
  return (
    <div id="builds" className="mx-auto mt-16 w-full max-w-3xl">
      <h2 className="text-glow mb-8 text-center text-4xl text-white">my builds</h2>
      <ul className="custom-scrollbar max-h-[500px] space-y-6 overflow-y-auto pr-2">
        {builds.map((build, index) => (
          <li key={index} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">
                  <Link
                    href={build.url}
                    className="text-[#66acb6] transition-colors hover:text-[#4fe0d0]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {build.name}
                  </Link>
                </h3>
                {build.githubUrl && (
                  <Link
                    href={build.githubUrl}
                    className="text-gray-400 transition-colors hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${build.name} on GitHub`}
                  >
                    <Github size={20} />
                  </Link>
                )}
              </div>
              <p className="text-gray-300">{build.description}</p>
              {build.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {build.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
