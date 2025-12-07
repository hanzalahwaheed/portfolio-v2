import { updatePost, getPost } from '@/app/actions/blog';
import { Editor } from '@/components/blog/editor';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {

  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return <Editor post={post} action={updatePost.bind(null, id)} />;
}
