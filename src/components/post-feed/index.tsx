import React from 'react';

import * as testData from '../../../test-data.json';
import { PostCard } from '../post';

const PostFeed = () => (
  <div className="bg-primary dark:bg-primary-dark flex flex-col gap-8">
    {testData.posts.map(postData => (
      <div>
        <PostCard
          community={postData.community}
          counts={postData.counts}
          post={postData.post}
        />
      </div>
    ))}
  </div>
);

export default PostFeed;
