'use client';

import React from 'react';

import { CommentAggregates } from 'sublinks-js-client';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import sublinksClient from '@/utils/client';
import Icon, { ICON_SIZE } from '../icon';
import LinkButton from '../button-link';
import VoteButtons from '../vote-buttons';

interface CommentActionProps {
  votes: CommentAggregates;
  myVote?: number;
}

export const CommentAction = ({
  votes,
  myVote
}: CommentActionProps) => {
  const handleVote = async (vote: number) => {
    if (!process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL) return;

    await sublinksClient().likeComment({
      comment_id: votes.comment_id,
      score: vote
    });
  };

  return (
    <div className="flex relative">
      <VoteButtons points={votes.score} onVote={handleVote} myVote={myVote} vertical />
      <LinkButton
        className="py-0 px-2 text-xs"
        ariaLabel="Reply To Comment Button"
        type="button"
        onClick={e => {
          e.preventDefault();
        }}
      >
        Reply
      </LinkButton>
      <LinkButton
        className="py-0 px-2 ml-4 text-xs"
        ariaLabel="More Comment Actions Button"
        type="button"
        onClick={e => {
          e.preventDefault();
        }}
      >
        <Icon className="text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-400" IconType={EllipsisVerticalIcon} size={ICON_SIZE.VERYSMALL} isInteractable />
      </LinkButton>
    </div>
  );
};
