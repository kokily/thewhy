'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Login } from '@/components/thewhy/Login';

export default function LoginPage() {
  const router = useRouter();
  const { data } = useSession();

  // States
  const [password, setPassword] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      password,
      redirect: true,
      callbackUrl: '/',
    });

    if (response.error) {
      toast.error(response.error);
    }
  };

  if (data && data.user) {
    router.replace('/');
  }

  return <Login password={password} onChange={onChange} onLogin={onLogin} />;
}
