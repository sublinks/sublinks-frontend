import React from 'react';

import sublinksClient from '@/utils/client';

import { GetPostsResponse, GetSiteResponse } from 'sublinks-js-client';
import Feed from '@/components/front-page-feed';
import * as testData from '../../test-data.json';
import * as testSiteData from '../../test-site-data.json';

const page = async () => {
  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  const posts = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL ? await sublinksClient().getPosts()
    : JSON.stringify(testData) as unknown as GetPostsResponse;

  const siteResponse = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    ? await sublinksClient().getSite()
    : JSON.parse(JSON.stringify(testSiteData)) as unknown as GetSiteResponse;

  return (
    <div>
      <Feed posts={posts} site={siteResponse} />
    </div>
  );
};

export default page;
