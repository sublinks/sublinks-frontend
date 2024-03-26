'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { PostView } from 'sublinks-js-client';

import { getPostThumbnailUrl, isImage } from '@/utils/links';
import { handlePostVote } from '@/utils/voting';
import { H1 } from '../text';
import PostThumbnail from '../post-thumbnail';
import VoteButtons from '../button-votes';

interface PostHeaderProps {
  postView: PostView;
  SubTitle: React.JSX.Element;
}

const PostHeader = ({ postView, SubTitle }: PostHeaderProps) => {
  const [postData, setPostData] = useState(postView);
  const { my_vote: myVote } = postData;
  const {
    id, body, name: postName, url: postUrl
  } = postData.post;
  const { score } = postData.counts;
  const postHasImage = postUrl ? isImage(postUrl) : false;
  const thumbnailUrl = getPostThumbnailUrl(postData.post);

  const [showOriginalImage, setShowOriginalImage] = useState(postHasImage && !body);

  let thumbnailLabel = "Go to post's URL";
  if (postHasImage) {
    thumbnailLabel = showOriginalImage ? 'Hide full-size image' : 'Show full-size image';
  }

  const onPostVote = (vote: number) => {
    const voteScore = vote === myVote ? 0 : vote;
    handlePostVote(id, voteScore, setPostData);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-8">
        <div className="flex items-start gap-8">
          <VoteButtons points={score} onVote={onPostVote} myVote={myVote} />
          <button
            type="button"
            aria-hidden={!postHasImage}
            aria-label={thumbnailLabel}
            className={cx('h-80 w-80 relative', {
              'cursor-default': !postUrl || !body
            })}
            onClick={() => {
              // Don't allow hiding image if post has no other content
              if (postHasImage && body) {
                setShowOriginalImage(postHasImage && !showOriginalImage);
              } else if (!postHasImage && postUrl) {
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
              <H1 className="hover:text-brand dark:hover:text-brand-dark">{postName}</H1>
            </Link>
          ) : <H1>{postName}</H1>}
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
