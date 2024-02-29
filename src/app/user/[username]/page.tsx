import React from 'react';
import { CommentView, PostView } from 'sublinks-js-client';

import { PersonBio, PersonHeader } from '@/components/person-detail';
import MainCard from '@/components/main-card';
import { ModeratesList, ModeratesProps } from '@/components/moderates-list';
import { PersonDetailSelection } from '@/components/person-comments-posts';
import { ErrorText } from '@/components/text';
import SublinksApi from '@/utils/api-client/server';
import logger from '@/utils/logger';

import * as testData from '../../../../test-person-data.json';

interface UserViewProps {
  params: {
    username: string;
  }
}

// @todo: Allow test data when in non-docker dev env
// as Sublinks Core doesn't yet handle all user properties
const getUser = async (username: string) => {
  try {
    const user = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
      ? await SublinksApi.Instance().Client().getPersonDetails({
        username
      }) : testData;

    return user;
  } catch (e) {
    logger.error('Failed to retrieve user', e);
    return undefined;
  }
};

const User = async ({ params: { username } }: UserViewProps) => {
  const userData = await getUser(username);

  if (!userData) {
    return <ErrorText>Unable to show user information. Please reload the page to try again.</ErrorText>;
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

export default User;
