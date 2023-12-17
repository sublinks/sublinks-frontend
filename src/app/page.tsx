import React from 'react';

import PostFeed from '@/components/post-feed';
import * as testData from '../../test-data.json';

const Feed = () => (
  <div>
    <PostFeed data={testData.posts} />
  </div>
);

export default Feed;
