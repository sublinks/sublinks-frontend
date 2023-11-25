import React from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import Icon, { ICON_SIZE } from '../icon';
import { TextField } from '../input';

const Header = (): React.ReactNode => (
  <header className=" hidden md:flex items-center justify-between py-8 px-8 md:px-16 border-b dark:border-gray-900">
    <div className="flex items-center">
      <Image
        className="h-32 w-32"
        src="/logo.png"
        alt="Sublinks logo"
        width={32}
        height={32}
        priority
      />
      <div className="flex gap-16 ml-24">
        <span>Communities</span>
        <span>Create post</span>
        <span>|</span>
        <span>Favorites</span>
      </div>
    </div>
    <div className="flex items-center gap-12">
      <TextField
        type="text"
        name="search"
        id="search"
        label="Search"
        placeholder="Search"
        LeftIcon={MagnifyingGlassIcon}
        className="w-240 hover:w-500 focus-within:w-500 transition-all"
      />
      <Icon IconType={UserCircleIcon} size={ICON_SIZE.MEDIUM} title="User icon" />
    </div>
  </header>
);

export default Header;
