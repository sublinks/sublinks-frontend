import React from 'react';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import Icon, { ICON_SIZE } from '../icon';

const Header = () => (
  <header className="flex justify-between p-8">
    <Image
      className="h-24 w-24"
      src="/logo.png"
      alt="Sublinks logo"
      width={24}
      height={24}
      priority
    />
    <div className="md:w-1/2 lg:w-1/3 border">
      SEARCH
    </div>
    <div className="border">
      <Icon IconType={UserCircleIcon} size={ICON_SIZE.MEDIUM} title="User icon" />
    </div>
  </header>
);

export default Header;
