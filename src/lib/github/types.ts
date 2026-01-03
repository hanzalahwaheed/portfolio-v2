/**
 * GitHub API Response Types
 */

export interface GitHubSearchIssueItem {
  repository_url: string
  html_url: string
  title: string
  pull_request?: unknown
  created_at: string
}

export interface GitHubSearchResponse {
  items: GitHubSearchIssueItem[]
  total_count: number
}

/**
 * Domain Types
 */

export interface Contribution {
  project: string
  projectUrl: string
  githubUrl: string
  description: string
  type: "Pull Request" | "Merge Request" | "Issue"
  createdAt: string
}
