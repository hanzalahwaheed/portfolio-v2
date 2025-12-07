'use client';

import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface EditorProps {
  post?: Post;
  action: (formData: FormData) => Promise<void>;
}

export function Editor({ post, action }: EditorProps) {
  const [isPending, setIsPending] = useState(false);
  const [content, setContent] = useState(post?.content || '');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      await action(formData);
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  }

  return (
    <div className="container max-w-5xl py-12">
      <Link
        href="/admin"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {post ? 'Edit Post' : 'New Post'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                name="published"
                defaultChecked={post?.published}
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={post?.title}
                required
                placeholder="Post title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={post?.slug}
                required
                placeholder="post-slug"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <TextareaAutosize
                id="excerpt"
                name="excerpt"
                defaultValue={post?.excerpt || ''}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                minRows={3}
                placeholder="Brief description for the card..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                name="coverImage"
                defaultValue={post?.coverImage || ''}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <TextareaAutosize
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="# Hello World"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label>Preview</Label>
            <div className="min-h-[500px] rounded-md border border-border bg-card p-6 prose prose-neutral dark:prose-invert max-w-none overflow-y-auto">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
