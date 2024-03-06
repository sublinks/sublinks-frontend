'use client';

import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, UserCircleIcon } from '@heroicons/react/20/solid';

import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Icon, { ICON_SIZE } from '../icon';

interface UserChipProps {
  image?: string;
  name: string;
  link: string;
}

const UserChip = ({
  image, name, link
}: UserChipProps) => (
  <Link href={link} className='gap-4 flex items-center text-xs'>
    {image ? (
      <Image src={image ?? '/logo.png'} alt="alt" width={16} height={16} className='rounded-full max-h-16 max-w-16 bg-transparent' />
    ) : (
      <Icon IconType={UserCircleIcon} size={ICON_SIZE.VERYSMALL} title="User icon" isInteractable />
    )}
    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">{name}</p>
  </Link>
);

export default UserChip;
