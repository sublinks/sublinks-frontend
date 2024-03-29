'use client';

import React, {
  FormEvent, useContext, useEffect, useState
} from 'react';
import { useRouter } from 'next/navigation';

import { Checkbox, InputField } from '@/components/input';
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
  SIGNUP_FIELD_IDS.USERNAME,
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
    const fieldValues = {
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      verifyPassword: formData.get('verifyPassword') as string,
      showNsfw: formData.get('showNsfw') as string
    };
    const emptyFields: string[] = [];

    REQUIRED_FIELDS.forEach(fieldKey => {
      const key = fieldKey as keyof typeof fieldValues;

      if (!fieldValues[key]) {
        emptyFields.push(key);
      }
    });

    if (emptyFields.length > 0) {
      setErroneousFields(emptyFields);
      setErrorMessage('Please enter all required information');
      setIsSubmitting(false);
      return;
    }

    try {
      const registration = await SublinksApi.Instance().Client().register({
        username: fieldValues.username,
        password: fieldValues.password,
        password_verify: fieldValues.verifyPassword,
        show_nsfw: Boolean(fieldValues.showNsfw),
        email: fieldValues.email
      });

      if (registration.jwt && registration.registration_created) {
        await SublinksApi.Instance().login({ jwt: registration.jwt });
        await saveMyUserFromSite();
        router.push('/');
      } else {
        setErrorMessage('Signup attempt failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (e) {
      logger.error('Signup attempt failed', e);
      setErrorMessage('Signup attempt failed. Please try again.');
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
    <form onSubmit={handleSignupAttempt} onChange={handleFieldValueChange} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <InputField
          type="email"
          label="E-mail Address"
          name={SIGNUP_FIELD_IDS.EMAIL}
          id={SIGNUP_FIELD_IDS.EMAIL}
          placeholder="E-mail Address (optional)"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.EMAIL)}
        />
        <InputField
          type="text"
          label="Username"
          name={SIGNUP_FIELD_IDS.USERNAME}
          id={SIGNUP_FIELD_IDS.USERNAME}
          placeholder="Username"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.USERNAME)}
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
        <Checkbox label="Allow NSFW?" id={SIGNUP_FIELD_IDS.SHOW_NSFW} name={SIGNUP_FIELD_IDS.SHOW_NSFW} />
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
