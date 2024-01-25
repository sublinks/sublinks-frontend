import React from 'react';
import Link from 'next/link';
import HeaderLogoIcon from './header-logo-icon';
import { LinkText } from '../text';

const HeaderLogo = ({ name, icon }: { name: string; icon: string }) => (
  <Link href="/" className="flex items-center gap-8 lg:gap-16 text-sm lg:text-lg text-gray-900 dark:text-gray-100 hover:text-brand dark:hover:text-brand-dark transition-all duration-200">
    <HeaderLogoIcon icon={icon} />
    <LinkText>{name}</LinkText>
  </Link>
);

export default HeaderLogo;
