import React from 'react';
import { notFound } from 'next/navigation';

import PostFeed from '@/components/post-feed';
import { H1 } from '@/components/text';
import sublinksClient from '@/utils/client';
import { getCommunityNameFromSlug } from '@/utils/communities';

interface CommunityFeedProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

const CommunityFeed = async ({ params: { comSlug } }: CommunityFeedProps) => {
  try {
    const communityName = getCommunityNameFromSlug(comSlug);
    const communityData = await sublinksClient().getCommunity({
      name: communityName
    });

    const communityPostsData = await sublinksClient().getPosts({
      community_name: communityName,
      type_: 'All',
      sort: 'Active'
    });
    const { title } = communityData.community_view.community;

    return (
      <div>
        <H1 className="ml-8">{title}</H1>
        <PostFeed data={communityPostsData.posts} isCommunityFeed />
      </div>
    );
  } catch (e) {
    return notFound();
  }
};

export default CommunityFeed;
