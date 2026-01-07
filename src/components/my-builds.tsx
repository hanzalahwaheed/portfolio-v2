import Link from "next/link"
import { Github } from "lucide-react"

import { builds } from "../config"
import { instrumentSerif } from "@/app/fonts"

export const MyBuilds = () => {
  return (
    <div id="builds" className="mx-auto mt-16 w-full max-w-3xl">
      <h2 className={`${instrumentSerif.className} text-glow mb-8 text-center text-3xl text-white md:text-4xl`}>
        my builds
      </h2>
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
