'use client';

import { type SyntheticEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { Login } from '@/components/thewhy/Login';

export default function TheWhy() {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const { status } = useSession();

  const onLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    const password = passwordRef.current?.value;

    const response = await signIn('credentials', {
      password,
      redirect: true,
      callbackUrl: '/',
    });

    if (response?.error) {
      toast.error(response.error);
    }
  };

  if (status === 'authenticated') {
    router.replace('/');
  }

  return <Login passwordRef={passwordRef} onLogin={onLogin} />;
}
