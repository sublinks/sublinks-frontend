'use client';

import React, { useEffect, useState } from 'react';

import PostFeed from '@/components/post-feed';
import sublinksClient from '@/utils/client';

import { GetPostsResponse, ListingType, PostView, SortType } from 'sublinks-js-client';
import PostFeedOptions from '@/components/post-feed-sort';
import * as testData from '../../test-data.json';

const Feed = () => {
  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  const [postFeed, setPostFeed] = useState<GetPostsResponse>(
    testData as unknown as GetPostsResponse
  );

  // @todo: Set this to the users default feed type
  const [postFeedType, setPostFeedType] = useState<ListingType>();
  const [postFeedSort, setPostFeedSort] = useState<SortType>();

  useEffect(() => {
    async function getPosts() {
      setPostFeed(process.env.SUBLINKS_API_BASE_URL ? await sublinksClient().getPosts({
        type_: postFeedType,
        sort: postFeedSort
      }) : testData as unknown as GetPostsResponse);
    }
    getPosts();
  }, [postFeedSort, postFeedType]);

  return (
    <div>
      <div className="mb-16 ml-4">
        <PostFeedOptions currentType={postFeedType} onSortChange={setPostFeedSort} onTypeChange={setPostFeedType} currentSort={postFeedSort} />
      </div>
      <PostFeed data={postFeed.posts} />
    </div>
  );
};

export default Feed;
