"use client"

import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import { Copy, Check, Moon, Sun } from "lucide-react"
import { format } from "date-fns"
import type { Post } from "@/db"
import { calculateReadTime } from "@/lib/blog-utils"
import Link from "next/link"
import { bricolageGrotesque } from "@/app/fonts"

interface MinimalBlogContentProps {
  post: Post
}

export function MinimalBlogContent({ post }: MinimalBlogContentProps) {
  const [isDark, setIsDark] = useState(true)
  const [copiedCodeBlocks, setCopiedCodeBlocks] = useState<Record<string, boolean>>({})
  const codeBlockCounter = useRef(0)

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("blog-theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      // Default to dark mode
      setIsDark(true)
    }
    // Reset code block counter when post changes
    codeBlockCounter.current = 0
  }, [post.id])

  useEffect(() => {
    // Apply theme class to document
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("blog-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("blog-theme", "light")
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const handleCopyCode = async (code: string, index: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCodeBlocks(prev => ({ ...prev, [index]: true }))
      setTimeout(() => {
        setCopiedCodeBlocks(prev => ({ ...prev, [index]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const readTime = calculateReadTime(post.content)
  const publishedDate = post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : null

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-neutral-950 text-neutral-200" : "bg-white text-neutral-800"
        } selection:bg-white selection:text-black dark:selection:bg-white dark:selection:text-black`}
    >
      {/* Minimal Header */}
      <nav
        className={`fixed top-0 z-40 w-full border-b backdrop-blur-sm transition-colors ${isDark ? "border-neutral-800 bg-neutral-950/80" : "border-neutral-200 bg-white/80"
          }`}
      >
        <div className="container mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/blog" className="flex items-center gap-3 text-sm transition-colors">
            <span
              className={`text-xs tracking-widest uppercase ${isDark ? "text-neutral-500 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                }`}
            >
              Back
            </span>
          </Link>
          <button
            onClick={toggleTheme}
            className={`rounded-md p-2 transition-colors ${isDark
              ? "text-neutral-500 hover:bg-neutral-900 hover:text-white"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <main className="container mx-auto max-w-3xl px-6 pt-32 pb-24">
        {/* Article Title Block */}
        <header className="mb-20">
          <div className="flex flex-col gap-6">
            <div
              className={`flex items-center gap-4 font-mono text-xs tracking-widest uppercase ${isDark ? "text-neutral-500" : "text-neutral-500"
                }`}
            >
              {publishedDate && <span>{publishedDate}</span>}
              {publishedDate && <span>—</span>}
              <span>{readTime} read</span>
            </div>
            <h1
              className={`font-serif text-4xl leading-tight tracking-tight md:text-6xl ${isDark ? "text-white" : "text-neutral-900"
                }`}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-3 pt-2">
              <div className={`h-8 w-px ${isDark ? "bg-neutral-800" : "bg-neutral-300"}`}></div>
              <span className={`font-mono text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Author</span>
            </div>
          </div>
        </header>

        {/* Minimal Image */}
        {post.coverImage && (
          <div
            className={`mb-20 transition-opacity duration-700 ${isDark ? "opacity-80 grayscale hover:opacity-100" : "opacity-90 hover:opacity-100"
              }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} className="h-auto w-full" />
            <p className={`mt-2 text-right font-mono text-xs ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
              Photo via Unsplash
            </p>
          </div>
        )}

        {/* Content */}
        <article>
          <div
            className={`markdown-content ${bricolageGrotesque.className} ${isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1
                    className={`my-4 text-4xl font-medium tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2
                    className={`my-4 text-3xl font-medium tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    className={`my-4 text-2xl font-medium tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}
                  >
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4
                    className={`mt-10 mb-4 inline-block border-b pb-2 text-xl font-normal ${isDark ? "border-neutral-800 text-neutral-200" : "border-neutral-300 text-neutral-800"
                      }`}
                  >
                    {children}
                  </h4>
                ),
                p: ({ children }) => <p className="mb-6 text-lg leading-relaxed font-light antialiased">{children}</p>,
                blockquote: ({ children }) => (
                  <blockquote
                    className={`my-8 border-l pl-4 font-serif text-lg italic ${isDark ? "border-white text-neutral-400" : "border-neutral-400 text-neutral-600"
                      }`}
                  >
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => <ul className="my-3 ml-5 list-disc space-y-3">{children}</ul>,
                li: ({ children }) => (
                  <li
                    className={`pl-2 ${isDark ? "text-neutral-300 marker:text-neutral-500" : "text-neutral-700 marker:text-neutral-400"
                      }`}
                  >
                    {children}
                  </li>
                ),
                hr: () => <hr className={`my-16 ${isDark ? "border-neutral-800" : "border-neutral-300"}`} />,
                strong: ({ children }) => (
                  <strong className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}>{children}</strong>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code: ({ className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || "")
                  const isInline = !match
                  const codeString = String(children).replace(/\n$/, "")
                  let currentIndex = ""
                  if (!isInline) {
                    currentIndex = `code-${codeBlockCounter.current++}`
                  }

                  if (isInline) {
                    return (
                      <code
                        className={`border px-1 py-0.5 font-mono text-sm ${isDark
                          ? "border-neutral-800 bg-neutral-900 text-neutral-300"
                          : "border-neutral-300 bg-neutral-100 text-neutral-800"
                          }`}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  }

                  return (
                    <div
                      className={`my-10 border ${isDark ? "border-neutral-800 bg-neutral-900" : "border-neutral-300 bg-neutral-50"
                        }`}
                    >
                      <div
                        className={`flex items-center justify-between border-b px-4 py-2 ${isDark ? "border-neutral-800" : "border-neutral-300"
                          }`}
                      >
                        <span
                          className={`font-mono text-xs tracking-wider uppercase ${isDark ? "text-neutral-500" : "text-neutral-500"
                            }`}
                        >
                          {match ? match[1] : "text"}
                        </span>
                        <button
                          onClick={() => handleCopyCode(codeString, currentIndex)}
                          className={`transition-colors ${isDark ? "text-neutral-500 hover:text-white" : "text-neutral-500 hover:text-neutral-900"
                            }`}
                        >
                          {copiedCodeBlocks[currentIndex] ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                      <div className="overflow-x-auto p-4">
                        <pre
                          className={`font-mono text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-700"
                            }`}
                        >
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )
                },
                table: ({ children }) => (
                  <div className="my-8 overflow-x-auto">
                    <table
                      className={`w-full border-collapse ${isDark ? "border-neutral-800" : "border-neutral-300"
                        }`}
                    >
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead
                    className={`${isDark ? "bg-neutral-900 text-neutral-200" : "bg-neutral-100 text-neutral-900"
                      }`}
                  >
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => (
                  <tr
                    className={`border-b transition-colors ${isDark
                      ? "border-neutral-800 hover:bg-neutral-900/50"
                      : "border-neutral-200 hover:bg-neutral-50"
                      }`}
                  >
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th
                    className={`border px-4 py-3 text-left font-medium ${isDark ? "border-neutral-800" : "border-neutral-300"
                      }`}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    className={`border px-4 py-3 ${isDark ? "border-neutral-800 text-neutral-300" : "border-neutral-300 text-neutral-700"
                      }`}
                  >
                    {children}
                  </td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Minimal Footer */}
        <div
          className={`mt-32 flex items-center justify-between border-t pt-12 font-mono text-sm ${isDark ? "border-neutral-900 text-neutral-600" : "border-neutral-300 text-neutral-500"
            }`}
        >
          <span>End of Article</span>
          <Link href="/blog" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-neutral-900"}`}>
            Next Post &rarr;
          </Link>
        </div>
      </main>

      {/* Highlight.js styles */}
      <style jsx global>{`
        /* Highlight.js theme - custom dark/light theme */
        .hljs {
          background: ${isDark ? "#171717" : "#fafafa"} !important;
          color: ${isDark ? "#e0e0e0" : "#333"} !important;
        }
        .hljs-comment,
        .hljs-quote {
          color: ${isDark ? "#6a737d" : "#6a737d"} !important;
          font-style: italic;
        }
        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-type {
          color: ${isDark ? "#c792ea" : "#d73a49"} !important;
        }
        .hljs-string,
        .hljs-literal {
          color: ${isDark ? "#c3e88d" : "#032f62"} !important;
        }
        .hljs-number {
          color: ${isDark ? "#f78c6c" : "#005cc5"} !important;
        }
        .hljs-function,
        .hljs-title {
          color: ${isDark ? "#82aaff" : "#6f42c1"} !important;
        }
        .hljs-variable,
        .hljs-template-variable {
          color: ${isDark ? "#ffcb6b" : "#e36209"} !important;
        }
        .hljs-attr,
        .hljs-attribute {
          color: ${isDark ? "#ffcb6b" : "#005cc5"} !important;
        }
        .hljs-tag,
        .hljs-name {
          color: ${isDark ? "#f07178" : "#22863a"} !important;
        }
        .hljs-regexp,
        .hljs-link {
          color: ${isDark ? "#c3e88d" : "#032f62"} !important;
        }
        .hljs-built_in,
        .hljs-builtin-name {
          color: ${isDark ? "#ffcb6b" : "#005cc5"} !important;
        }
        .hljs-meta {
          color: ${isDark ? "#546e7a" : "#6a737d"} !important;
        }
        .hljs-deletion {
          background: ${isDark ? "#4a1e1e" : "#ffeef0"} !important;
        }
        .hljs-addition {
          background: ${isDark ? "#1e4a1e" : "#f0fff4"} !important;
        }
        .hljs-emphasis {
          font-style: italic;
        }
        .hljs-strong {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}
