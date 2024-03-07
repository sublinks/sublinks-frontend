/* eslint-disable react/no-danger */
import React from 'react';
import cx from 'classnames';

interface MarkdownProps {
  className?: string;
  markdown?: string | JSX.Element | JSX.Element[];
}

const Markdown = ({
  className,
  markdown
}: MarkdownProps) => (
  <div className={cx('text-primary-dark dark:text-primary markdown', className)} >
    {markdown}
  </div>
);

export default Markdown;
