import Link from "next/link"
import { GitMerge, GitPullRequest, CircleDot } from "lucide-react"

// ============================================================================
// Types
// ============================================================================

interface OSSContribution {
  project: string
  projectUrl: string
  githubUrl: string
  description: string
  type: "Pull Request" | "Merge Request" | "Issue"
}

// ============================================================================
// Data
// ============================================================================

const ossContributions: OSSContribution[] = [
  {
    project: "Rafiki",
    projectUrl: "https://github.com/arc53/Rafiki",
    githubUrl: "https://github.com/arc53/Rafiki/pull/1",
    description:
      "Added support for customizing the chat UI with a dark mode toggle and a custom theme selector. Users can now switch between light and dark modes, and select from a range of pre-defined themes or create their own using the theme editor.",
    type: "Pull Request",
  },
  {
    project: "DocsGPT",
    projectUrl: "https://github.com/arc53/DocsGPT",
    githubUrl: "https://github.com/arc53/DocsGPT/pull/2110",
    description:
      "Improved modal accessibility and focus clarity. Enhanced visual hierarchy by adding a translucent blurred backdrop behind modals, improving focus and reducing UI distraction during critical actions.",
    type: "Pull Request",
  },
  {
    project: "DocsGPT",
    projectUrl: "https://github.com/arc53/DocsGPT",
    githubUrl: "https://github.com/arc53/DocsGPT/pull/2073",
    description:
      "Refactored ConversationBubble to improve performance. Removed unnecessary hover states and redundant logic, resulting in a smaller, faster, and more maintainable component structure.",
    type: "Pull Request",
  },
  {
    project: "DocsGPT",
    projectUrl: "https://github.com/arc53/DocsGPT",
    githubUrl: "https://github.com/arc53/DocsGPT/pull/2040",
    description:
      "Corrected agent title alignment issue in chat UI. Resolved a bug where an empty object evaluated truthy, causing misalignment. Now perfectly centered.",
    type: "Pull Request",
  },
  {
    project: "DocsGPT",
    projectUrl: "https://github.com/arc53/DocsGPT",
    githubUrl: "https://github.com/arc53/DocsGPT/pull/1999",
    description:
      "Chat UI polishing and UX enhancements. Prevented input border overlap, added hover states for consistency, and introduced slide animations for sidebar interactions.",
    type: "Pull Request",
  },
  {
    project: "DocsGPT",
    projectUrl: "https://github.com/arc53/DocsGPT",
    githubUrl: "https://github.com/arc53/DocsGPT/pull/1920",
    description:
      "Restored response bubble feedback button visibility. Buttons now remain visible at all times instead of only on hover, improving discoverability and usability.",
    type: "Pull Request",
  },
]

// ============================================================================
// Sub-components
// ============================================================================

const OSSTimelineItem = ({ contribution, isLast }: { contribution: OSSContribution; isLast: boolean }) => {
  const getIcon = (type: OSSContribution["type"]) => {
    switch (type) {
      case "Merge Request":
        return <GitMerge size={16} className="text-purple-400" />
      case "Issue":
        return <CircleDot size={16} className="text-green-400" />
      default:
        return <GitPullRequest size={16} className="text-purple-400" />
    }
  }

  return (
    <div className="group relative flex gap-6 pb-8 last:pb-0">
      {/* Timeline Line */}
      {!isLast && <div className="absolute top-8 left-[19px] h-full w-px bg-white/10 group-hover:bg-white/20" />}

      {/* Icon Node */}
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#111] shadow-sm transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(102,172,182,0.3)]">
        {getIcon(contribution.type)}
      </div>

      {/* Content */}
      <div className="flex flex-col pt-1">
        <div className="flex items-center gap-3">
          <Link
            href={contribution.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-white transition-colors hover:text-[#66acb6]"
          >
            {contribution.project}
          </Link>
          <Link
            href={contribution.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 transition-colors hover:text-gray-300 hover:underline"
          >
            {contribution.type}
          </Link>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">
          {contribution.description}
        </p>
      </div>
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export const OssContributions = () => {
  return (
    <div className="custom-scrollbar max-h-[500px] overflow-y-auto pt-2 pr-4 pl-2">
      {ossContributions.map((contribution, index) => (
        <OSSTimelineItem
          key={contribution.project}
          contribution={contribution}
          isLast={index === ossContributions.length - 1}
        />
      ))}
    </div>
  )
}

export default OssContributions
