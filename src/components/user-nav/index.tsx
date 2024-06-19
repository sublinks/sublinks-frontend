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
import { Theme, useTheme } from '@/hooks/use-theme';
import { useClickOutside } from '@/hooks/use-click-outside';
import ThemeSwitch from '../theme-switch';
import { LinkText } from '../text';
import Icon, { ICON_SIZE } from '../icon';

const ProfileMenu = ({ myUser }: { myUser: MyUserInfo }) => {
  const initialTheme = myUser?.local_user_view?.local_user?.theme as Theme;
  const [theme, setTheme] = useTheme(initialTheme);
  const [open, setOpen] = useState<boolean>(false);

  const ref = useClickOutside<HTMLUListElement>(() => open && setOpen(false));

  const userAvatar = myUser?.local_user_view.person.avatar;

  // @todo: Move to theme provider or a similar high-level component
  useEffect(() => {
    const className = 'dark';
    document.documentElement.classList.toggle(className, theme === 'dark');
  }, [theme]);

  const items: {
    item: React.JSX.Element,
    key: string
  }[] = [
    {
      item:
          (
            <Link href="/user/todo" className="justify-center flex w-full">
              <LinkText className="text-md">
                Profile
              </LinkText>
            </Link>
          ),
      key: 'profile'
    },
    {
      item: <ThemeSwitch key="theme-switcher" mode={theme as 'dark' | 'light'} onSwitch={setTheme} />,
      key: 'theme'
    },
    {
      item:
          (
            <Link href="/settings" className="justify-center flex w-full">
              <LinkText className="text-md">
                Settings
              </LinkText>
            </Link>
          ),
      key: 'settings'
    },
    {
      item: (
        <Link href="/logout" className="justify-center flex w-full">
          <LinkText className="text-md">Log out</LinkText>
        </Link>
      ),
      key: 'logout'
    }
  ];

  return (
    <div className="flex justify-center items-center">
      {false && ( // @todo: Change to check if a user is logged in
        <Link href="/inbox">
          <Icon IconType={BellIcon} size={ICON_SIZE.SMALL} title="Inbox icon" isInteractable />
        </Link>
      )}

      {false && ( // @todo: Change to check if a user is a mod or an admin
        <Link href="/reports">
          <Icon IconType={ShieldExclamationIcon} size={ICON_SIZE.SMALL} title="Reports icon" isInteractable />
        </Link>
      )}

      {false && ( // @todo: Change to check if applications are enabled and the user is an admin
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
        {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
        <MenuList ref={ref} className="w-full relative md:w-80 flex flex-col bg-primary dark:bg-primary-dark dark:border-gray-800 rounded-b-none rounded-t-md md:rounded-b-md md:rounded-t-none" aria-label="ProfileMenu">
          {items.map(({ item, key }) => (
            <div className="w-full mt-0 top-0 pt-0 bg-none border-t first:border-t-0 border-gray-500 z-50" key={key}>
              {item}
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

const UserNav = ({ initialMyUser }: { initialMyUser?: MyUserInfo }) => {
  const { userData } = useContext(UserContext);
  const [myUser, setMyUser] = useState(initialMyUser);
  const endUser = myUser || initialMyUser; // Server doesn't have access to myUser state

  useEffect(() => {
    if (userData.auth !== undefined) {
      setMyUser(userData.myUser);
    }
  }, [userData]);

  if (endUser) {
    return <ProfileMenu myUser={endUser} />;
  }

  return (
    <div className="flex gap-8 lg:gap-16 items-center text-sm lg:text-base">
      <Link href="/login">
        <LinkText>Log In</LinkText>
      </Link>
      <Link href="/signup" className="max-md:hidden">
        <LinkText>Sign Up</LinkText>
      </Link>
    </div>
  );
};

export default UserNav;
