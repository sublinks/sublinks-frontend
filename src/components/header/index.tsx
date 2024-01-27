import React from 'react';
import {
  BellIcon,
  ClipboardIcon,
  HeartIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

import SublinksApi from '@/utils/client';
import { GetSiteResponse } from 'sublinks-js-client';
import Link from 'next/link';
import ProfileMenu from '../profile-menu';
import HeaderLogo from './header-logo';
import HeaderSearch from './header-search';
import Icon, { ICON_SIZE } from '../icon';
import HeaderLayout from './header-layout';
import * as testData from '../../../test-instance-data.json';
import { LinkText } from '../text';

const Header = async () => {
  const instance = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    ? await SublinksApi.Instance().Client().getSite()
    : testData as unknown as GetSiteResponse;

  return (
    <HeaderLayout>
      {/* Header Left Side */}
      <div className="flex gap-8 lg:gap-16 items-center text-sm lg:text-base">
        <HeaderLogo name={instance.site_view.site.name} icon={instance.site_view.site.icon || '/logo.png'} />

        <p className="text-gray-200 dark:text-gray-400 hover:cursor-default">/</p>

        <Link href="/c">
          <LinkText>Communities</LinkText>
        </Link>

        <Link href="/p">
          <LinkText>Create post</LinkText>
        </Link>

        <Link href="/create_community">
          <LinkText>Create community</LinkText>
        </Link>

        <Link href="/donate">
          <Icon IconType={HeartIcon} size={ICON_SIZE.SMALL} title="Donate icon" isInteractable />
        </Link>
      </div>

      {/* Header Right Side */}
      <div className="flex items-center gap-8 lg:gap-16 text-sm lg:text-base">
        <HeaderSearch />

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

        <ProfileMenu />
      </div>
    </HeaderLayout>
  );
};

export default Header;
