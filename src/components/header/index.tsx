import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { GetSiteResponse } from 'sublinks-js-client';

import UserNav from '../user-nav';
import HeaderLogo from './header-logo';
import HeaderSearch from './header-search';
import Icon, { ICON_SIZE } from '../icon';
import HeaderLayout from './header-layout';
import { LinkText } from '../text';

const Header = async ({ site }: { site?: GetSiteResponse }) => {
  const myUser = site?.my_user;

  return (
    <HeaderLayout>
      {/* Header Left Side */}
      <div className="flex gap-8 lg:gap-16 items-center text-sm lg:text-base">
        <HeaderLogo name={site?.site_view?.site.name || 'Sublinks'} icon={site?.site_view?.site?.icon || '/logo.png'} />

        <p className="text-gray-200 dark:text-gray-400 hover:cursor-default">/</p>

        <Link href="/c">
          <LinkText>Communities</LinkText>
        </Link>

        <Link href="/p">
          <LinkText>Create post</LinkText>
        </Link>

        <Link href="/c/create">
          <LinkText>Create community</LinkText>
        </Link>

        <Link href="/donate">
          <Icon IconType={HeartIcon} size={ICON_SIZE.SMALL} title="Donate icon" isInteractable />
        </Link>
      </div>

      {/* Header Right Side */}
      <div className="flex items-center gap-8 lg:gap-16 text-sm lg:text-base">
        <HeaderSearch />
        <UserNav initialMyUser={myUser} />
      </div>
    </HeaderLayout>
  );
};

export default Header;
