import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup', '/products', '/category'];
  
  // Paths that require authentication
  const authPaths = ['/dashboard', '/profile', '/cart', '/checkout', '/product'];
  
  // Paths that require admin role
  const adminPaths = ['/dashboard'];

  const path = request.nextUrl.pathname;

  // Allow public paths
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next();
  }

  // Check if path requires authentication
  if (authPaths.some(authPath => path.startsWith(authPath))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', encodeURIComponent(request.url));
      return NextResponse.redirect(loginUrl);
    }

    // Check for admin paths
    if (adminPaths.some(adminPath => path.startsWith(adminPath))) {
      if (token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication endpoints)
     * 2. /_next/* (static files)
     * 3. /images/* (static images)
     * 4. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api/auth|_next|images|favicon.ico|sitemap.xml).*)',
  ],
}; 