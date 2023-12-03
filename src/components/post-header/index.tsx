'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';

import PostVotes from '../post-votes';
import { H1 } from '../text';
import PostThumbnail from '../post-thumbnail';

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
  const [showOriginalImage, setShowOriginalImage] = useState(false);

  if (hasImage && !hasBody && !showOriginalImage) {
    setShowOriginalImage(true);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div className="flex gap-8">
          <div className="flex items-start gap-8">
            <PostVotes points={points} />
            <button
              type="button"
              aria-label="Post thumbnail"
              className={cx('h-80 w-80 relative', {
                'cursor-default': !postUrl || !hasBody
              })}
              onClick={() => setShowOriginalImage(hasImage && !showOriginalImage)}
            >
              <PostThumbnail postThumbnailUrl={thumbnailUrl} />
            </button>
          </div>
          <div className="flex flex-col">
            <H1>{title}</H1>
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
};

export default PostHeader;
