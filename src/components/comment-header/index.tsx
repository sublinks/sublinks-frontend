import React from 'react';

import { Person } from 'sublinks-js-client';
import Image from 'next/image';
import Link from 'next/link';
import { HomeIcon, LinkIcon } from '@heroicons/react/24/outline';
import {
  BodyText,
  H2
} from '../text';
import Icon, { ICON_SIZE } from '../icon';

interface CommentHeaderProps {
  creator: Person;
  href: string;
  apId: string;
  createdAt: string;
  updatedAt: string | undefined;
}

export const CommentHeader = ({
  creator,
  href,
  apId,
  createdAt,
  updatedAt
}: CommentHeaderProps) => {
  const { display_name: authorDisplayName, name: authorName } = creator;

  const showName = authorDisplayName || authorName;

  const updated = updatedAt !== undefined;

  return (
    <div className="relative flex items-center">
      <Link href={href} className="flex items-center">
        <Image
          alt={`Avatar from: ${showName}`}
          src={creator.avatar || '/logo.png'}
          width={20}
          height={20}
          className="rounded-md"
        />
        <H2 className="text-left h-full ml-4">{showName}</H2>
        <Icon IconType={LinkIcon} size={ICON_SIZE.VERYSMALL} className="ml-4 pl-4 h-full" />
      </Link>
      <Link href={apId}>
        <Icon IconType={HomeIcon} size={ICON_SIZE.VERYSMALL} className="ml-4p pl-4 h-full" />
      </Link>
      <BodyText className="text-right h-full ml-4 text-sm">{new Date(updated ? updatedAt : createdAt).toLocaleString()}</BodyText>
      {updated && <BodyText className="text-left h-full ml-4 text-xs -translate-y-4">Edited</BodyText>}
    </div>

  );
};
