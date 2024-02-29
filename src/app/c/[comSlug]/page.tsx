import React from 'react';
import { notFound } from 'next/navigation';

import PostFeed from '@/components/post-feed';
import { ErrorText, H1 } from '@/components/text';
import SublinksApi from '@/utils/api-client/server';
import { getCommunityNameFromSlug } from '@/utils/communities';
import logger from '@/utils/logger';

interface CommunityFeedProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

const getCommunity = async (communityName: string) => {
  try {
    const community = await SublinksApi.Instance().Client().getCommunity({
      name: communityName
    });

    return community;
  } catch (e) {
    logger.error('Failed to retrieve community', e);
    return undefined;
  }
};

const getPosts = async (communityName: string) => {
  try {
    const communityPosts = await SublinksApi.Instance().Client().getPosts({
      community_name: communityName,
      type_: 'All',
      sort: 'Active'
    });

    return communityPosts;
  } catch (e) {
    logger.error('Failed to retrieve community posts', e);
    return undefined;
  }
};

const CommunityFeed = async ({ params: { comSlug } }: CommunityFeedProps) => {
  try {
    const communityName = getCommunityNameFromSlug(comSlug);
    const community = await getCommunity(communityName);
    const communityPosts = await getPosts(communityName);

    if (!community || !communityPosts) {
      return <ErrorText>Unable to show community. Please reload the page to try again.</ErrorText>;
    }

    const { title } = community.community_view.community;

    return (
      <div>
        <H1 className="ml-8">{title}</H1>
        <PostFeed data={communityPosts.posts} isCommunityFeed />
      </div>
    );
  } catch (e) {
    return notFound();
  }
};

export default CommunityFeed;
