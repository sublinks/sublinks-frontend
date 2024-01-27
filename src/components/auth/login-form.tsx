'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { InputField } from '@/components/input';
import Button from '@/components/button';
import sublinksClient from '@/utils/client';
import { BodyTitleInverse, ErrorText } from '../text';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginAttempt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(undefined);

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      setError('Please enter your username and password');
      setIsSubmitting(false);
      return;
    }

    try {
      const { jwt } = await sublinksClient().login({
        username_or_email: username,
        password
      });

      if (!jwt) {
        throw Error('JWT not returned from server');
      }

      await sublinksClient().setAuth(jwt);
      router.push(`/user/${username}`);
    } catch (e) {
      setError('Login attempt failed. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleLoginAttempt} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <InputField type="text" label="Username" name="username" id="username" placeholder="Username" showBorderPlaceholder disabled={isSubmitting} />
        <InputField type="password" label="Password" name="password" id="password" placeholder="Password" showBorderPlaceholder disabled={isSubmitting} />
      </div>
      <div className="h-32">
        {error && <ErrorText className="text-sm">{error}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        <BodyTitleInverse>Log In</BodyTitleInverse>
      </Button>
    </form>
  );
};

export default LoginForm;
