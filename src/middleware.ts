export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/stories/add',
    '/stories/update/:path*',
    '/notices/add',
    '/notices/update/:path*',
  ],
};
