'use client';

import type { PropsWithChildren } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const client = new QueryClient();

export default function QueryWrapper({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
