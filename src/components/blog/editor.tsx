"use client"

import { useState, useRef, useEffect } from "react"
import TextareaAutosize from "react-textarea-autosize"
import ReactMarkdown from "react-markdown"
import { Post } from "@/db"
import Link from "next/link"
import { ArrowLeft, Loader2, Save, ImageIcon, Eye, X } from "lucide-react"

// --- Minimalist UI Components ---

const MinimalButton = ({
  children,
  className = "",
  variant = "primary",
  disabled,
  type = "button",
  form,
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "ghost" | "outline"
  disabled?: boolean
  type?: "button" | "submit"
  form?: string
  onClick?: () => void
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200 h-9 px-4 py-2",
    ghost: "hover:bg-neutral-900 text-neutral-400 hover:text-white h-9 px-4 py-2",
    outline: "border border-neutral-800 hover:bg-neutral-900 text-neutral-300 h-9 px-4 py-2"
  }

  return (
    <button
      type={type}
      form={form}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const MinimalInput = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const MinimalLabel = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <label className={`text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1.5 block ${className}`} {...props}>
    {children}
  </label>
)

const Toggle = ({ checked, onCheckedChange, name }: { checked: boolean; onCheckedChange: (checked: boolean) => void; name?: string }) => (
  <>
    <input type="hidden" name={name} value={checked ? "on" : ""} />
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`w-9 h-5 rounded-full relative transition-colors border ${checked ? 'bg-white border-white' : 'bg-black border-neutral-700'}`}
    >
      <span className={`block w-3 h-3 rounded-full bg-black shadow-sm transition-transform duration-100 will-change-transform ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
    </button>
  </>
)

// Custom Auto-resizing Textarea
const AutoResizeTextarea = ({
  value,
  onChange,
  minRows = 1,
  className = "",
  placeholder,
  name,
  id,
  required,
  defaultValue
}: {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  minRows?: number
  className?: string
  placeholder?: string
  name?: string
  id?: string
  required?: boolean
  defaultValue?: string
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      rows={minRows}
      className={className}
      placeholder={placeholder}
      name={name}
      id={id}
      required={required}
      defaultValue={defaultValue}
    />
  )
}

// --- Markdown Previewer ---
const SimpleMarkdown = ({ content }: { content: string }) => {
  if (!content) return <p className="text-neutral-600 italic font-instrument">Start typing to preview...</p>

  const lines = content.split('\n')
  return (
    <div className="space-y-4">
      {lines.map((line, i) => {
        if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-medium text-white mt-8 mb-4 font-instrument">{line.replace('### ', '')}</h3>
        if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-medium text-white mt-8 mb-4 font-instrument">{line.replace('## ', '')}</h2>
        if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-medium text-white mt-8 mb-4 font-instrument">{line.replace('# ', '')}</h1>
        if (line.startsWith('#### ')) return <h4 key={i} className="text-lg text-neutral-300 mt-6 mb-2 border-b border-neutral-800 pb-2 inline-block font-instrument">{line.replace('#### ', '')}</h4>
        if (line.startsWith('> ')) return <blockquote key={i} className="pl-4 border-l border-white text-neutral-400 italic font-instrument">{line.replace('> ', '')}</blockquote>
        if (line.startsWith('```')) return <div key={i} className="bg-neutral-900 border border-neutral-800 p-3 rounded text-xs font-mono text-neutral-400 my-4">Code Block</div>
        if (line.trim() === '') return <br key={i} />
        return <p key={i} className="text-neutral-300 leading-relaxed font-light">{line}</p>
      })}
    </div>
  )
}

// --- Main Editor Component ---

interface EditorProps {
  post?: Post
  action: (formData: FormData) => Promise<void>
}

