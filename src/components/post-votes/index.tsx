'use client';

import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

import Icon, { ICON_SIZE } from '../icon';
import { PaleBodyText } from '../text';

interface VoteButtonProps {
  children: React.ReactNode,
  label: string;
}

const VoteButton = ({ children, label }: VoteButtonProps) => (
  <button
    type="button"
    onClick={e => {
      e.preventDefault();
    }}
    aria-label={label}
    className="hover:bg-secondary dark:hover:bg-secondary-dark rounded-full p-2"
  >
    {children}
  </button>
);

const PostVotes = ({ points }: { points: number; }): React.ReactNode => (
  <div className="flex flex-col justify-center items-center pl-8">
    <VoteButton label="Upvote arrow">
      <Icon IconType={ArrowUpIcon} size={ICON_SIZE.SMALL} className="hover:text-blue-400" />
    </VoteButton>
    <PaleBodyText title="Post score">{points}</PaleBodyText>
    <VoteButton label="Downvote arrow">
      <Icon IconType={ArrowDownIcon} size={ICON_SIZE.SMALL} className="hover:text-red-400" />
    </VoteButton>
  </div>
);

export default PostVotes;
