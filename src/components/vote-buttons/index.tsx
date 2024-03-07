'use client';

import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

import cx from 'classnames';
import Icon, { ICON_SIZE } from '../icon';
import { PaleBodyText } from '../text';
import VoteButton from './vote-button';
import UpvoteButton from './upvote-button';
import Popover from '../popover';
import DownvoteButton from './downvote-button';

interface CommentVotesProps {
  points: number;
  onVote: (score: number) => void;
  myVote?: number;
  vertical?: boolean;
}

const VoteButtons = ({
  points, onVote, myVote, vertical
}: CommentVotesProps) => (
  <div className={cx('flex justify-center items-center gap-4', {
    'flex-col': !vertical,
    'flex-row': vertical
  })}
  >
    <div className='max-h-24'>
      <Popover direction='left' content='Upvote'>
        <UpvoteButton onVote={onVote} myVote={myVote} />
      </Popover>
    </div>
    <PaleBodyText title="Vote score" className="text-xs">{points}</PaleBodyText>
    <div className='max-h-24'>
      <Popover direction='left' content='Downvote'>
        <DownvoteButton onVote={onVote} myVote={myVote} />
      </Popover>
    </div>
  </div>
);

export default VoteButtons;
