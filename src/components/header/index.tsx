import React from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import Icon, { ICON_SIZE } from '../icon';
import { TextField } from '../input';

const Header = () => (
  <header className="flex justify-between py-8 px-8 md:px-16 border-b">
    <Image
      className="h-32 w-32"
      src="/logo.png"
      alt="Sublinks logo"
      width={32}
      height={32}
      priority
    />
    <div className="md:w-1/2 lg:w-1/3">
      <TextField type="text" name="search" id="search" label="Search" placeholder="Search" LeftIcon={MagnifyingGlassIcon} />
    </div>
    <div>
      <Icon IconType={UserCircleIcon} size={ICON_SIZE.MEDIUM} title="User icon" />
    </div>
  </header>
);
export default Header;
