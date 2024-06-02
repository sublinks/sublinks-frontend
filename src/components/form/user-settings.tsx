'use client';

import React, { useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import { SaveUserSettings } from 'sublinks-js-client';

import { Checkbox, InputField, MarkdownTextarea } from '@/components/input';
import Button from '@/components/button';
import { BodyTitle, BodyTitleInverse } from '@/components/text';
import { PostFeedSort, PostFeedType } from '@/components/post-feed-sort';
import { Selector } from '@/components/input/select';
import SublinksApi from '@/utils/api-client/client';
import logger from '@/utils/logger';
import { toast } from 'react-toastify';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveUserSettingsAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setErroneousFields([]);

    const fieldValues: SaveUserSettings = {
      auto_expand: Boolean(formData.get(SETTING_FIELD_IDS.AUTO_EXPAND_MEDIA)),
      // @todo avatar
      // @todo banner
      // bio: formData.get(SETTING_FIELD_IDS.BIO) as string,
      blur_nsfw: Boolean(formData.get(SETTING_FIELD_IDS.BLUR_NSFW)),
      bot_account: Boolean(formData.get(SETTING_FIELD_IDS.BOT_ACCOUNT)),
      // @todo default_listing_type
      // @todo default_sort_type
      // display_name: formData.get(SETTING_FIELD_IDS.DISPLAY_NAME) as string,
      // email: formData.get(SETTING_FIELD_IDS.EMAIL) as string,
      open_links_in_new_tab: Boolean(formData.get(SETTING_FIELD_IDS.OPEN_IN_NEW_TAB)),
      send_notifications_to_email:
        Boolean(formData.get(SETTING_FIELD_IDS.SEND_EMAIL_NOTIFICATIONS)),
      show_avatars: Boolean(formData.get(SETTING_FIELD_IDS.SHOW_AVATARS)),
      show_bot_accounts: Boolean(formData.get(SETTING_FIELD_IDS.SHOW_BOT_ACCOUNTS)),
      show_nsfw: Boolean(formData.get(SETTING_FIELD_IDS.SHOW_NSFW)),
      show_read_posts: Boolean(formData.get(SETTING_FIELD_IDS.SHOW_READ_POSTS)),
      show_scores: Boolean(formData.get(SETTING_FIELD_IDS.SHOW_SCORES)),
      theme: formData.get(SETTING_FIELD_IDS.THEME) as string
    };

    try {
      await SublinksApi.Instance().Client().saveUserSettings(fieldValues);
      toast.success('Your settings were saved successfully!');
    } catch (e) {
      logger.error('Failed saving user settings', e);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // @TODO Bring in available instance themes
  const themeOptions = [
    {
      label: 'Dark',
      value: 'dark'
    },
    {
      label: 'Light',
      value: 'light'
    }
  ];

  return (
    <form action={saveUserSettingsAction} className="flex flex-col mt-12 md:mt-24 max-w-500">
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
        <Selector
          id={SETTING_FIELD_IDS.THEME}
          label="Theme"
          options={themeOptions}
          placeholder={{
            value: undefined,
            label: 'Select Default Theme'
          }}
          disabled={isSubmitting}
        />
        <div className="flex flex-col">
          <BodyTitle>Default Post Feed Sort</BodyTitle>
          <div className="h-32">
            <PostFeedSort
              currentSort={sortType}
              onSortChange={sort => setSortType(sort)}
            />
          </div>
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
        <Button type="submit" disabled={isSubmitting} className="flex justify-center">
          {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
          {isSubmitting ? <Spinner className="h-24 w-24" /> : <BodyTitleInverse>Save</BodyTitleInverse>}
        </Button>
      </div>
    </form>
  );
};

export default UserSettingsForm;
