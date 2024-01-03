'use client';

import React from 'react';
import Link from 'next/link';

import { getCommunitySlugFromUrl } from '@/utils/communities';
import {
  Post, Community, PostAggregates, Person
} from 'sublinks-js-client';
import { getPostThumbnailUrl } from '@/utils/links';
import { BodyText, BodyTitle } from '../text';
import PostThumbnail from '../post-thumbnail';
import LinkedPostSubTitle from '../post-subtitle';
import VoteButtons from '../button-votes';

interface PostCardProps {
  post: Post;
  creator: Person;
  community: Community;
  counts: PostAggregates;
  showAuthor?: boolean;
}

export const PostCard = ({
  post,
  creator,
  community,
  counts,
  showAuthor
}: PostCardProps) => {
  const { id, body, name: title } = post;
  const { display_name: authorDisplayName, name: authorName } = creator;
  const { actor_id: nativeCommunityUrl, local: isLocal } = community;
  const { score } = counts;
  const thumbnailUrl = getPostThumbnailUrl(post);
  const communitySlug = getCommunitySlugFromUrl(nativeCommunityUrl, isLocal);

  // @todo: Make our own URLs until Sublinks API connects URLs to all entities
  const postHref = `/c/${communitySlug}/${id}`;
  const authorUrl = `/user/${authorName}`;
  const communityUrl = `/c/${communitySlug}`;
  // @todo: Add real "myVote"
  return (
    <div key={id}>
      <div className="flex">
        <div className="flex items-center ml-8">
          <VoteButtons points={score} onVote={() => {}} myVote={0} />
        </div>
        <div className="w-full">
          <div className="flex h-100 relative">
            <div className="h-full flex gap-12 px-12 py-6 items-start">
              <div className="h-80 w-80 mt-8 flex flex-shrink-0 relative">
                <PostThumbnail postThumbnailUrl={thumbnailUrl} />
              </div>
              <div className="h-full w-full flex">
                <div className="h-full flex flex-col">
                  <Link href={postHref} className="group">
                    <BodyTitle
                      className="text-sm font-semibold line-clamp-2 group-hover:text-brand dark:group-hover:text-brand-dark group-visited:text-gray-500 group-visited:dark:text-gray-400"
                    >
                      {title}

                    </BodyTitle>
                  </Link>
                  <div className="mb-8 flex max-md:flex-col">
                    <LinkedPostSubTitle
                      label={showAuthor ? 'Posted by' : 'Posted to'}
                      linkText={showAuthor ? authorDisplayName || authorName : `c/${communitySlug}`}
                      url={showAuthor ? authorUrl : communityUrl}
                    />
                  </div>
                  {body && <BodyText className="text-xs max-md:hidden line-clamp-2 group-visited:text-gray-500 group-visited:dark:text-gray-400">{body}</BodyText>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-secondary dark:border-secondary-dark" />
    </div>
  );
};
