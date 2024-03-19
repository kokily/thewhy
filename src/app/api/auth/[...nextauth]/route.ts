import NextAuth from 'next-auth/next';

import { authOptions } from '@/helper/server/authOptions';

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
