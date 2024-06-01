'use client';

import React, { FormEvent, useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import { SaveUserSettings } from 'sublinks-js-client';

import { Checkbox } from '@/components/input';
import Button from '@/components/button';
import SublinksApi from '@/utils/api-client/client';
import logger from '@/utils/logger';
import { BodyTitleInverse, ErrorText } from '../text';

{ /* <span>{`displayName: ${displayName || name}`}</span>
<span>{`bio: ${bio}`}</span>
<span>{`email: ${email}`}</span>
<span>{`avatar: ${avatar}`}</span>
<span>{`banner: ${banner}`}</span>
<span>{`isBotAccount: ${isBotAccount}`}</span>
<span>{`theme: ${theme}`}</span>
<span>{`sortType: ${sortType}`}</span>
<span>{`listingType: ${listingType}`}</span>
<span>{`showNsfw: ${showNsfw}`}</span>
<span>{`blurNsfw: ${blurNsfw}`}</span>
<span>{`showScores: ${showScores}`}</span>
<span>{`showAvatars: ${showAvatars}`}</span>
<span>{`showBotAccounts: ${showBotAccounts}`}</span>
<span>{`showReadPosts: ${showReadPosts}`}</span>
<span>{`autoExpandMedia: ${autoExpandMedia}`}</span>
<span>{`openInNewTab: ${openInNewTab}`}</span>
<span>{`sendEmailNotifications: ${sendEmailNotifications}`}</span> */ }

const SETTING_FIELD_IDS = {
  SHOW_NSFW: 'showNsfw',
  BLUR_NSFW: 'blurNsfw'
};

const UserSettingsForm = ({ initialUserSettings }: { initialUserSettings: SaveUserSettings; }) => {
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveUserSettingsAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setErroneousFields([]);

    const fieldValues = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };

    try {
      await SublinksApi.Instance().Client().saveUserSettings(fieldValues);
    } catch (e) {
      logger.error('Failed saving user settings', e);
      setErrorMessage('Something went wrong. Please try again.');
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
    <form action={saveUserSettingsAction} onChange={handleFieldValueChange} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <Checkbox
          label="Show NSFW"
          name={SETTING_FIELD_IDS.SHOW_NSFW}
          id={SETTING_FIELD_IDS.SHOW_NSFW}
          initialValue={initialUserSettings.show_nsfw}
        />
        <Checkbox
          label="Blur NSFW"
          name={SETTING_FIELD_IDS.BLUR_NSFW}
          id={SETTING_FIELD_IDS.BLUR_NSFW}
          initialValue={initialUserSettings.blur_nsfw}
        />
      </div>
      <div aria-live="polite" className="h-32 flex items-center justify-center">
        {errorMessage && <ErrorText className="text-sm">{errorMessage}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="flex justify-center">
        {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
        {isSubmitting ? <Spinner className="h-24 w-24" /> : <BodyTitleInverse>Save</BodyTitleInverse>}
      </Button>
    </form>
  );
};

export default UserSettingsForm;
