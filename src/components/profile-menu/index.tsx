'use client';

import {
  Menu, MenuHandler, MenuList
} from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/utils/theme';
import Link from 'next/link';
import Icon, { ICON_SIZE } from '../icon';
import ThemeSwitch from '../theme-switch';
import { LinkText } from '../text';

const ProfileMenu = () => {
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const items: {
    item: React.JSX.Element
  }[] = [
    {
      item:
      (
        <Link href="/user/todo" className="justify-center flex">
          <LinkText className="text-center w-full">
            Profile
          </LinkText>
        </Link>
      )
    },
    {
      item: <ThemeSwitch key="theme-switcher" mode={theme as 'dark' | 'light'} onSwitch={setTheme} />
    }
  ];

  return (
    <div className="flex justify-center items-center">
      <Menu
        placement="bottom"
      >
        <MenuHandler>
          <div>
            <Icon IconType={UserCircleIcon} size={ICON_SIZE.MEDIUM} title="User icon" isInteractable />
          </div>
        </MenuHandler>
        <MenuList className="w-full relative md:w-80 flex flex-col bg-primary dark:bg-primary-dark dark:border-gray-800 rounded-b-none rounded-t-md md:rounded-b-md md:rounded-t-none">
          {items.map(({ item }) => (
            <div className="w-full mt-0 top-0 pt-0 bg-none border-t first:border-t-0 border-gray-500" key={item.key}>
              {item}
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
