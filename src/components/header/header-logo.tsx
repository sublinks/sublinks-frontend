import React from 'react';
import Link from 'next/link';
import HeaderLogoIcon from './header-logo-icon';

const HeaderLogo = ({ name, icon }: { name: string; icon: string }) => (
  <Link href="/" className="flex items-center gap-8 lg:gap-16 text-sm lg:text-lg text-gray-900 dark:text-gray-100 hover:text-brand dark:hover:text-brand-dark hover:scale-105 hover:mr-4 transition-all duration-200">
    <HeaderLogoIcon icon={icon} />
    <p>{name}</p>
  </Link>
);

export default HeaderLogo;
