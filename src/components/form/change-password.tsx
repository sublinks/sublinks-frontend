'use client';

import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

import { InputField } from '@/components/input';
import Button from '@/components/button';
import { BodyTitleInverse, ErrorText, H2 } from '@/components/text';
import SublinksApi from '@/utils/api-client/client';
import logger from '@/utils/logger';

const SIGNUP_FIELD_IDS = {
  CURRENT_PASSWORD: 'currentPassword',
  NEW_PASSWORD: 'newPassword',
  VERIFY_NEW_PASSWORD: 'verifyNewPassword'
};

const REQUIRED_FIELDS = [
  SIGNUP_FIELD_IDS.CURRENT_PASSWORD,
  SIGNUP_FIELD_IDS.NEW_PASSWORD,
  SIGNUP_FIELD_IDS.VERIFY_NEW_PASSWORD
];

const ChangePasswordForm = () => {
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePasswordAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setErroneousFields([]);

    const fieldValues = {
      currentPassword: formData.get(SIGNUP_FIELD_IDS.CURRENT_PASSWORD) as string,
      newPassword: formData.get(SIGNUP_FIELD_IDS.NEW_PASSWORD) as string,
      verifyNewPassword: formData.get(SIGNUP_FIELD_IDS.VERIFY_NEW_PASSWORD) as string
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
      const changePasswordRes = await SublinksApi.Instance().Client().changePassword({
        old_password: fieldValues.currentPassword,
        new_password: fieldValues.newPassword,
        new_password_verify: fieldValues.verifyNewPassword
      });

      if (changePasswordRes.jwt) {
        await SublinksApi.Instance().login({ jwt: changePasswordRes.jwt });
        toast.success('Your new password was saved!');
      } else {
        setErrorMessage('Password change attempt failed. Please try again.');
      }
    } catch (e) {
      logger.error('Password change attempt failed', e);
      setErrorMessage('Password change attempt failed. Please try again.');
    } finally {
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
    <form action={changePasswordAction} onChange={handleFieldValueChange} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <H2 className="text-lg font-semibold border-b-4 border-gray-900 dark:border-gray-100">Change Password</H2>
        <InputField
          type="password"
          label="Current Password"
          name={SIGNUP_FIELD_IDS.CURRENT_PASSWORD}
          id={SIGNUP_FIELD_IDS.CURRENT_PASSWORD}
          placeholder="Current Password"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.CURRENT_PASSWORD)}
        />
        <InputField
          type="password"
          label="New Password"
          name={SIGNUP_FIELD_IDS.NEW_PASSWORD}
          id={SIGNUP_FIELD_IDS.NEW_PASSWORD}
          placeholder="New Password"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.NEW_PASSWORD)}
        />
        <InputField
          type="password"
          label="Verify New Password"
          name={SIGNUP_FIELD_IDS.VERIFY_NEW_PASSWORD}
          id={SIGNUP_FIELD_IDS.VERIFY_NEW_PASSWORD}
          placeholder="Verify New Password"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SIGNUP_FIELD_IDS.VERIFY_NEW_PASSWORD)}
        />
      </div>
      <div aria-live="polite" className="h-32 flex items-center justify-center">
        {errorMessage && <ErrorText className="text-sm">{errorMessage}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="flex justify-center">
        {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
        {isSubmitting ? <Spinner className="h-24 w-24" /> : <BodyTitleInverse>Change Password</BodyTitleInverse>}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