export function Editor({ post, action }: EditorProps) {
  const [isPending, setIsPending] = useState(false)
  const [content, setContent] = useState(post?.content || "")
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [published, setPublished] = useState(post?.published || false)
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImage || "")
  const [isUploading, setIsUploading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    const formData = new FormData(event.currentTarget)
    try {
      await action(formData)
    } catch (error) {
      console.error(error)
      setIsPending(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-instrument selection:bg-neutral-800 selection:text-white">

      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur-md border-b border-neutral-900 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-neutral-500 hover:text-white transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <span className="text-sm font-medium text-neutral-400 font-instrument">
            {title || "Untitled Post"}
          </span>
          <span className="text-neutral-800 text-sm">/</span>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${published ? 'border-neutral-600 text-neutral-300' : 'border-neutral-800 text-neutral-600'}`}>
            {published ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 mr-4">
            <MinimalLabel className="!mb-0 !text-[10px] cursor-pointer" onClick={() => setPublished(!published)}>
              {published ? 'Public' : 'Private'}
            </MinimalLabel>
            <Toggle checked={published} onCheckedChange={setPublished} />
          </div>
          <MinimalButton type="submit" form="editor-form" disabled={isPending}>
            {isPending ? <Loader2 size={14} className="animate-spin mr-2" /> : <Save size={14} className="mr-2" />}
            Save Changes
          </MinimalButton>
        </div>
      </nav>

      <form id="editor-form" onSubmit={handleSubmit}>
        {/* Hidden input for published state */}
        <input type="hidden" name="published" value={published ? "on" : ""} />

        <main className="pt-14 h-screen flex flex-col md:flex-row overflow-hidden">

          {/* Left Pane: Editor Inputs */}
          <div className="w-full md:w-1/2 flex flex-col h-full border-r border-neutral-900 overflow-y-auto bg-black">
            <div className="p-8 md:p-12 max-w-2xl mx-auto w-full space-y-10 pb-32">

              {/* Meta Fields */}
              <div className="space-y-8">
                <div>
                  <MinimalLabel>Title</MinimalLabel>
                  <MinimalInput
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="text-2xl font-instrument"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <MinimalLabel>Slug</MinimalLabel>
                    <MinimalInput
                      name="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="post-url-slug"
                      className="font-mono text-neutral-400"
                      required
                    />
                  </div>
                  <div>
                    <MinimalLabel>Read Time</MinimalLabel>
                    <MinimalInput
                      name="readTime"
                      placeholder="e.g. 5 min"
                      className="font-mono text-neutral-400"
                    />
                  </div>
                </div>

                <div>
                  <MinimalLabel>Excerpt</MinimalLabel>
                  <AutoResizeTextarea
                    name="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    minRows={2}
                    className="w-full bg-transparent border-b border-neutral-800 text-sm text-neutral-300 focus:outline-none focus:border-white resize-none py-2 placeholder:text-neutral-700 leading-relaxed"
                    placeholder="A brief summary for search engines and social cards..."
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="pt-4">
                <MinimalLabel>Cover Image</MinimalLabel>
                <input type="hidden" name="coverImage" value={coverImageUrl} />

                {coverImageUrl ? (
                  <div className="relative mt-2 group">
                    <img
                      src={coverImageUrl}
                      alt="Cover"
                      className="w-full h-48 object-cover rounded-sm opacity-80 group-hover:opacity-100 transition-opacity border border-neutral-800"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverImageUrl("")}
                      className="absolute top-2 right-2 bg-black/80 text-white p-1.5 rounded-sm hover:bg-black transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="mt-2 border border-dashed border-neutral-800 rounded-sm p-8 flex flex-col items-center justify-center gap-3 hover:bg-neutral-900/30 transition-colors cursor-pointer group text-neutral-500 hover:text-neutral-400 hover:border-neutral-700 relative">
                    {isUploading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <ImageIcon size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                    <span className="text-xs uppercase tracking-widest">
                      {isUploading ? "Uploading..." : "Upload Cover"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      className="hidden"
                      disabled={isUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return

                        setIsUploading(true)
                        try {
                          const formData = new FormData()
                          formData.append("file", file)

                          const response = await fetch("/api/upload", {
                            method: "POST",
                            body: formData,
                          })

                          if (!response.ok) {
                            const error = await response.json()
                            throw new Error(error.error || "Upload failed")
                          }

                          const data = await response.json()
                          setCoverImageUrl(data.url)
                        } catch (error) {
                          console.error("Upload error:", error)
                          alert(error instanceof Error ? error.message : "Upload failed")
                        } finally {
                          setIsUploading(false)
                          e.target.value = ""
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Markdown Editor */}
              <div className="pt-8">
                <MinimalLabel className="mb-4">Content</MinimalLabel>
                <AutoResizeTextarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  minRows={15}
                  className="w-full bg-transparent text-lg font-mono text-neutral-300 focus:outline-none resize-none placeholder:text-neutral-800 leading-relaxed"
                  placeholder="Write your story here..."
                  required
                />
              </div>

            </div>
          </div>

          {/* Right Pane: Live Preview */}
          <div className="hidden md:flex w-1/2 flex-col h-full bg-[#050505] overflow-y-auto border-l border-neutral-900/50">
            <div className="sticky top-0 bg-[#050505]/95 backdrop-blur-sm border-b border-neutral-900 px-6 h-10 flex items-center gap-2 z-10">
              <Eye size={12} className="text-neutral-500" />
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Live Preview</span>
            </div>

            <div className="p-12 max-w-2xl mx-auto w-full">
              {/* Mimic the Blog Reader Header */}
              <div className="mb-12 text-center md:text-left">
                <h1 className="text-4xl font-instrument text-white mb-4">{title || "Untitled"}</h1>
                <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                  {new Date().toLocaleDateString()} — 5 min read
                </p>
              </div>

              {coverImageUrl && (
                <div className="mb-10 grayscale opacity-90">
                  <img src={coverImageUrl} className="w-full rounded-sm" alt="Cover preview" />
                </div>
              )}

              <article className="prose prose-invert prose-p:text-neutral-300 prose-headings:font-instrument prose-headings:text-white max-w-none">
                <SimpleMarkdown content={content} />
              </article>
            </div>
          </div>

        </main>
      </form>
    </div>
  )
}
