import React from 'react';
import cx from 'classnames';

interface TextProps {
  children: string | number;
  className?: string;
  title?: string;
}

const H1 = ({ children, className, title }: TextProps) => <span className={cx('text-lg text-gray-900 dark:text-gray-100', className)} title={title}>{children}</span>;

const BodyTitle = ({ children, className, title }: TextProps) => <span className={cx('text-gray-900 dark:text-gray-100', className)} title={title}>{children}</span>;

const BodyText = ({ children, className, title }: TextProps) => <span className={cx('text-gray-600 dark:text-gray-200', className)} title={title}>{children}</span>;

const PaleBodyText = ({ children, className, title }: TextProps) => <span className={cx('text-gray-500 dark:text-gray-400', className)} title={title}>{children}</span>;

const LinkText = ({ children, className, title }: TextProps) => <span className={cx('text-gray-900 dark:text-gray-100 hover:text-hover-link dark:hover:text-hover-link-dark', className)} title={title}>{children}</span>;

export {
  H1,
  BodyTitle,
  BodyText,
  PaleBodyText,
  LinkText
};
