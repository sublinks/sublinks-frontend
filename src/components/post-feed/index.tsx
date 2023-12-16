import React from 'react';

import sublinksClient from '@/utils/client';
import { PostCard } from '../post';

const PostFeed = async () => {
  const posts = await sublinksClient().getPosts({
    type_: 'All',
    sort: 'Active'
  });

  return (
    <div className="bg-primary dark:bg-primary-dark flex flex-col gap-8">
      {posts.posts.map(postData => (
        <PostCard
          key={postData.post.id}
          community={postData.community}
          counts={postData.counts}
          post={postData.post}
        />
      ))}
    </div>
  );
};

export default PostFeed;
