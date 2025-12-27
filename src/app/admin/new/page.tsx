import { createPost } from "@/app/actions/blogs"
import { Editor } from "@/components/blog/editor"
import { redirect } from "next/navigation"

export default async function NewPostPage() {
  return <Editor action={createPost} />
}
