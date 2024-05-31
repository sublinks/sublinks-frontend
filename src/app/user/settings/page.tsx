import React from 'react';
import { CommentView, PostView } from 'sublinks-js-client';

import RestrictedPage from '@/components/auth/restricted-page';
import { PersonBio, PersonHeader } from '@/components/person-detail';
import MainCard from '@/components/main-card';
import { ModeratesList, ModeratesProps } from '@/components/moderates-list';
import { PersonDetailSelection } from '@/components/person-comments-posts';
import { ErrorText } from '@/components/text';
import SublinksApi from '@/utils/api-client/server';
import logger from '@/utils/logger';

const getUser = async () => {
  try {
    const site = await SublinksApi.Instance().Client().getSite();
    const username = site.my_user?.local_user_view.person.name;
    const user = await SublinksApi.Instance().Client().getPersonDetails({
      username
    });

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
    person: {
      avatar, banner, bio, display_name: displayName, name
    }, is_admin: isAdmin
  } = userData.person_view;
  const { posts, comments, moderates } = userData;

  return (
    <div>
      <div className="mb-12">
        SETTINGS
        <MainCard>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-8/12 mr-16 relative">
              <PersonHeader
                avatar={avatar}
                is_admin={isAdmin}
                name={displayName || name}
                banner={banner}
              />
              {bio && <PersonBio bio={bio} />}
            </div>
            {moderates?.length > 0 && (
            <div className="w-full md:mt-0 md:w-4/12 mt-8 relative">
              <ModeratesList moderates={moderates as ModeratesProps[]} />
            </div>
            )}
          </div>
        </MainCard>
      </div>
      <MainCard>
        <PersonDetailSelection
          postViews={posts as PostView[]}
          commentViews={comments as CommentView[]}
        />
      </MainCard>
    </div>
  );
};

export default () => RestrictedPage(<UserSettings />);
