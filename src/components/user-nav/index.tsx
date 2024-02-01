'use client';

import {
  Menu, MenuHandler, MenuList
} from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BellIcon, ClipboardIcon, ShieldExclamationIcon, UserCircleIcon
} from '@heroicons/react/24/outline';
import { MyUserInfo } from 'sublinks-js-client';

import { UserContext } from '@/context/user';
import { useClickOutside } from '@/utils/clickAway';
import { useTheme } from '@/utils/theme';
import ThemeSwitch from '../theme-switch';
import { LinkText } from '../text';
import Icon, { ICON_SIZE } from '../icon';

const ProfileMenu = ({ myUser }: { myUser: MyUserInfo }) => {
  const [theme, setTheme] = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const ref = useClickOutside<HTMLUListElement>(() => open && setOpen(false));

  const userAvatar = myUser?.local_user_view.person.avatar;

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
      {false && ( // Change to check if a user is logged in
      <Link href="/inbox">
        <Icon IconType={BellIcon} size={ICON_SIZE.SMALL} title="Inbox icon" isInteractable />
      </Link>
      )}

      {false && ( // Change to check if a user is a mod or an admin
      <Link href="/reports">
        <Icon IconType={ShieldExclamationIcon} size={ICON_SIZE.SMALL} title="Reports icon" isInteractable />
      </Link>
      )}

      {false && ( // Change to check if applications are enabled and the user is an admin
      <Link href="/registration_applications">
        <Icon IconType={ClipboardIcon} size={ICON_SIZE.SMALL} title="Registration applications icon" isInteractable />
      </Link>
      )}

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
            {userAvatar ? (
              <Image src={userAvatar} alt="Profile image" width={30} height={30} className="rounded-full" />
            ) : (
              <Icon IconType={UserCircleIcon} size={ICON_SIZE.MEDIUM} title="User icon" isInteractable />
            )}

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

const UserNav = () => {
  const { myUser } = useContext(UserContext);

  if (myUser) {
    return <ProfileMenu myUser={myUser} />;
  }

  return (
    <div className="flex gap-8 lg:gap-16 items-center text-sm lg:text-base">
      <Link href="/login">
        <LinkText>Log In</LinkText>
      </Link>
      <Link href="/signup">
        <LinkText>Sign Up</LinkText>
      </Link>
    </div>
  );
};

export default UserNav;
