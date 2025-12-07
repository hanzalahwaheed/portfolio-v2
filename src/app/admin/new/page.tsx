import { createPost } from '@/app/actions/blog';
import { Editor } from '@/components/blog/editor';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function NewPostPage() {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  return <Editor action={createPost} />;
}
