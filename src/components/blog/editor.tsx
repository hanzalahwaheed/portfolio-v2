"use client"

import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Post } from "@/db"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"

interface EditorProps {
  post?: Post
  action: (formData: FormData) => Promise<void>
}

export function Editor({ post, action }: EditorProps) {
  const [isPending, setIsPending] = useState(false)
  const [content, setContent] = useState(post?.content || "")

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
    <div className="container max-w-5xl py-12">
      <Link
        href="/admin"
        className="text-olive-grey hover:text-deep-teal dark:hover:text-gold-dust mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-deep-teal dark:text-cream font-instrument text-3xl font-bold tracking-tight">
            {post ? "Edit Post" : "New Post"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                name="published"
                defaultChecked={post?.published}
                className="data-[state=checked]:bg-deep-teal"
              />
              <Label htmlFor="published" className="text-rich-black dark:text-cream">
                Published
              </Label>
            </div>
            <Button type="submit" disabled={isPending} className="bg-deep-teal hover:bg-deep-teal/90 text-cream">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-rich-black dark:text-cream font-medium">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={post?.title}
                required
                placeholder="Post title"
                className="border-gold-dust/30 focus-visible:ring-deep-teal bg-cream/50 dark:bg-rich-black/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug" className="text-rich-black dark:text-cream font-medium">
                Slug
              </Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={post?.slug}
                required
                placeholder="post-slug"
                className="border-gold-dust/30 focus-visible:ring-deep-teal bg-cream/50 dark:bg-rich-black/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt" className="text-rich-black dark:text-cream font-medium">
                Excerpt
              </Label>
              <TextareaAutosize
                id="excerpt"
                name="excerpt"
                defaultValue={post?.excerpt || ""}
                className="border-gold-dust/30 bg-cream/50 dark:bg-rich-black/50 ring-offset-background placeholder:text-olive-grey/50 focus-visible:ring-deep-teal flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                minRows={3}
                placeholder="Brief description for the card..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coverImage" className="text-rich-black dark:text-cream font-medium">
                Cover Image URL
              </Label>
              <Input
                id="coverImage"
                name="coverImage"
                defaultValue={post?.coverImage || ""}
                placeholder="https://example.com/image.jpg"
                className="border-gold-dust/30 focus-visible:ring-deep-teal bg-cream/50 dark:bg-rich-black/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-rich-black dark:text-cream font-medium">
                Content (Markdown)
              </Label>
              <TextareaAutosize
                id="content"
                name="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="border-gold-dust/30 bg-cream/50 dark:bg-rich-black/50 ring-offset-background placeholder:text-olive-grey/50 focus-visible:ring-deep-teal flex min-h-[400px] w-full rounded-md border px-3 py-2 font-mono text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="# Hello World"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-rich-black dark:text-cream font-medium">Preview</Label>
            <div className="border-gold-dust/30 bg-cream/30 dark:bg-rich-black/30 prose prose-neutral dark:prose-invert prose-headings:text-deep-teal dark:prose-headings:text-gold-dust prose-a:text-deep-teal dark:prose-a:text-turquoise min-h-[500px] max-w-none overflow-y-auto rounded-md border p-6">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
