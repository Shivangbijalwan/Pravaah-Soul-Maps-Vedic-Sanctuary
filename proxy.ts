import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, request) => {
  if (
    request.nextUrl.pathname.startsWith('/home') ||
    request.nextUrl.pathname.startsWith('/discover')
  ) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};