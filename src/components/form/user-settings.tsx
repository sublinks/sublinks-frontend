'use client';

import React, { FormEvent, useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import { SaveUserSettings } from 'sublinks-js-client';

import { Checkbox, InputField, MarkdownTextarea } from '@/components/input';
import Button from '@/components/button';
import SublinksApi from '@/utils/api-client/client';
import logger from '@/utils/logger';
import { BodyTitle, BodyTitleInverse, ErrorText } from '../text';
import { PostFeedSort, PostFeedType } from '../post-feed-sort';

const SETTING_FIELD_IDS = {
  AUTO_EXPAND_MEDIA: 'autoExpandMedia',
  AVATAR: 'avatar',
  BANNER: 'banner',
  BIO: 'bio',
  BLUR_NSFW: 'blurNsfw',
  BOT_ACCOUNT: 'botAccount',
  DEFAULT_LISTING_TYPE: 'listingType',
  DEFAULT_SORT_TYPE: 'sortType',
  DISPLAY_NAME: 'displayName',
  EMAIL: 'email',
  OPEN_IN_NEW_TAB: 'openInNewTab',
  SEND_EMAIL_NOTIFICATIONS: 'sendEmailNotifications',
  SHOW_AVATARS: 'showAvatars',
  SHOW_BOT_ACCOUNTS: 'showBotAccounts',
  SHOW_NSFW: 'showNsfw',
  SHOW_READ_POSTS: 'showReadPosts',
  SHOW_SCORES: 'showScores',
  THEME: 'theme'
};

const UserSettingsForm = ({ initialUserSettings }: { initialUserSettings: SaveUserSettings; }) => {
  const [listingType, setListingType] = useState(initialUserSettings.default_listing_type);
  const [sortType, setSortType] = useState(initialUserSettings.default_sort_type);
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveUserSettingsAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setErroneousFields([]);

    const fieldValues: SaveUserSettings = {
      blur_nsfw: formData.get(SETTING_FIELD_IDS.BLUR_NSFW) === 'true',
      show_nsfw: formData.get(SETTING_FIELD_IDS.SHOW_NSFW) === 'true'
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
    <form action={saveUserSettingsAction} onChange={handleFieldValueChange} className="flex flex-col py-24 md:py-32 max-w-500">
      <div className="flex flex-col gap-16">
        <Checkbox
          label="This Is A Bot Account"
          name={SETTING_FIELD_IDS.BOT_ACCOUNT}
          id={SETTING_FIELD_IDS.BOT_ACCOUNT}
          initialValue={initialUserSettings.bot_account}
        />
        <InputField
          type="text"
          label="Display Name"
          name={SETTING_FIELD_IDS.DISPLAY_NAME}
          id={SETTING_FIELD_IDS.DISPLAY_NAME}
          placeholder="Display Name"
          showBorderPlaceholder
          disabled={isSubmitting}
        />
        <InputField
          type="file"
          label="Avatar"
          name={SETTING_FIELD_IDS.AVATAR}
          id={SETTING_FIELD_IDS.AVATAR}
          placeholder="Avatar"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SETTING_FIELD_IDS.AVATAR)}
        />
        <InputField
          type="file"
          label="Banner"
          name={SETTING_FIELD_IDS.BANNER}
          id={SETTING_FIELD_IDS.BANNER}
          placeholder="Banner"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(SETTING_FIELD_IDS.BANNER)}
        />
        <MarkdownTextarea id={SETTING_FIELD_IDS.BIO} label="Bio" initialValue="**Bio**" />
        <div>
          <BodyTitle>Default Post Feed Type</BodyTitle>
          <PostFeedType
            currentType={listingType}
            onTypeChange={type => setListingType(type)}
          />
        </div>
        <div className="flex flex-col">
          <BodyTitle>Default Post Feed Sort</BodyTitle>
          <PostFeedSort
            currentSort={sortType}
            onSortChange={sort => setSortType(sort)}
          />
        </div>
        <Checkbox
          label="Blur NSFW"
          name={SETTING_FIELD_IDS.BLUR_NSFW}
          id={SETTING_FIELD_IDS.BLUR_NSFW}
          initialValue={initialUserSettings.blur_nsfw}
        />
        <Checkbox
          label="Show NSFW"
          name={SETTING_FIELD_IDS.SHOW_NSFW}
          id={SETTING_FIELD_IDS.SHOW_NSFW}
          initialValue={initialUserSettings.show_nsfw}
        />
        <Checkbox
          label="Show Avatars"
          name={SETTING_FIELD_IDS.SHOW_AVATARS}
          id={SETTING_FIELD_IDS.SHOW_AVATARS}
          initialValue={initialUserSettings.show_avatars}
        />
        <Checkbox
          label="Show Bot Accounts"
          name={SETTING_FIELD_IDS.SHOW_BOT_ACCOUNTS}
          id={SETTING_FIELD_IDS.SHOW_BOT_ACCOUNTS}
          initialValue={initialUserSettings.show_bot_accounts}
        />
        <Checkbox
          label="Show Read Posts"
          name={SETTING_FIELD_IDS.SHOW_READ_POSTS}
          id={SETTING_FIELD_IDS.SHOW_READ_POSTS}
          initialValue={initialUserSettings.show_read_posts}
        />
        <Checkbox
          label="Show Scores"
          name={SETTING_FIELD_IDS.SHOW_SCORES}
          id={SETTING_FIELD_IDS.SHOW_SCORES}
          initialValue={initialUserSettings.show_scores}
        />
        <Checkbox
          label="Auto Expand Media"
          name={SETTING_FIELD_IDS.AUTO_EXPAND_MEDIA}
          id={SETTING_FIELD_IDS.AUTO_EXPAND_MEDIA}
          initialValue={initialUserSettings.auto_expand}
        />
        <Checkbox
          label="Open Links In New Tab"
          name={SETTING_FIELD_IDS.OPEN_IN_NEW_TAB}
          id={SETTING_FIELD_IDS.OPEN_IN_NEW_TAB}
          initialValue={initialUserSettings.open_links_in_new_tab}
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
