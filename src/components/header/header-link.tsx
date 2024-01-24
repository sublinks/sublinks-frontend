import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

const HeaderLink = ({
  children,
  href,
  className
}: {
  children: React.ReactNode,
  href: string,
  className?: string
}) => (
  <Link href={href} className={cx('hover:scale-105 transition-scale duration-200', className)}>
    {children}
  </Link>
);

export default HeaderLink;
