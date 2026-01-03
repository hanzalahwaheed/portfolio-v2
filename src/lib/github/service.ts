import { GitHubSearchResponse, Contribution } from "./types"
import { transformToContribution } from "./transformers"
import { handleApiResponse } from "../api-client"

/**
 * GitHub Service
 * A reusable service class for interacting with the GitHub API
 */
export class GitHubService {
  private readonly baseUrl = "https://api.github.com"
  private readonly userAgent = "Portfolio-App"

  /**
   * Fetch latest contributions (PRs and Issues) for a user
   * Excludes contributions to the user's own repositories
   */
  async getLatestContributions(username: string, limit: number = 10): Promise<Contribution[]> {
    const query = `author:${username} is:public -user:${username}`
    const url = `${this.baseUrl}/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=${limit}`

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": this.userAgent,
      },
    })

    const data = await handleApiResponse<GitHubSearchResponse>(response)
    return data.items.map(transformToContribution)
  }
}

// Export a singleton instance for convenience
export const githubService = new GitHubService()
