import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  return session?.value === 'true';
}

export async function requireAuth() {
  const isAuthenticated = await getSession();
  if (!isAuthenticated) {
    throw new Error('Unauthorized');
  }
  return true;
}

