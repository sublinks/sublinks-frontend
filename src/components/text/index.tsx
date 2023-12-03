import React from 'react';
import cx from 'classnames';

interface TextProps {
  children: string | number;
  className?: string;
}

const BodyTitle = ({ children, className }: TextProps) => <span className={cx('text-sm text-gray-900 dark:text-gray-100', className)}>{children}</span>;

const BodyText = ({ children, className }: TextProps) => <span className={cx('text-xs text-gray-600 dark:text-gray-200', className)}>{children}</span>;

const PaleBodyText = ({ children, className }: TextProps) => <span className={cx('text-xs text-gray-500 dark:text-gray-400', className)}>{children}</span>;

export {
  BodyTitle,
  BodyText,
  PaleBodyText
};
