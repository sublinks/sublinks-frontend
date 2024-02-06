import React from 'react';
import { GetPostsResponse, GetSiteResponse } from 'sublinks-js-client';

import SublinksApi from '@/utils/api-client/server';
import Feed from '@/components/front-page-feed';
import * as testData from '../../test-data.json';
import * as testInstanceData from '../../test-instance-data.json';

const page = async () => {
  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  const posts = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    ? await SublinksApi.Instance().Client().getPosts()
    : JSON.stringify(testData) as unknown as GetPostsResponse;

  const siteResponse = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    ? await SublinksApi.Instance().Client().getSite()
    : JSON.parse(JSON.stringify(testInstanceData)) as unknown as GetSiteResponse;

  return (
    <div>
      <Feed posts={posts} site={siteResponse} />
    </div>
  );
};

export default page;
