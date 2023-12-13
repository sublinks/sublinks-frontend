import React from 'react';
import Link from 'next/link';
import Markdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { LinkText } from '../text';

interface MainCardProps {
  Header?: React.JSX.Element;
  body?: string;
  children?: React.ReactNode;
}

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

const MainCard = ({
  Header, body, children
}: MainCardProps) => (
  <div className="flex flex-col md:mx-40 p-12 md:border md:border-gray-300 md:dark:border-gray-900 md:rounded-md shadow-lg dark:shadow-gray-800">
    {Header && <div className="flex items-center gap-12">
      {Header}
    </div>}
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
    {children}
  </div>
);

export default MainCard;
