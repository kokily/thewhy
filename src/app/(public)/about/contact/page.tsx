'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import client from '@/helper/client/client';
import { Contact } from '@/components/contact/Contact';

// API
async function sendMailAPI(payload: SendMailPayload) {
  const response = await client.post('/mail', payload);
  return response.data;
}

export default function ContactPage() {
  const initialState = {
    name: '',
    email: '',
    subject: '',
    body: '',
  };
  const [inputs, setInputs] = useState(initialState);
  const { name, email, subject, body } = inputs;

  // Mutations
  const sendMailMutate = useMutation({ mutationFn: sendMailAPI });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSendMail = async (e: SyntheticEvent) => {
    e.preventDefault();

    await sendMailMutate.mutateAsync(
      { ...inputs },
      {
        onSuccess: () => {
          toast.success('메일이 전송되었습니다.');
          setInputs(initialState);
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  return <Contact inputs={inputs} onChange={onChange} onSendMail={onSendMail} />;
}
