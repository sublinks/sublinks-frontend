"use client"
import React from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const ModeratesListItem = ({ communityName, communityAvatar, url }: { communityName: string, communityAvatar: string | undefined, url: string }) => (
  <div className="flex gap-12 relative center items-center" onClick={() => {
    window.location.href = url;
    console.log(url)
  }}>
    {communityAvatar && <Image
      src={communityAvatar}
      className="rounded-md h-32 w-32 mr-2"
      alt="Avatar"
      width={32}
      height={32}
    />}
    {communityName}
  </div>
)

export const ModeratesList = ({ moderates }: { moderates: { community: { title: string, actor_id: string, icon: string, } }[] }) => (
  <div className="w-full border-l-2 pl-16 ">
    <h1 className="text-2xl font-bold mb-4 border-collapse border-b dark:border-gray-400 border-gray-800 ">Moderates:</h1>
    <div className="max-h-500 overflow-y-scroll">
      {moderates.map((moderate) => (
        <div key={moderate.community.actor_id} className="border-b border-spacing dark:border-gray-50 border-gray-400 my-2 min-h-[35px] relative p-2 border-collapse cursor-pointer">
          <ModeratesListItem communityName={moderate.community.title} communityAvatar={moderate.community.icon} url={`${moderate.community.actor_id}`} />
        </div>
      ))}
    </div>
  </div>
)