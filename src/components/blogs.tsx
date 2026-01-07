"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Calendar, Clock, ChevronRight } from "lucide-react"
import { getPosts } from "@/app/actions/blogs"
import { Post } from "@/db"
import { format } from "date-fns"
import { instrumentSerif } from "@/app/fonts"

type ArticleSize = "large" | "tall" | "wide" | "standard"

type Article = {
  id: string
  title: string
  excerpt: string | null
  date: string
  readTime: string
  category: string
  image: string
  size: ArticleSize
  slug: string
}

// Helper function to estimate read time from content
const estimateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min`
}

// Map posts to articles with size distribution
const mapPostsToArticles = (posts: Post[]): Article[] => {
  const sizePattern: ArticleSize[] = ["large", "tall", "standard", "wide", "standard"]
  const defaultImage = "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop"

  return posts.map((post, index) => {
    const size = sizePattern[index % sizePattern.length]
    const date = post.publishedAt
      ? format(new Date(post.publishedAt), "MMM dd, yyyy")
      : format(new Date(post.createdAt), "MMM dd, yyyy")

    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date,
      readTime: estimateReadTime(post.content),
      category: "Blog", // You can add a category field to posts later if needed
      image: post.coverImage || defaultImage,
      size,
      slug: post.slug,
    }
  })
}

const BlogCard = ({ article }: { article: Article }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Determine grid spans based on the 'size' property
  const getGridClasses = (size: ArticleSize): string => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2"
      case "tall":
        return "md:col-span-1 md:row-span-2"
      case "wide":
        return "md:col-span-2 md:row-span-1"
      default:
        return "md:col-span-1 md:row-span-1"
    }
  }

  return (
    <Link href={`/blogs/${article.slug}`}>
      <div
        className={`group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 ${getGridClasses(article.size)} cursor-pointer transition-all duration-500 hover:border-neutral-600`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          {/* Top Tag */}
          {/* <div className="absolute top-6 left-6">
            <span className="inline-block rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {article.category}
            </span>
          </div> */}

          {/* Arrow Icon */}
          <div
            className={`absolute top-6 right-6 transition-all duration-300 ${isHovered ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
              <ArrowUpRight size={20} />
            </div>
          </div>

          {/* Text Content */}
          <div className={`transform transition-all duration-500 ${isHovered ? "translate-y-0" : "translate-y-2"}`}>
            <div className="mb-3 flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {article.readTime}
              </span>
            </div>

            <h3 className="mb-2 text-2xl leading-tight font-medium text-white group-hover:text-neutral-200">
              {article.title}
            </h3>

            {article.excerpt && (
              <p
                className={`line-clamp-2 text-sm text-neutral-400 transition-all duration-500 ${isHovered ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
              >
                {article.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

const Blogs = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts()
        const mappedArticles = mapPostsToArticles(posts)
        setArticles(mappedArticles)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] p-8 font-sans text-white selection:bg-white selection:text-black md:p-16">
      {/* Section Header */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2
            className={`${instrumentSerif.className} bg-gradient-to-b from-white to-white/60 bg-clip-text pb-2 text-4xl tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] md:text-5xl`}
          >
            Blogs
          </h2>
          <p className="mt-4 max-w-md text-white">
            I mostly write about tech and some personal thoughts on stuff I read.
          </p>
        </div>

        <Link
          href="/blogs"
          className="group flex items-center gap-2 border-b border-transparent pb-1 text-sm font-medium text-white transition-colors hover:border-white hover:text-neutral-300"
        >
          View all articles
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </header>

      {/* The Weird Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-neutral-500">Loading posts...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-neutral-500">No posts available yet.</p>
        </div>
      ) : (
        <div className="grid auto-rows-[300px] grid-cols-1 gap-4 md:grid-cols-4">
          {articles.map(article => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Blogs
