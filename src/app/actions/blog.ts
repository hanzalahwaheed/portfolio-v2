'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getPost(slug: string) {
  return await prisma.post.findUnique({
    where: { slug },
  });
}

export async function getAllPostsAdmin() {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const coverImage = formData.get('coverImage') as string;
  const published = formData.get('published') === 'on';

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updatePost(id: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const coverImage = formData.get('coverImage') as string;
  const published = formData.get('published') === 'on';

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin');
  revalidatePath(`/blog/${slug}`);
  redirect('/admin');
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath('/blog');
  revalidatePath('/admin');
}
