import React from 'react';
import {
  BellIcon,
  ClipboardIcon,
  HeartIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

import sublinksClient from '@/utils/client';
import { GetSiteResponse } from 'sublinks-js-client';
import Link from 'next/link';
import ProfileMenu from '../profile-menu';
import HeaderLogo from './header-logo';
import HeaderSearch from './header-search';
import Icon, { ICON_SIZE } from '../icon';
import HeaderLayout from './header-layout';
import * as testData from '../../../test-instance-data.json';
import { LinkText } from '../text';
import Popover from '../popover';

const Header = async () => {
  const instance = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL ? await sublinksClient().getSite()
    : testData as unknown as GetSiteResponse;

  return (
    <HeaderLayout>
      {/* Header Left Side */}
      <div className="flex gap-8 lg:gap-16 items-center text-sm lg:text-base">
        <HeaderLogo name={instance.site_view.site.name} icon={instance.site_view.site.icon || '/logo.png'} />

        <p className="text-gray-200 dark:text-gray-400 hover:cursor-default">/</p>

        <Popover content="Communities" direction='bottom'>
          <Link href="/c">
            <LinkText>Communities</LinkText>
          </Link>
        </Popover>

        <Popover content="Create Post" direction='bottom'>
          <Link href="/p">
            <LinkText>Create post</LinkText>
          </Link>
        </Popover>

        <Popover content="Create community" direction='bottom'>
          <Link href="/create_community">
            <LinkText>Create community</LinkText>
          </Link>
        </Popover>

        <Popover content="Donate" direction='bottom'>
          <Link href="/donate">
            <Icon IconType={HeartIcon} size={ICON_SIZE.SMALL} title="Donate icon" isInteractable />
          </Link>
        </Popover>
      </div>

      {/* Header Right Side */}
      <div className="flex items-center gap-8 lg:gap-16 text-sm lg:text-base">
        <Popover content="Search" direction='bottom'>
          <HeaderSearch />
        </Popover>

        {false && ( // Change to check if a user is logged in
          <Popover content="Inbox" direction='bottom'>
            <Link href="/inbox">
              <Icon IconType={BellIcon} size={ICON_SIZE.SMALL} title="Inbox icon" isInteractable />
            </Link>
          </Popover>
        )}

        {false && ( // Change to check if a user is a mod or an admin
          <Popover content="Reports" direction='bottom'>
            <Link href="/reports">
              <Icon IconType={ShieldExclamationIcon} size={ICON_SIZE.SMALL} title="Reports icon" isInteractable />
            </Link>
          </Popover>
        )}

        {false && ( // Change to check if applications are enabled and the user is an admin
          <Popover content="Registration Applications" direction='bottom'>
            <Link href="/registration_applications">
              <Icon IconType={ClipboardIcon} size={ICON_SIZE.SMALL} title="Registration applications icon" isInteractable />
            </Link>
          </Popover>
        )}

        <Popover content="Profile" direction='bottom'>
          <ProfileMenu />
        </Popover>
      </div>
    </HeaderLayout>
  );
};

export default Header;
