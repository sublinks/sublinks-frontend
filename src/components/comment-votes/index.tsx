'use client';

import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

import Icon, { ICON_SIZE } from '../icon';
import { PaleBodyText } from '../text';

interface VoteButtonProps {
  children: React.ReactNode,
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const VoteButton = ({ children, label, onClick }: VoteButtonProps) => (
  <button
    type="button"
    onClick={e => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
    }}
    aria-label={label}
    className="hover:bg-secondary dark:hover:bg-secondary-dark rounded-full p-2"
  >
    {children}
  </button>
);

interface CommentVotesProps {
  points: number;
  onVote: (score: number) => void;
  myVote?: number;
}

const CommentVotes = ({ points, onVote, myVote }: CommentVotesProps) => (
  <div className="flex flex-row justify-center items-center">
    <VoteButton label="Upvote arrow" onClick={() => onVote(myVote === 1 ? 0 : 1)}>
      <Icon IconType={ArrowUpIcon} size={ICON_SIZE.SMALL} SvgClassName={`hover:fill-blue-400 ${myVote === 1 && 'fill-blue-600'}`} />
    </VoteButton>
    <PaleBodyText title="Post score" className="text-xs">{points}</PaleBodyText>
    <VoteButton label="Downvote arrow" onClick={() => onVote(myVote === -1 ? 0 : -1)}>
      <Icon IconType={ArrowDownIcon} size={ICON_SIZE.SMALL} SvgClassName={`hover:fill-red-400  ${myVote === -1 && 'fill-red-600'}`} />
    </VoteButton>
  </div>
);

export default CommentVotes;
