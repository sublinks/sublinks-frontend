import React from 'react';
import { GetPostsResponse, GetSiteResponse } from 'sublinks-js-client';

import Feed from '@/components/front-page-feed';
import SublinksApi from '@/utils/api-client/server';
import logger from '@/utils/logger';
import * as testData from '../../test-data.json';
import * as testInstanceData from '../../test-instance-data.json';

// @todo: Allow test data when in non-docker dev env
// as Sublinks Core doesn't yet handle all post features
const getPosts = async () => {
  try {
    const posts = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    ? await SublinksApi.Instance().Client().getPosts()
    : JSON.stringify(testData) as unknown as GetPostsResponse;

    return posts;
  } catch (e) {
    logger.error('Failed to retrieve posts', e);
    return undefined;
  }
};

// @todo: Allow test data when in non-docker dev env
// as Sublinks Core doesn't yet handle all post features
const getSite = async () => {
  try {
    const site = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
      ? await SublinksApi.Instance().Client().getSite()
      : JSON.parse(JSON.stringify(testInstanceData)) as unknown as GetSiteResponse;

    return site;
  } catch (e) {
    logger.error('Failed to retrieve site', e);
    return undefined;
  }
};

const page = async () => {
  const posts = await getPosts();
  const site = await getSite();

  return (
    <div>
      <Feed posts={posts} site={site} />
    </div>
  );
};

export default page;
