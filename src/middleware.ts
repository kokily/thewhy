export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/notices/add',
    '/notices/update/:path*',
    '/stories/add',
    '/stories/update/:path*',
  ],
};
