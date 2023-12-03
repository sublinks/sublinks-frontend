import React from 'react';
import cx from 'classnames';

interface TextProps {
  children: string | number;
  className?: string;
  title?: string;
}

const BodyTitle = ({ children, className, title }: TextProps) => <span className={cx('text-sm text-gray-900 dark:text-gray-100', className)} title={title}>{children}</span>;

const BodyText = ({ children, className, title }: TextProps) => <span className={cx('text-xs text-gray-600 dark:text-gray-200', className)} title={title}>{children}</span>;

const PaleBodyText = ({ children, className, title }: TextProps) => <span className={cx('text-xs text-gray-500 dark:text-gray-400', className)} title={title}>{children}</span>;

export {
  BodyTitle,
  BodyText,
  PaleBodyText
};
