'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';

import { H1 } from '../text';
import PostThumbnail from '../post-thumbnail';
import VoteButtons from '../vote-buttons';

interface PostHeaderProps {
  points: number;
  title: string;
  SubTitle: React.JSX.Element;
  postUrl?: string;
  thumbnailUrl?: string;
  hasBody: boolean;
  hasImage: boolean;
}

const PostHeader = ({
  points, title, SubTitle, postUrl, thumbnailUrl, hasBody, hasImage
}: PostHeaderProps) => {
  const [showOriginalImage, setShowOriginalImage] = useState(hasImage && !hasBody);

  let thumbnailLabel = "Go to post's URL";
  if (hasImage) {
    thumbnailLabel = showOriginalImage ? 'Hide full-size image' : 'Show full-size image';
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-8">
        <div className="flex items-start gap-8">
          <VoteButtons points={points} onVote={() => {}} />
          <button
            type="button"
            aria-hidden={!hasImage}
            aria-label={thumbnailLabel}
            className={cx('h-80 w-80 relative', {
              'cursor-default': !postUrl || !hasBody
            })}
            onClick={() => {
              // Don't allow hiding image if post has no other content
              if (hasImage && hasBody) {
                setShowOriginalImage(hasImage && !showOriginalImage);
              } else if (!hasImage && postUrl) {
                window.open(postUrl, '_blank', 'noopener noreferrer');
              }
            }}
          >
            <PostThumbnail postThumbnailUrl={thumbnailUrl} />
          </button>
        </div>
        <div className="flex flex-col">
          {postUrl ? (
            <Link href={postUrl} target="_blank" rel="noopener noreferrer">
              <H1 className="hover:text-brand dark:hover:text-brand-dark">{title}</H1>
            </Link>
          ) : <H1>{title}</H1>}
          {SubTitle}
        </div>
      </div>
      {showOriginalImage && (
        <div className="flex items-center h-500 w-full relative">
          <Link href={postUrl!} target="_blank" rel="noopener noreferrer">
            <Image alt="Post image" src={postUrl!} fill style={{ objectFit: 'contain' }} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
