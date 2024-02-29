'use client';

import React, {
  FormEvent, useContext, useEffect, useState
} from 'react';
import { useRouter } from 'next/navigation';

import { InputField } from '@/components/input';
import Button from '@/components/button';
import SublinksApi from '@/utils/api-client/client';
import { UserContext } from '@/context/user';
import { BodyTitleInverse, ErrorText } from '../text';
import logger from '@/utils/logger';

const LOGIN_FIELD_IDS = {
  USERNAME: 'username',
  PASSWORD: 'password'
};

const LoginForm = () => {
  const { myUser, saveMyUserFromSite } = useContext(UserContext);
  const router = useRouter();
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
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
    setErrorMessage('');
    setErroneousFields([]);

    const formData = new FormData(event.currentTarget);
    const fieldValues: Record<string, string> = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };
    const emptyFields: string[] = [];

    Object.keys(fieldValues).forEach(fieldKey => {
      if (!fieldValues[fieldKey]) {
        emptyFields.push(fieldKey);
      }
    });

    if (emptyFields.length > 0) {
      setErroneousFields(emptyFields);
      setErrorMessage('Please enter your username and password');
      setIsSubmitting(false);
      return;
    }

    try {
      await SublinksApi.Instance().login(fieldValues.username, fieldValues.password);
      saveMyUserFromSite();
    } catch (e) {
      logger.error('Login attempt failed', e);
      setErrorMessage('Login attempt failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleLoginAttempt} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <InputField
          type="text"
          label="Username"
          name={LOGIN_FIELD_IDS.USERNAME}
          id={LOGIN_FIELD_IDS.USERNAME}
          placeholder="Username"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(LOGIN_FIELD_IDS.USERNAME)}
        />
        <InputField
          type="password"
          label="Password"
          name={LOGIN_FIELD_IDS.PASSWORD}
          id={LOGIN_FIELD_IDS.PASSWORD}
          placeholder="Password"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(LOGIN_FIELD_IDS.PASSWORD)}
        />
      </div>
      <div aria-live="polite" className="h-32">
        {errorMessage && <ErrorText className="text-sm">{errorMessage}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        <BodyTitleInverse>Log In</BodyTitleInverse>
      </Button>
    </form>
  );
};

export default LoginForm;
