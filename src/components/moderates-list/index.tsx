import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { H1 } from '../text';

interface ModeratesListItemProps {
  communityName: string;
  communityAvatar: string | undefined;
  url: string;
}

export const ModeratesListItem = (props: ModeratesListItemProps) => {
  const { communityName, communityAvatar, url } = props;

  return (
    <Link className="flex gap-12 relative center items-center" href={url}>
      {communityAvatar && (
      <Image
        src={communityAvatar}
        className="hidden lg:flex rounded-md h-32 w-32 mr-2"
        alt="Avatar"
        width={32}
        height={32}
      />
      )}
      {communityName}
    </Link>
  );
};

export interface ModeratesProps {
  community: {
    title: string,
    actor_id: string,
    icon?: string,
  }

}

export const ModeratesList = ({ moderates }: { moderates: ModeratesProps[] }) => (
  <div className="w-full border-l-2 pl-16 ">
    <H1 className="mb-4 border-collapse border-b dark:border-gray-400 border-gray-800">Moderates:</H1>
    <div className="max-h-500 overflow-y-scroll">
      {moderates.map(moderate => (
        <div key={moderate.community.actor_id} className="border-b border-spacing dark:border-gray-50 border-gray-400 my-2 min-h-fit relative p-2 border-collapse cursor-pointer">
          <ModeratesListItem communityName={moderate.community.title} communityAvatar={moderate.community.icon} url={`${moderate.community.actor_id}`} />
        </div>
      ))}
    </div>
  </div>
);
