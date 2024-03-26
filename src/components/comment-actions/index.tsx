'use client';

import React from 'react';
import { CommentAggregates } from 'sublinks-js-client';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import Icon, { ICON_SIZE } from '../icon';
import LinkButton from '../button-link';
import VoteButtons from '../button-votes';

interface CommentActionProps {
  votes: CommentAggregates;
  onVote: (score: number) => void;
  myVote?: number;
}

export const CommentAction = ({
  votes,
  onVote,
  myVote
}: CommentActionProps) => (
  <div className="flex relative">
    <VoteButtons points={votes.score} onVote={onVote} myVote={myVote} vertical />
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
