import React from 'react';

import { H1 } from '@/components/text';
import CommunityForm from '@/components/form/community';

const Communities = () => (
  <div className="flex flex-col items-center p-24 md:p-56 w-full">
    <div className="w-full md:w-500 overflow-x-hidden">
      <H1>Create a New Community</H1>
      <div className="mt-32">
        <CommunityForm />
      </div>
    </div>
  </div>
);

export default Communities;
