'use client';

import React, { useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/20/solid';
import Icon, { ICON_SIZE } from '../icon';
import VoteButton from './vote-button';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

const DownvoteButton = ({ onVote, myVote } : { onVote: (score: number) => void, myVote?: number }) => {
  const [effect, setEffect] = useState(false);

  return (
    <VoteButton label="Downvote arrow" className="relative" onClick={() => {
      onVote(myVote === -1 ? 0 : -1);
      setEffect(true);
    }}>
      <Icon onAnimationEnd={() => setEffect(false)} IconType={ArrowDownIcon} size={ICON_SIZE.SMALL} className={`${
          effect && "animate-growAndShrink"
        }`} textClassName={`
          ${myVote === 1 ? 'text-green-400' : 'text-gray-700 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-all duration-300'}
        `} />
        <Icon IconType={ArrowDownIcon} size={ICON_SIZE.SMALL} className={`${
          effect && "animate-singlePing"
        } absolute top-0`} textClassName={`
          ${myVote === 1 ? 'text-green-400' : 'text-gray-700 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-all duration-300'}
        `} />
    </VoteButton>
  )
};

export default DownvoteButton;

/*
textClassName={`${myVote === 1 ? 'text-green-600' : 'text-gray-700 dark:text-white'}  hover:text-green-400 dark:hover:text-green-400`
*/