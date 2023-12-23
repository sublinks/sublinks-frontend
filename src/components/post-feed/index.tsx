import React from 'react';

import { PostView } from 'sublinks-js-client';
import { PostCard } from '../post';
import { H1 } from '../text';

interface PostFeedProps {
  data: PostView[];
  isCommunityFeed?: boolean;
}

const PostFeed = ({ data: posts, isCommunityFeed }: PostFeedProps) => (
  <div className="bg-primary dark:bg-primary-dark flex flex-col gap-8">
    {posts && posts.length > 0 ? posts.map(postData => (
      <div key={postData.post.ap_id}>
        <PostCard
          community={postData.community}
          counts={postData.counts}
          creator={postData.creator}
          post={postData.post}
          showAuthor={isCommunityFeed}
        />
      </div>
    )) : (<H1 className="text-center">No posts available!</H1>)}
  </div>
);

export default PostFeed;
