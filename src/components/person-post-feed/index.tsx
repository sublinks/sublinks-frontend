import { Community, Post, PostAggregates } from 'sublinks-js-client';
import React from 'react';
import { PostCard } from '../post';

interface PersonPostFeedProps {
  data: {
    post: Post;
    counts: PostAggregates;
    community: Community;
  }[]
}

export const PersonPostFeed = ({
  data: postsViews
}: PersonPostFeedProps) => (
  <div className="w-full">
    {postsViews.map(postView => (
      <div key={postView.post.ap_id}>
        <PostCard
          community={postView.community}
          counts={postView.counts}
          post={postView.post}
        />
      </div>
    ))}
  </div>
);
