import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rolePermissions: Record<string, string[]> = {
  seller: ['/products', '/orders','/dashboard'],
  dealer: ['/products', '/orders','/dashboard'],
  user: ['/', '/profile', '/settings'],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Mock user role (replace with actual authentication logic)
  const userRole = req.cookies.get('role')?.value || 'user';

  // Admin can access any route
  if (userRole === 'Super Admin') {
    return NextResponse.next();
  }

  // Get allowed prefixes for the role
  const allowedPrefixes = rolePermissions[userRole] || [];

  // Check if the user has access to the path
  const hasAccess = allowedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!hasAccess) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

// Correct export
export const config = {
  matcher: '/:path*',
};
