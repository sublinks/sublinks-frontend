'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { InputField } from '@/components/input';
import Button from '@/components/button';
import SublinksApi from '@/utils/api-client/client';
import logger from '@/utils/logger';
import { Spinner } from '@material-tailwind/react';
import { BodyTitleInverse, ErrorText } from '../text';

const INPUT_IDS = {
  NAME: 'name',
  TITLE: 'title',
  DESCRIPTION: 'description',
  NSFW: 'nsfw',
  MODS_ONLY: 'mods-only'
};

const CommunityForm = () => {
  const router = useRouter();
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreationAttempt = async (event: FormEvent<HTMLFormElement>) => {
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
      // await SublinksApi.Instance().login(fieldValues.username, fieldValues.password);
      // router.push('/');
    } catch (e) {
      logger.error('Community creation attempt failed', e);
      setErrorMessage('Could not create community. Please try again.');
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
    <form onSubmit={handleCreationAttempt} onChange={handleFieldValueChange} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <InputField
          type="text"
          label="Name"
          name={INPUT_IDS.NAME}
          id={INPUT_IDS.NAME}
          placeholder="Name"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(INPUT_IDS.NAME)}
        />
        <InputField
          type="text"
          label="Title"
          name={INPUT_IDS.TITLE}
          id={INPUT_IDS.TITLE}
          placeholder="Title"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(INPUT_IDS.TITLE)}
        />
      </div>
      <div aria-live="polite" className="h-32">
        {errorMessage && <ErrorText className="text-sm">{errorMessage}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="flex justify-center">
        {isSubmitting ? <Spinner className="h-24 w-24" /> : <BodyTitleInverse>Create Community</BodyTitleInverse>}
      </Button>
    </form>
  );
};

export default CommunityForm;
