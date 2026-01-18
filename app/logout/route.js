import { NextResponse } from 'next/server';

export async function GET(request) {
  // NextAuth handles logout in client components via Navbar
  return NextResponse.json({ message: 'Use client logout from navbar' }, { status: 200 });
}


