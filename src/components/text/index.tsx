import React from 'react';
import cx from 'classnames';

interface TextProps {
  children: string | number;
  className?: string;
  title?: string;
}

const H1 = ({ children, className, title }: TextProps) => <span className={cx('text-lg text-gray-900 dark:text-gray-100', className)} title={title}>{children}</span>;

const H2 = ({ children, className, title }: TextProps) => <span className={cx('text-md text-gray-900 dark:text-gray-100', className)} title={title}>{children}</span>;

const BodyTitle = ({ children, className, title }: TextProps) => <span className={cx('text-gray-900 dark:text-gray-100', className)} title={title}>{children}</span>;

const BodyText = ({ children, className, title }: TextProps) => <span className={cx('text-gray-600 dark:text-gray-200', className)} title={title}>{children}</span>;

const PaleBodyText = ({ children, className, title }: TextProps) => <span className={cx('text-gray-500 dark:text-gray-400', className)} title={title}>{children}</span>;

const LinkText = ({ children, className, title }: TextProps) => <span className={cx('text-gray-900 dark:text-gray-100 hover:text-brand dark:hover:text-brand-dark transition-text duration-200', className)} title={title}>{children}</span>;

const PaleLinkText = ({ children, className, title }: TextProps) => <span className={cx('text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand-dark transition-text duration-200', className)} title={title}>{children}</span>;

export {
  H1,
  H2,
  BodyTitle,
  BodyText,
  PaleBodyText,
  LinkText,
  PaleLinkText
};
