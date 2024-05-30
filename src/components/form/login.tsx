'use client';

import React, {
  FormEvent, useContext, useEffect, useState
} from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@material-tailwind/react';

import { InputField } from '@/components/input';
import Button from '@/components/button';
import SublinksApi from '@/utils/api-client/client';
import { UserContext } from '@/context/user';
import logger from '@/utils/logger';
import { revalidateAllAndRedirect, saveAuthOnServer } from '@/utils/server-actions';
import { BodyTitleInverse, ErrorText } from '../text';

const LOGIN_FIELD_IDS = {
  USERNAME: 'username',
  PASSWORD: 'password'
};

const LoginForm = () => {
  const { userData, saveMyUserFromSite } = useContext(UserContext);
  const router = useRouter();
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userData.auth) {
      router.replace('/');
    }
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  const loginAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setErroneousFields([]);

    const fieldValues = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };
    const emptyFields: string[] = [];

    Object.keys(fieldValues).forEach(fieldKey => {
      const key = fieldKey as keyof typeof fieldValues;

      if (!fieldValues[key]) {
        emptyFields.push(key);
      }
    });

    if (emptyFields.length > 0) {
      setErroneousFields(emptyFields);
      setErrorMessage('Please enter your username and password');
      setIsSubmitting(false);
      return;
    }

    try {
      const jwt = await SublinksApi.Instance().login({
        username: fieldValues.username,
        password: fieldValues.password
      });
      await saveMyUserFromSite();
      await saveAuthOnServer(jwt);
      await revalidateAllAndRedirect('/');
    } catch (e) {
      logger.error('Login attempt failed', e);
      setErrorMessage('Login attempt failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleFieldValueChange = async (event: FormEvent<HTMLFormElement>) => {
    const field = event.target as HTMLInputElement;
    const fieldKey = field.id;
    const fieldIndexInErrors = erroneousFields.indexOf(fieldKey);

    if (fieldIndexInErrors !== -1) {
      const newErroneousFields = [...erroneousFields];
      newErroneousFields.splice(fieldIndexInErrors, 1);
      setErroneousFields(newErroneousFields);

      if (newErroneousFields.length === 0) {
        setErrorMessage('');
      }
    }
  };

  return (
    <form action={loginAction} onChange={handleFieldValueChange} className="flex flex-col">
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
      <div aria-live="polite" className="h-32 flex items-center justify-center">
        {errorMessage && <ErrorText className="text-sm">{errorMessage}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="flex justify-center">
        {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
        {isSubmitting ? <Spinner className="h-24 w-24" /> : <BodyTitleInverse>Log In</BodyTitleInverse>}
      </Button>
    </form>
  );
};

export default LoginForm;
