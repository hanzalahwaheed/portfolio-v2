import Link from "next/link"
import GitHubCalendar from "./github-calendar"
import OssContributions from "./oss-contributions"

// ============================================================================
// Types
// ============================================================================

interface WorkExperience {
  company: string
  companyUrl: string
  role: string
  duration: string
  description: string
  techStack: string[]
}



// ============================================================================
// Data
// ============================================================================

const workExperiences: WorkExperience[] = [
  {
    company: "StockInsights AI",
    companyUrl: "https://www.stockinsights.ai",
    role: "Software Development Engineer",
    duration: "18 Months and Ongoing",
    description:
      "I've been building financial intelligence tools that help investors make better decisions. Working on everything from data pipelines to user interfaces.",
    techStack: ["Python", "TypeScript", "Next.js", "PostgreSQL", "AWS", "Docker"],
  },
]



// ============================================================================
// Sub-components
// ============================================================================

const TechBadge = ({ tech }: { tech: string }) => (
  <span className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/15 hover:text-white">
    {tech}
  </span>
)


import { GitCommit, GitMerge, GitPullRequest, CircleDot } from "lucide-react"

const WorkCard = ({ experience }: { experience: WorkExperience }) => (
  <div className="rounded-2xl bg-white/4 p-6 backdrop-blur-sm">
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
      <h3 className="text-2xl font-semibold text-white">
        <Link
          href={experience.companyUrl}
          className="text-[#66acb6] transition-colors hover:text-[#4fe0d0]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {experience.company}
        </Link>
        <span className="text-white"> - {experience.role}</span>
      </h3>
      <p className="whitespace-nowrap text-sm text-gray-400">{experience.duration}</p>
    </div>
    <p className="mb-4 mt-3 text-gray-300">{experience.description}</p>
    <div className="flex flex-wrap gap-2">
      {experience.techStack.map((tech) => (
        <TechBadge key={tech} tech={tech} />
      ))}
    </div>
  </div>
)



// ============================================================================
// Main Component
// ============================================================================

export const MyWork = () => {
  return (
    <div className="mx-auto mt-16 w-full max-w-3xl">
      {/* Work Experience */}
      <h2 className="text-glow mb-8 text-center text-4xl text-white">my work</h2>
      <div className="grid gap-6">
        {workExperiences.map((experience) => (
          <WorkCard key={experience.company} experience={experience} />
        ))}
      </div>

      {/* OSS Contributions */}
      <div className="mt-12">
        <h2 className="text-glow mb-8 text-center text-4xl text-white">open source</h2>
        <OssContributions />
      </div>

      {/* GitHub Calendar */}
      <div className="mt-12">
        <h2 className="text-glow mb-8 text-center text-4xl text-white">my github</h2>
        <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
          <GitHubCalendar username="hanzalahwaheed" />
        </div>
      </div>
    </div>
  )
}

export default MyWork
