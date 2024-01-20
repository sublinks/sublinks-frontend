import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib';
import cx from 'classnames';

interface MarkdownProps {
  remarkPlugins: PluggableList | null | undefined;
  className: string;
  children: string | undefined;
}

const Markdown = ({
  remarkPlugins,
  className,
  children
}: MarkdownProps) => (
  <ReactMarkdown remarkPlugins={remarkPlugins} unwrapDisallowed className={cx('markdown [&>code]:block', className)}>
    {children}
  </ReactMarkdown>
);

export default Markdown;
