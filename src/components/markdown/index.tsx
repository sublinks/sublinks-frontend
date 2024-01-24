/* eslint-disable react/no-danger */
import React from 'react';
import cx from 'classnames';

interface MarkdownProps {
  className?: string;
  markdown?: string;
}

const Markdown = ({
  className,
  markdown
}: MarkdownProps) => (
  <div dangerouslySetInnerHTML={{ __html: markdown || '' }} className={cx('text-primary-dark dark:text-primary markdown', className)} />
);

export default Markdown;
