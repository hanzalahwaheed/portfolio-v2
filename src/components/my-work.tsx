import Link from "next/link"
import GitHubCalendar from "./github-calendar"

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

interface OSSContribution {
  project: string
  projectUrl: string
  description: string
  type: "contribution" | "maintainer" | "creator"
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

const ossContributions: OSSContribution[] = [
  {
    project: "Example Project",
    projectUrl: "https://github.com/example/project",
    description: "Add your OSS contributions here",
    type: "contribution",
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

const ContributionTypeBadge = ({ type }: { type: OSSContribution["type"] }) => {
  const styles = {
    contribution: "bg-blue-500/20 text-blue-300",
    maintainer: "bg-purple-500/20 text-purple-300",
    creator: "bg-green-500/20 text-green-300",
  }

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}

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

const OSSCard = ({ contribution }: { contribution: OSSContribution }) => (
  <div className="rounded-2xl bg-white/4 p-6 backdrop-blur-sm">
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-xl font-semibold text-white">
        <Link
          href={contribution.projectUrl}
          className="text-[#66acb6] transition-colors hover:text-[#4fe0d0]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {contribution.project}
        </Link>
      </h3>
      <ContributionTypeBadge type={contribution.type} />
    </div>
    <p className="mt-2 text-gray-300">{contribution.description}</p>
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
        <div className="grid gap-6">
          {ossContributions.map((contribution) => (
            <OSSCard key={contribution.project} contribution={contribution} />
          ))}
        </div>
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
