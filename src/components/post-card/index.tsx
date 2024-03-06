'use client';

import React from 'react';
import Link from 'next/link';

import { getCommunitySlugFromUrl } from '@/utils/communities';
import {
  Post, Community, PostAggregates, Person
} from 'sublinks-js-client';
import { extractDomain, getPostThumbnailUrl } from '@/utils/links';
import { BodyText, BodyTitle } from '../text';
import PostThumbnail from '../post-thumbnail';
import LinkedPostSubTitle from '../post-subtitle';
import VoteButtons from '../vote-buttons';
import { ArrowUturnLeftIcon, ChatBubbleLeftIcon, ChatBubbleLeftRightIcon, MinusIcon } from '@heroicons/react/24/outline';
import PersonChip from '../person-chip';
import CommunityChip from '../community-chip';
import Popover, { PopoverGapSize } from '../popover';
import Image from 'next/image';

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
  counts
}: PostCardProps) => {
  const [myVote, setMyVote] = React.useState(0);

  const { id, body, name: title, url } = post;
  const { display_name: authorDisplayName, name: authorName, avatar } = creator;
  const { actor_id: nativeCommunityUrl, local: isLocal, name: communityName, icon } = community;
  const { score, comments } = counts;
  const communitySlug = getCommunitySlugFromUrl(nativeCommunityUrl, isLocal);
  const postHref = `/c/${communitySlug}/${id}`;
  const thumbnailUrl = getPostThumbnailUrl(post);
  const linkDomain = url ? extractDomain(url) : null;

  /*
 border-white border-opacity-10 border-1 border
  */
  return (
    <div key={id} className='flex bg-[#1d2432] p-16 rounded-xl'>
      <div className='flex gap-8'>
        <VoteButtons points={score} onVote={(score) => {setMyVote(score)}} myVote={myVote} />
        {thumbnailUrl ? (<Popover gap={PopoverGapSize.NONE} openDelay={500} closeDelay={300} darkenBackground={true} direction='bottom' content={<Image src={thumbnailUrl} alt='Image' width={640} height={640} className='max-w-480 h-auto' />}>
          <PostThumbnail postThumbnailUrl={thumbnailUrl} linkPost={url ? true : false} />
        </Popover>) : <PostThumbnail postThumbnailUrl={thumbnailUrl} linkPost={url ? true : false} />}
        <div className='flex flex-col justify-center gap-4'>
          <Link href={postHref} className="group">
            <BodyTitle
              className="text-sm font-semibold line-clamp-2 transition-all duration-300 group-hover:text-brand dark:group-hover:text-brand-dark group-visited:text-gray-500 group-visited:dark:text-gray-400"
            >
              {title}

            </BodyTitle>
          </Link>
          {url && (
            <div className='self-start text-xs text-blue-600 -mt-4'>
              <Popover direction='bottom' content={url} gap={PopoverGapSize.NONE} openDelay={500} closeDelay={300} darkenBackground={true}>
                <Link href={postHref}>
                  {linkDomain}
                </Link>
              </Popover>
            </div>
          )}
          <div className='flex gap-4 items-center'>
            <PersonChip person={creator} />
            <p className='text-white text-xs'>to</p>
            <CommunityChip community={community} />
          </div>
          <div className='flex gap-8 items-center text-slate-400 text-xs'>
            <Popover direction='bottom' content='Minimize'>
              <MinusIcon className='w-12 h-12' />
            </Popover>
            <Popover direction='bottom' content='Comments'>
              <div className='flex gap-4 items-center'>
                <ChatBubbleLeftIcon className='w-12 h-12' />
                <p>{comments}</p>
              </div>
            </Popover>
            <Popover direction='bottom' content='Cross Posts'>
              <div className='flex gap-4 items-center'>
                <ArrowUturnLeftIcon className='w-12 h-12' />
                <p>0</p>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
};

/*
<VoteButtons points={score} onVote={() => {}} myVote={0} />
      <PostThumbnail postThumbnailUrl={thumbnailUrl} />
*/
/*
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
*/