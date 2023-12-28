'use client';

import React from 'react';

import { CommentAggregates } from 'sublinks-js-client';
import CommentVotes from '../comment-votes';
import Button from '../button';
import Icon, { ICON_SIZE } from '../icon';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface CommentActionProps {
  votes: CommentAggregates;
}

export const CommentAction = ({
  votes
}: CommentActionProps) => (
  <div className="flex relative">
    <CommentVotes points={votes.score} />
    <Button
      className="py-0 px-2 text-xs"
      ariaLabel="ReplyToCommentButton"
      type="button"
      onClick={e => {
        e.preventDefault();
        console.log('@Todo: Reply to comment');
      }}
    >
      Reply
    </Button>
    <Button
      className="py-0 px-2 ml-4 text-xs"
      ariaLabel="ReplyToCommentButton"
      type="button"
      onClick={e => {
        e.preventDefault();
        console.log('@Todo: Reply to comment');
      }}
    >
      <Icon className="hover:text-white dark:hover:text-gray-700" IconType={EllipsisVerticalIcon} size={ICON_SIZE.VERYSMALL} isInteractable />
    </Button>
  </div>
);
