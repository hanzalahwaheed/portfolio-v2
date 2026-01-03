import { NextRequest, NextResponse } from "next/server"
import { githubService } from "@/lib/github/service"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    const contributions = await githubService.getLatestContributions(username)
    return NextResponse.json({ contributions })
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error)
    return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 })
  }
}
