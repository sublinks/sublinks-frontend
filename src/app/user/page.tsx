import React from 'react';

import { PersonBio, PersonHeader } from '@/components/person-detail';

import * as testData from '../../../test-person-data.json';
import MainCard from '@/components/main-card';
import { ModeratesList, ModeratesProps } from '@/components/moderates-list';
import { PersonDetailSelection } from '@/components/person-comments-posts';

const User = () => (
  <div>
  <div className="mb-12">
  <MainCard>
    <div className="flex">
      <div className="w-8/12 lg:w-9/12 relative mr-16">
        <PersonHeader avatar={testData.person_view.person.avatar} is_admin={testData.person_view.is_admin} name={testData.person_view.person.display_name} banner={testData.person_view.person.banner} />
        <PersonBio bio={testData.person_view.person.bio} />
      </div>
      <div className="w-4/12 lg:w-3/12 relative">
        <ModeratesList moderates={testData.moderates as ModeratesProps[]} />
      </div>
    </div>
  </MainCard>
  </div>
  <MainCard>
    <PersonDetailSelection posts={testData.posts as any} comments={testData.comments as any} />
  </MainCard>
  </div>
  );

export default User;
