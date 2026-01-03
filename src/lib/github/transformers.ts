import { GitHubSearchIssueItem, Contribution } from "./types"

/**
 * Transform GitHub search issue item to Contribution domain type
 */
export function transformToContribution(item: GitHubSearchIssueItem): Contribution {
  const repoFullName = item.repository_url.replace("https://api.github.com/repos/", "")
  const project = repoFullName.split("/")[1]
  const projectUrl = `https://github.com/${repoFullName}`

  return {
    project,
    projectUrl,
    githubUrl: item.html_url,
    description: item.title,
    type: item.pull_request ? "Pull Request" : "Issue",
    createdAt: item.created_at,
  }
}
