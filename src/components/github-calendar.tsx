"use client"

import GitHubCalendar from "react-github-calendar"

interface GitHubCalendarProps {
  username: string
  className?: string
}

const GitHubCalendarComponent = ({ username, className = "" }: GitHubCalendarProps) => {
  return (
    <div className={`${className}`}>
      <div className="github-calendar-wrapper custom-scrollbar overflow-x-auto pb-2">
        <GitHubCalendar
          username={username}
          year={new Date().getFullYear()}
          colorScheme="dark"
          style={{
            background: "transparent",
            color: "#ffffff",
          }}
          blockSize={10}
          blockMargin={3}
          fontSize={14}
          showWeekdayLabels={false}
          hideTotalCount={false}
          hideColorLegend={false}
        />
      </div>

      <style jsx>{`
        .github-calendar-wrapper :global(.react-activity-calendar) {
          background: transparent !important;
        }

        .github-calendar-wrapper :global(.react-activity-calendar svg) {
          background: transparent !important;
        }

        .github-calendar-wrapper :global(.react-activity-calendar .react-calendar-heatmap) {
          background: transparent !important;
        }

        .github-calendar-wrapper :global(.react-activity-calendar .react-calendar-heatmap text) {
          fill: #9ca3af !important;
        }

        .github-calendar-wrapper :global(.react-activity-calendar .react-calendar-heatmap .color-empty) {
          fill: #374151 !important;
        }

        .github-calendar-wrapper :global(.react-activity-calendar .react-calendar-heatmap .color-scale-1) {
          fill: #166534 !important;
        }

        .github-calendar-wrapper :global(.react-activity-calendar .react-calendar-heatmap .color-scale-2) {
          fill: #16a34a !important;
        }

        .github-calendar-wrapper :global(.react-activity-calendar .react-calendar-heatmap .color-scale-3) {
          fill: #22c55e !important;
        }

        .github-calendar-wrapper :global(.react-activity-calendar .react-calendar-heatmap .color-scale-4) {
          fill: #4ade80 !important;
        }
      `}</style>
    </div>
  )
}

export default GitHubCalendarComponent
