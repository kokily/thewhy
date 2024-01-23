'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { sendMailAPI } from '@/helper/client/api/email';
import { Contact } from '@/components/contact/Contact';

export default function ContactPage() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    subject: '',
    body: '',
  });
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
      {
        name,
        email,
        subject,
        body,
      },
      {
        onSuccess: () => {
          toast.success('메일이 전송되었습니다');
          setInputs({
            name: '',
            email: '',
            subject: '',
            body: '',
          });
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <Contact inputs={inputs} onChange={onChange} onSendMail={onSendMail} />
  );
}
