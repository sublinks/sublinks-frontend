'use client';

import React, {
  FormEvent, useContext, useEffect, useState
} from 'react';
import { useRouter } from 'next/navigation';

import { InputField } from '@/components/input';
import Button from '@/components/button';
import SublinksApi from '@/utils/client';
import { UserContext } from '@/context/user';
import { BodyTitleInverse, ErrorText } from '../text';

const LoginForm = () => {
  const { myUser, saveMyUserFromSite } = useContext(UserContext);
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect when login succeeds, or on load if user is already logged in
  useEffect(() => {
    if (router && myUser) {
      router.push('/');
    }
  }, [router, myUser]);

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
      await SublinksApi.Instance().login(username, password);
      saveMyUserFromSite();
    } catch (e) {
      setError('Login attempt failed. Please try again.');
      setIsSubmitting(false);
    }
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
