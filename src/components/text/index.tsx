import React from 'react';
import cx from 'classnames';

interface TextProps {
  children: string | number;
  className?: string;
}

const ParagraphTitle = ({ children, className }: TextProps) => <span className={cx('text-sm text-gray-900 dark:text-gray-100', className)}>{children}</span>;

const Paragraph = ({ children, className }: TextProps) => <span className={cx('text-xs text-gray-600 dark:text-gray-200', className)}>{children}</span>;

const PaleParagraph = ({ children, className }: TextProps) => <span className={cx('text-xs text-gray-500 dark:text-gray-400', className)}>{children}</span>;

export {
  ParagraphTitle,
  Paragraph,
  PaleParagraph
};
