'use server';

import { db, posts } from '@/db';
import { verifyAdmin } from '@/lib/admin-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uuidv7 } from 'uuidv7';
import { eq, desc } from 'drizzle-orm';

export async function getPosts() {
  return await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt));
}

export async function getPost(slug: string) {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  return result[0] || null;
}

export async function getAllPostsAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function createPost(formData: FormData) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const coverImage = formData.get('coverImage') as string;
  const published = formData.get('published') === 'on';

  await db.insert(posts).values({
    id: uuidv7(),
    title,
    slug,
    content,
    excerpt: excerpt || null,
    coverImage: coverImage || null,
    published,
    publishedAt: published ? new Date() : null,
    updatedAt: new Date(),
  });

  revalidatePath('/blog');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updatePost(id: string, formData: FormData) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const coverImage = formData.get('coverImage') as string;
  const published = formData.get('published') === 'on';

  await db
    .update(posts)
    .set({
      title,
      slug,
      content,
      excerpt: excerpt || null,
      coverImage: coverImage || null,
      published,
      publishedAt: published ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id));

  revalidatePath('/blog');
  revalidatePath('/admin');
  revalidatePath(`/blog/${slug}`);
  redirect('/admin');
}

export async function deletePost(id: string) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }

  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath('/blog');
  revalidatePath('/admin');
}
