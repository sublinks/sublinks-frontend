import React from 'react';
import Link from 'next/link';
import Markdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { H1, LinkText } from '../text';

interface MainCardProps {
  LeftHeaderComponent?: React.JSX.Element;
  title: string;
  body?: string;
  SubTitle?: React.JSX.Element;
  imageUrl?: string;
  videoUrl?: string;
}

const customMarkdownComponents: Components = {
  a: ({ children, href }) => (
    <Link href={href as string} target="_blank" rel="noopener noreferrer">
      <LinkText className="underline">
        {children as string}
      </LinkText>
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-12">{children}</ul>
  )
};

const MainCard = ({
  LeftHeaderComponent, title, body, SubTitle, imageUrl, videoUrl
}: MainCardProps): React.ReactNode => (
  <div className="flex flex-col md:mx-40 p-12 md:border md:border-gray-300 md:dark:border-gray-900 md:rounded-md shadow-lg">
    <div className="flex items-center gap-12">
      {LeftHeaderComponent}
      <div className="flex flex-col">
        <H1>{title}</H1>
        {SubTitle}
      </div>
    </div>
    {body && (
      <div className="mt-24 text-gray-600 dark:text-gray-200 text-sm">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={customMarkdownComponents}
        >
          {body}
        </Markdown>
      </div>
    )}
  </div>
);

export default MainCard;
