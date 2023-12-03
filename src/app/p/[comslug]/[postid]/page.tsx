'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import MainCard from '@/components/main-card';
import PostVotes from '@/components/post-votes';
import { H1, PaleBodyText, PaleLinkText } from '@/components/text';
import { isImage } from '@/utils/links';
import PostThumbnail from '@/components/post-thumbnail';
import Image from 'next/image';
import * as testData from '../../../../../test-data.json';

interface PostSubTitleProps {
  authorUrl: string;
  authorName: string;
  communityUrl: string;
  community: string;
}

interface PostViewProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

const PostSubTitle = ({
  authorUrl, authorName, communityUrl, community
}: PostSubTitleProps) => (
  <div className="text-xs">
    <PaleBodyText>Posted by</PaleBodyText>
    {' '}
    <Link href={authorUrl} target="_blank" rel="noopener noreferrer">
      <PaleLinkText>{authorName}</PaleLinkText>
    </Link>
    {' '}
    <PaleBodyText>to</PaleBodyText>
    {' '}
    <Link href={communityUrl} target="_blank" rel="noopener noreferrer">
      <PaleLinkText>{community}</PaleLinkText>
    </Link>
  </div>
);

const PostView = ({ params: { comSlug, postId } }: PostViewProps) => {
  const post = testData.posts.find(p => p.post.id === parseInt(postId, 10));
  const readableSlug = decodeURIComponent(comSlug);
  const [showOriginalImage, setShowOriginalImage] = useState(false);

  if (!post) {
    return null;
  }

  const {
    body, name: postName, url: postUrl, thumbnail_url: thumbnailUrl
  } = post.post;
  const { name: authorName, actor_id: authorUrl } = post.creator;
  const { actor_id: communityUrl } = post.community;
  const { score } = post.counts;
  const postHasImage = postUrl ? isImage(postUrl) : false;

  if (postHasImage && !body && !showOriginalImage) {
    setShowOriginalImage(true);
  }

  const SubTitle = (
    <PostSubTitle
      authorName={authorName}
      authorUrl={authorUrl}
      community={readableSlug}
      communityUrl={communityUrl}
    />
  );
  // TODO: Break out into client component
  const Header = (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div className="flex gap-8">
          <PostVotes points={score} />
          <button
            type="button"
            aria-label="Post thumbnail"
            className={cx('h-80 w-80 relative', {
              'cursor-default': !postUrl || !body
            })}
            onClick={() => setShowOriginalImage(postHasImage && !showOriginalImage)}
          >
            <PostThumbnail postThumbnailUrl={thumbnailUrl} />
          </button>
          <div className="flex flex-col">
            <H1>{postName}</H1>
            {SubTitle}
          </div>
        </div>
        {showOriginalImage && (
        <div className="flex items-center h-500 w-full relative">
          <Image alt="Post image" src={postUrl!} fill style={{ objectFit: 'contain' }} />
        </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <MainCard Header={Header} body={body} />
    </div>
  );
};

export default PostView;
