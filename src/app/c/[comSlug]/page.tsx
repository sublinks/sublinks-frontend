import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import MainCard from '@/components/main-card';
import PostFeed from '@/components/post-feed';
import { ErrorText, H1 } from '@/components/text';
import SublinksApi from '@/utils/api-client/server';
import { getCommunityNameFromSlug } from '@/utils/communities';
import logger from '@/utils/logger';

interface CommunityHeaderProps {
  banner?: string;
  icon?: string;
  title: string;
}

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

const CommunityHeader = ({ banner, icon, title }: CommunityHeaderProps) => (
  <div className="w-full flex flex-col gap-12">
    {banner && (
    <div className="h-240">
      <Image
        alt="Community banner"
        src={banner.replace('localhost', 'api:8080')} // https://github.com/sublinks/sublinks-api/issues/357
        height={0}
        width={0}
        sizes="100vw"
        style={{
          width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px'
        }}
      />
    </div>
    )}
    {icon
        && (
          <>
            <div className="max-md:hidden">
              <Image
                alt="Community icon"
                src={icon.replace('localhost', 'api:8080')} // https://github.com/sublinks/sublinks-api/issues/357
                height={120}
                width={120}
              />
            </div>
            <div className="md:hidden">
              <Image
                alt="Community icon"
                src={icon.replace('localhost', 'api:8080')} // https://github.com/sublinks/sublinks-api/issues/357
                height={60}
                width={60}
              />
            </div>
          </>
        )}
    <H1>{title}</H1>
  </div>
);

const CommunityFeed = async ({ params: { comSlug } }: CommunityFeedProps) => {
  try {
    const communityName = getCommunityNameFromSlug(comSlug);
    const community = await getCommunity(communityName);
    const communityPosts = await getPosts(communityName);

    if (!community || !communityPosts) {
      return <ErrorText>Unable to show community. Please reload the page to try again.</ErrorText>;
    }

    const { banner, icon, title } = community.community_view.community;
    const Header = <CommunityHeader banner={banner} icon={icon} title={title} />;

    return (
      <div className="flex flex-col gap-32 my-24 md:my-32">
        <MainCard Header={Header} />
        <div className="flex flex-col px-12 md:px-40">
          <PostFeed data={communityPosts.posts} isCommunityFeed />
        </div>
      </div>

    );
  } catch (e) {
    return notFound();
  }
};

export default CommunityFeed;
