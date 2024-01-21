export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/api/notices/add',
    '/api/notices/remove/:path*',
    '/api/notices/update/:path*',
    '/api/questions/reply/:path*',
    '/api/questions/reply/remove/:path*',
    '/api/stories/add',
    '/api/stories/remove/:path*',
    '/api/stories/update/:path*',
  ],
};
