'use client';

import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

import cx from 'classnames';
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
  vertical?: boolean;
}

const VoteButtons = ({
  points, onVote, myVote, vertical
}: CommentVotesProps) => (
  <div className={cx('flex justify-center items-center', {
    'flex-col': !vertical,
    'flex-row': vertical
  })}
  >
    <VoteButton label="Upvote arrow" onClick={() => onVote(myVote === 1 ? 0 : 1)}>
      <Icon IconType={ArrowUpIcon} size={ICON_SIZE.SMALL} textClassName={`${myVote === 1 ? 'text-blue-600' : 'text-gray-700 dark:text-white'}  hover:text-blue-400 dark:hover:text-blue-400`} />
    </VoteButton>
    <PaleBodyText title="Vote score" className="text-xs">{points}</PaleBodyText>
    <VoteButton label="Downvote arrow" onClick={() => onVote(myVote === -1 ? 0 : -1)}>
      <Icon IconType={ArrowDownIcon} size={ICON_SIZE.SMALL} textClassName={`${myVote === -1 ? 'text-red-600' : 'text-gray-700 dark:text-white'} dark:hover:text-red-400 hover:text-red-400`} />
    </VoteButton>
  </div>
);

export default VoteButtons;
