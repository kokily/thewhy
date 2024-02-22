'use client';

import type { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function SessionWrapper({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
