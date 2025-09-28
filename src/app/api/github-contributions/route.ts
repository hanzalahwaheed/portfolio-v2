import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // Fetch contribution data from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}/events/public`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const events = await response.json()

    // Process events to count contributions by date
    const contributions: { [key: string]: number } = {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events.forEach((event: any) => {
      const date = event.created_at.split("T")[0]
      contributions[date] = (contributions[date] || 0) + 1
    })

    return NextResponse.json({ contributions })
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error)
    return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 })
  }
}
