'use client';

import React, { useMemo } from 'react';
import { ArrowDownIcon, ArrowUpIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import {
  Person
} from 'sublinks-js-client';

import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Icon, { ICON_SIZE } from '../icon';
import Popover, { PopoverGapSize } from '../popover';
import Markdown from '../markdown';
import { getPersonInstanceFromUrl, getPersonNameFromUrl } from '@/utils/person';

interface PersonChipProps {
  person: Person
}

const PersonChip = ({
  person
}: PersonChipProps) => (
  <Popover direction='bottom' darkenBackground={true} openDelay={1000} closeDelay={300} gap={PopoverGapSize.NONE} content={
    <div>
      {
        person.banner ? (
          <Image src={person.banner} alt={`${person.name}'s banner`} width={480} height={64} style={{width: "100%"}} className='h-64 min-h-64 max-h-64 object-cover absolute z-0 inset-0 rounded-lg' />
        ) : (
          <div style={{width: "100%"}} className='h-64 min-h-64 max-h-64 bg-gradient-to-r from-blue-700 to-green-800 rounded-lg absolute z-0 inset-0' />
        )
      }
      {person.avatar ? (
        <Image src={person.avatar} alt={`${person.name}'s avatar`} width={64} height={64} className='transform translate-y-1/2 ml-32 relative w-64 h-64 min-w-64 max-w-64 min-h-64 max-h-64 object-cover rounded-xl outline outline-4 outline-[#1d2432] bg-[#1d2432]' />
      ) : (
        <Icon IconType={UserCircleIcon} size={ICON_SIZE.VERYSMALL} title='Default avatar' isInteractable className='transform translate-y-1/2 ml-32 relative w-64 h-64 min-w-64 max-w-64 min-h-64 max-h-64 object-cover rounded-xl outline outline-4 outline-[#1d2432] bg-[#1d2432]' />
      )}
      
      <div className='flex transform ml-112 mt-8 flex-col mr-20'>
        <p className='text-base'>{person.display_name || person.name}</p>
        <div className='flex'>
          <p className='text-gray-500'>@{getPersonNameFromUrl(person.actor_id)}</p>
          <p className='text-gray-600'>@{getPersonInstanceFromUrl(person.actor_id)}</p>
        </div>
      </div>
      <Markdown className='mt-8 p-8' markdown={person.bio} />
    </div>
  }>
    <Link href={`/user/${person.name}`} className='gap-4 flex items-center text-xs z-10'>
      {person.avatar ? (
        <Image src={person.avatar} alt="alt" width={16} height={16} className='rounded-full max-h-16 max-w-16 bg-transparent' />
      ) : (
        <Icon IconType={UserCircleIcon} size={ICON_SIZE.VERYSMALL} title="User icon" isInteractable />
      )}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">{person.display_name || person.name}</span>
    </Link>
  </Popover>
);

export default PersonChip;
