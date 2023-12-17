import React from 'react';

import PostFeed from '@/components/post-feed';
import sublinksClient from '@/utils/client';

const Feed = async () => {
  const postsRes = await sublinksClient().getPosts({
    type_: 'All',
    sort: 'Active'
  });

  return (
    <div>
      <PostFeed data={postsRes.posts} />
    </div>
  );
};

export default Feed;
