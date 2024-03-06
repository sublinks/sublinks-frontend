'use client';

import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

import cx from 'classnames';
import Icon, { ICON_SIZE } from '../icon';
import { PaleBodyText } from '../text';
import VoteButton from './vote-button';
import UpvoteButton from './upvote-button';




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
    <UpvoteButton onVote={onVote} myVote={myVote} />
    <PaleBodyText title="Vote score" className="text-xs">{points}</PaleBodyText>
    <VoteButton label="Downvote arrow" onClick={() => onVote(myVote === -1 ? 0 : -1)}>
      <Icon IconType={ArrowDownIcon} size={ICON_SIZE.SMALL} textClassName={`${myVote === -1 ? 'text-red-600' : 'text-gray-700 dark:text-white'} dark:hover:text-red-400 hover:text-red-400`} />
    </VoteButton>
  </div>
);

export default VoteButtons;
