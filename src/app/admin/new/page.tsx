import { createPost } from "@/app/actions/blog"
import { Editor } from "@/components/blog/editor"
import { redirect } from "next/navigation"

export default async function NewPostPage() {
  return <Editor action={createPost} />
}
