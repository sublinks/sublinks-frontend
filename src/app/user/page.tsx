import React from 'react';

import { PersonBio, PersonHeader } from '@/components/person-detail';

import * as testData from '../../../test-person-data.json';
import MainCard from '@/components/main-card';
import { ModeratesList } from '@/components/moderates-list';

const User = () => (
  <MainCard Header={<></>}>
    <div className="w-full flex h-full">
      <div className="w-9/12 relative mr-16">
        <PersonHeader avatar={testData.person_view.person.avatar} is_admin={testData.person_view.is_admin} name={testData.person_view.person.name} banner={testData.person_view.person.banner} />
        <PersonBio bio={testData.person_view.person.bio} />
      </div>
      <div className="w-3/12 relative">
        <ModeratesList moderates={testData.moderates as any} />
      </div>
    </div>
  </MainCard>
);

export default User;
