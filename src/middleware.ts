import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware for Admin Auth
export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const key = request.nextUrl.searchParams.get('key')
    const adminKey = process.env.ADMIN_KEY
    const cookieKey = request.cookies.get('admin-key')?.value

    // 1. Check if we have the correct key in query params
    if (key && key === adminKey) {
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-admin-auth', 'true')

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
      // Set the cookie for future requests
      response.cookies.set('admin-key', key, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })
      return response
    }

    // 2. Check if we have a valid cookie
    if (cookieKey && cookieKey === adminKey) {
      return NextResponse.next()
    }

    // 3. Otherwise redirect to home or show 403 (redirecting to home for now to hide admin existence)
    // Or actually, user asked to "block the route". I'll return a 404 or just redirect to home.
    // Redirecting to home is safer/cleaner.
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
