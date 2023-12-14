import React from 'react';

import { PersonBio, PersonHeader } from '@/components/person-detail';

import MainCard from '@/components/main-card';
import { ModeratesList, ModeratesProps } from '@/components/moderates-list';
import { PersonDetailSelection } from '@/components/person-comments-posts';
import * as testData from '../../../../test-person-data.json';

const User = () => (
  <div>
    <div className="mb-12">
      <MainCard>
        <div className="flex sm:flex-col md:flex-row">
          <div className="w-full md:w-8/12 relative mr-16">
            <PersonHeader
              avatar={testData.person_view.person.avatar}
              is_admin={testData.person_view.is_admin}
              name={testData.person_view.person.display_name}
              banner={testData.person_view.person.banner}
            />
            <PersonBio bio={testData.person_view.person.bio} />
          </div>
          <div className="mt-8 sm:w-full md:mt-0 md:w-4/12 relative">
            <ModeratesList moderates={testData.moderates as ModeratesProps[]} />
          </div>
        </div>
      </MainCard>
    </div>
    <MainCard>
      <PersonDetailSelection />
    </MainCard>
  </div>
);

export default User;
