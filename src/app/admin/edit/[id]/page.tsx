import { updatePost, getPost } from '@/app/actions/blog';
import { Editor } from '@/components/blog/editor';
import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return <Editor post={post} action={updatePost.bind(null, id)} />;
}
