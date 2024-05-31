import React from 'react';

import RestrictedPage from '@/components/auth/restricted-page';
import MainCard from '@/components/main-card';
import { ErrorText, H1 } from '@/components/text';
import SublinksApi from '@/utils/api-client/server';
import logger from '@/utils/logger';

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

  const {
    local_user: {
      email,
      theme,
      default_sort_type: sortType,
      default_listing_type: listingType,
      show_nsfw: showNsfw,
      blur_nsfw: blurNsfw,
      auto_expand: autoExpandMedia,
      show_scores: showScores,
      show_avatars: showAvatars,
      show_read_posts: showReadPosts,
      show_bot_accounts: showBotAccounts,
      send_notifications_to_email: sendEmailNotifications,
      open_links_in_new_tab: openInNewTab
    },
    person: {
      avatar, banner, bio, display_name: displayName, name, bot_account: isBotAccount
    }
  } = userData;
  console.log(userData);

  return (
    <div className="flex flex-col gap-32 my-24 md:my-32">
      <MainCard Header={<H1>SETTINGS</H1>}>
        <span>{`displayName: ${displayName || name}`}</span>
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
        <span>{`sendEmailNotifications: ${sendEmailNotifications}`}</span>
      </MainCard>
    </div>
  );
};

export default () => RestrictedPage(<UserSettings />);
