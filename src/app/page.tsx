import React from 'react';

import PostFeed from '@/components/post-feed';
import sublinksClient from '@/utils/client';

import { PostView } from 'sublinks-js-client';
import * as testData from '../../test-data.json';

const Feed = async () => {
  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  const postsRes = process.env.SUBLINKS_API_BASE_URL ? await sublinksClient().getPosts({
    type_: 'All',
    sort: 'Active'
  }) : testData as unknown as { posts: PostView[] };

  return (
    <div>
      <PostFeed data={postsRes.posts} />
    </div>
  );
};

export default Feed;
