import React from 'react';

import { Community, Post, PostAggregates } from 'sublinks-js-client';
import { PostCard } from '../post';
import { H1 } from '../text';

interface PostFeedProps {
  data: {
    post: Post;
    counts: PostAggregates;
    community: Community;
  }[]
}

const PostFeed = ({ data: posts }: PostFeedProps) => (
  <div className="bg-primary dark:bg-primary-dark flex flex-col gap-8">
    {posts && posts.length > 0 ? posts.map(postData => (
      <div key={postData.post.ap_id}>
        <PostCard
          community={postData.community}
          counts={postData.counts}
          post={postData.post}
        />
      </div>
    )) : (<H1 className="text-center">No posts available!</H1>)}
  </div>
);

export default PostFeed;
