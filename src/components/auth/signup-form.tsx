'use client';

import React, {
  FormEvent, useContext, useEffect, useState
} from 'react';
import { useRouter } from 'next/navigation';

import { InputField } from '@/components/input';
import Button from '@/components/button';
import SublinksApi from '@/utils/api-client/client';
import { UserContext } from '@/context/user';
import logger from '@/utils/logger';
import { Spinner } from '@material-tailwind/react';
import { BodyTitleInverse, ErrorText } from '../text';

const SIGNUP_FIELD_IDS = {
  EMAIL: 'email',
  USERNAME: 'username',
  PASSWORD: 'password',
  VERIFY_PASSWORD: 'verifyPassword',
  SHOW_NSFW: 'showNsfw'
};

const REQUIRED_FIELDS = [
  SIGNUP_FIELD_IDS.EMAIL,
  SIGNUP_FIELD_IDS.PASSWORD,
  SIGNUP_FIELD_IDS.VERIFY_PASSWORD
];

const SignupForm = () => {
  const { myUser, saveMyUserFromSite } = useContext(UserContext);
  const router = useRouter();
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect when user is logged in
  useEffect(() => {
    if (myUser) {
      router.push('/');
    }
  }, [myUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignupAttempt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setErroneousFields([]);

    const formData = new FormData(event.currentTarget);
    const fieldValues: Record<string, string> = {
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      verifyPassword: formData.get('verifyPassword') as string,
      showNsfw: formData.get('showNsfw') as string
    };
    const emptyFields: string[] = [];

    REQUIRED_FIELDS.forEach(fieldKey => {
      if (!fieldValues[fieldKey]) {
        emptyFields.push(fieldKey);
      }
    });

    if (emptyFields.length > 0) {
      setErroneousFields(emptyFields);
      setErrorMessage('Please enter all required information');
      setIsSubmitting(false);
      return;
    }

    try {
      // await SublinksApi.Instance().login(fieldValues.username, fieldValues.password);
      // await saveMyUserFromSite();
      // router.push('/');
    } catch (e) {
      logger.error('Signup attempt failed', e);
      setErrorMessage('Signup attempt failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignupAttempt} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <InputField
          type="text"
          label="Username"
          name={SIGNUP_FIELD_IDS.USERNAME}
          id={SIGNUP_FIELD_IDS.USERNAME}
          placeholder="Username (optional)"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.USERNAME)}
        />
        <InputField
          type="email"
          label="E-mail Address"
          name={SIGNUP_FIELD_IDS.EMAIL}
          id={SIGNUP_FIELD_IDS.EMAIL}
          placeholder="E-mail Address"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.EMAIL)}
        />
        <InputField
          type="password"
          label="Password"
          name={SIGNUP_FIELD_IDS.PASSWORD}
          id={SIGNUP_FIELD_IDS.PASSWORD}
          placeholder="Password"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.PASSWORD)}
        />
        <InputField
          type="password"
          label="Verify Password"
          name={SIGNUP_FIELD_IDS.VERIFY_PASSWORD}
          id={SIGNUP_FIELD_IDS.VERIFY_PASSWORD}
          placeholder="Verify Password"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.VERIFY_PASSWORD)}
        />
      </div>
      <div aria-live="polite" className="h-32 flex items-center justify-center">
        {errorMessage && <ErrorText className="text-sm">{errorMessage}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="flex justify-center">
        {isSubmitting ? <Spinner className="h-24 w-24" /> : <BodyTitleInverse>Sign In</BodyTitleInverse>}
      </Button>
    </form>
  );
};

export default SignupForm;
