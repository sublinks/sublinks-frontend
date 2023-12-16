import React from 'react';
import Link from 'next/link';
import Markdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Image from 'next/image';
import { H1, LinkText } from '../text';

// @Todo: Break out into separate component
const customMarkdownComponents: Components = {
  a: ({ children, href }) => (
    <Link href={href as string} target="_blank" rel="noopener noreferrer">
      <LinkText className="underline">
        {children as string}
      </LinkText>
    </Link>
  ),
  p: ({ children }) => (
    <p className="mb-12">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-12">{children}</ul>
  )
};

const PersonAvatar = ({ avatarUrl }: { avatarUrl: string }) => (
  <div className="flex justify-center">
    <Image
      src={avatarUrl}
      className="rounded-md h-32 w-32 mr-8"
      alt="Avatar"
      width={32}
      height={32}
    />
  </div>
);

export const PersonBio = ({ bio }: { bio: string }) => (
  <div className="mt-24 text-gray-600 dark:text-gray-200 text-sm">
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={customMarkdownComponents}
    >
      {bio}
    </Markdown>
  </div>
);

const PersonBadges = ({ is_admin }: { is_admin: boolean }) => (
  <div className="flex justify-center">
    {is_admin ? (
      <div className="bg-red-400 dark:bg-red-600 text-white dark:text-gray-100 rounded-md flex flex-col px-8 text-sm font-bold my-2 justify-center items-center ml-8">
        <p>
          A
        </p>
      </div>
    ) : null}
  </div>
);

const PersonBanner = ({ bannerUrl }: { bannerUrl: string }) => (
  <div className="relative w-full mb-8 ">
    <Image
      src={bannerUrl}
      className="rounded-md mr-8 w-full border-2 md:border-gray-300 md:dark:border-gray-900"
      alt="User Banner"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
    />
  </div>

);

export const PersonTitle = ({ name, avatar }: { name: string, avatar: string | undefined }) => (
  <div className="flex justify-left">
    {avatar ? (
      <div className="flex justify-center">
        <PersonAvatar avatarUrl={avatar} />
      </div>
    ) : null}
    <H1 className="text-gray-600 dark:text-gray-200 text-2xl ">
      {name}
    </H1>
  </div>
);

interface PersonHeaderProps {
  name: string,
  avatar: string | undefined,
  is_admin: boolean,
  banner: string | undefined
}

export const PersonHeader = ({
  name, avatar, is_admin, banner
}: PersonHeaderProps) => (
  <div className="w-full">
    {banner && (
      <PersonBanner bannerUrl={banner} />
    )}
    <div className="flex justify-start">
      <PersonTitle name={name} avatar={avatar} />
      <PersonBadges is_admin={is_admin} />
    </div>
  </div>
);
