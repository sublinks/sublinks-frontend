'use client';

import {
  Menu, MenuHandler, MenuList
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/utils/theme';
import Link from 'next/link';
import { useClickOutside } from '@/utils/clickAway';
import Image from 'next/image';
import ThemeSwitch from '../theme-switch';
import { LinkText } from '../text';

const ProfileMenu = () => {
  const [theme, setTheme] = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const ref = useClickOutside<HTMLUListElement>(() => open && setOpen(false));

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
        open={open}
        handler={setOpen}
      >
        <MenuHandler>
          <button
            type="button"
            aria-label="ProfileButton"
            className="bg-transparent"
          >
            <Image src="/logo.png" alt="Profile image" width={30} height={30} className="rounded-full" />
          </button>
        </MenuHandler>
        <MenuList ref={ref} className="w-full relative md:w-80 flex flex-col bg-primary dark:bg-primary-dark dark:border-gray-800 rounded-b-none rounded-t-md md:rounded-b-md md:rounded-t-none" aria-label="ProfileMenu">
          {items.map(({ item }) => (
            <div className="w-full mt-0 top-0 pt-0 bg-none border-t first:border-t-0 border-gray-500 z-50" key={item.key}>
              {item}
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
