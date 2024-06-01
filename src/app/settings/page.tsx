import React from 'react';

import RestrictedPage from '@/components/auth/restricted-page';
import MainCard from '@/components/main-card';
import { ErrorText, H1 } from '@/components/text';
import SublinksApi from '@/utils/api-client/server';
import logger from '@/utils/logger';
import UserSettingsForm from '@/components/form/user-settings';

const getUser = async () => {
  try {
    const site = await SublinksApi.Instance().Client().getSite();
    const user = site.my_user?.local_user_view;

    return user;
  } catch (e) {
    logger.error('Failed to retrieve user', e);
    return undefined;
  }
};

const UserSettings = async () => {
  const userData = await getUser();
  console.log(userData);

  if (!userData) {
    return (
      <ErrorText>
        Unable to show user settings. Please reload the page to try again.
      </ErrorText>
    );
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  const {
    local_user: {
      email,
      theme,
      default_sort_type,
      default_listing_type,
      show_nsfw,
      blur_nsfw,
      auto_expand,
      show_scores,
      show_avatars,
      show_read_posts,
      show_bot_accounts,
      send_notifications_to_email,
      open_links_in_new_tab
    },
    person: {
      avatar, banner, bio, display_name, name, bot_account
    }
  } = userData;
  /* eslint-enable @typescript-eslint/naming-convention */

  const userSettings = {
    avatar,
    banner,
    bio,
    display_name,
    name,
    bot_account,
    email,
    theme,
    default_sort_type,
    default_listing_type,
    show_nsfw,
    blur_nsfw,
    show_avatars,
    show_bot_accounts,
    auto_expand,
    show_scores,
    show_read_posts,
    send_notifications_to_email,
    open_links_in_new_tab
  };

  return (
    <div className="flex flex-col gap-32 my-24 md:my-32">
      <MainCard Header={<H1>SETTINGS</H1>}>
        <UserSettingsForm initialUserSettings={userSettings} />
      </MainCard>
    </div>
  );
};

export default () => RestrictedPage(<UserSettings />);
