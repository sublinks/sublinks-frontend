import React from 'react';

import { PersonBio, PersonHeader } from '@/components/person-detail';

import MainCard from '@/components/main-card';
import { ModeratesList, ModeratesProps } from '@/components/moderates-list';
import { PersonDetailSelection } from '@/components/person-comments-posts';
import sublinksClient from '@/utils/client';

interface UserViewProps {
  params: {
    username: string;
  }
}

const User = async ({ params: { username } }: UserViewProps) => {
  const userData = await sublinksClient().getPersonDetails({
    username
  });
  const {
    person: {
      avatar, banner, bio, display_name: displayName, name
    }, is_admin: isAdmin
  } = userData.person_view;
  const { moderates } = userData;

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
        <PersonDetailSelection />
      </MainCard>
    </div>
  );
};

export default User;
