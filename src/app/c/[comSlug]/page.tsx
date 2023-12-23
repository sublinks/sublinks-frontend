import React from 'react';

import PostFeed from '@/components/post-feed';
import sublinksClient from '@/utils/client';
import { getCommunityNameFromSlug } from '@/utils/communities';

interface CommunityFeedProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

const CommunityFeed = async ({ params: { comSlug } }: CommunityFeedProps) => {
  const communityName = getCommunityNameFromSlug(comSlug);
  const postsRes = await sublinksClient().getPosts({
    community_name: communityName,
    type_: 'All',
    sort: 'Active'
  });

  return (
    <div>
      <PostFeed data={postsRes.posts} isCommunityFeed />
    </div>
  );
};

export default CommunityFeed;
