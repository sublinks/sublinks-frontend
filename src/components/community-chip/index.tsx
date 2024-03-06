'use client';

import React, { useMemo } from 'react';
import { ArrowDownIcon, ArrowUpIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import {
  Community,
} from 'sublinks-js-client';

import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Icon, { ICON_SIZE } from '../icon';
import Popover, { PopoverGapSize } from '../popover';
import Markdown from '../markdown';
import { getCommunityInstanceFromUrl, getCommunityNameFromUrl } from '@/utils/communities';

interface CommunityChipProps {
  community: Community
}

const CommunityChip = ({
  community
}: CommunityChipProps) => (
  <Popover direction='bottom' openDelay={500} closeDelay={300} gap={PopoverGapSize.NONE} content={
    <div>
      {
        community.banner ? (
          <Image src={community.banner} alt={`${community.name}'s banner`} width={640} height={64} className=' h-64 min-h-64 max-h-64 object-cover absolute z-0 inset-0 rounded-lg' />
        ) : (
          <div className=' h-64 min-h-64 max-h-64 bg-gradient-to-r from-blue-700 to-green-800 rounded-lg absolute z-0 inset-0' />
        )
      }
      <Image src={community.icon ?? '/icon.png'} alt={`${community.name}'s avatar`} width={64} height={64} className='transform translate-y-1/2 ml-32 relative w-64 h-64 min-w-64 max-w-64 min-h-64 max-h-64 object-cover rounded-xl outline outline-4 outline-[#1d2432] bg-[#1d2432]' />
      
      <div className='flex transform ml-112 mt-8 flex-col mr-20'>
        <p className='text-base'>{community.title || community.name}</p>
        <div className='flex'>
          <p className='text-gray-500'>@{getCommunityNameFromUrl(community.actor_id)}</p>
          <p className='text-gray-600'>@{getCommunityInstanceFromUrl(community.actor_id)}</p>
        </div>
      </div>
      <Markdown className='mt-8 p-8' markdown={community.description} />
    </div>
  }>
    <Link href={`/c/${community.name}`} className='gap-4 flex items-center text-xs z-10'>
      <Image src={community.icon ?? '/icon.png'} alt="alt" width={16} height={16} className='rounded-full max-h-16 max-w-16 bg-transparent' />
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">{community.title || community.name}</p>
    </Link>
  </Popover>
);

export default CommunityChip;
