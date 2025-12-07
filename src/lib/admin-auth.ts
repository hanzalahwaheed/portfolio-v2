import { cookies, headers } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'admin-key';

export async function verifyAdmin() {
  const cookieStore = await cookies();
  const adminKey = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!process.env.ADMIN_KEY) {
    console.warn('ADMIN_KEY environment variable is not set!');
    return false;
  }

  // Check cookie match
  if (adminKey === process.env.ADMIN_KEY) return true;

  // Check header match (from middleware, for first load)
  const headerStore = await headers();
  if (headerStore.get('x-admin-auth') === 'true') return true;

  return false;
}
