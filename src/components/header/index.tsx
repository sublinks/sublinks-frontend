import React from 'react';
import {
  BellIcon,
  ClipboardIcon,
  HeartIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

import sublinksClient from '@/utils/client';
import { GetSiteResponse } from 'sublinks-js-client';
import ProfileMenu from '../profile-menu';
import HeaderLogo from './header-logo';
import HeaderSearch from './header-search';
import Icon, { ICON_SIZE } from '../icon';
import HeaderLink from './header-link';
import HeaderHeader from './header-header';
import * as testData from '../../../test-instance-data.json';
import { LinkText } from '../text';

const Header = async () => {
  const instance = process.env.SUBLINKS_API_BASE_URL ? await sublinksClient().getSite()
    : testData as unknown as GetSiteResponse;

  return (
    <HeaderHeader>
      {/* Header Left Side */}
      <div className="flex gap-8 lg:gap-16 items-center text-sm lg:text-base">
        <HeaderLogo name={instance.site_view.site.name} icon={instance.site_view.site.icon || '/logo.png'} />

        <p className="text-gray-200 dark:text-gray-400 hover:cursor-default">/</p>

        <HeaderLink href="/communities">
          <LinkText>Communities</LinkText>
        </HeaderLink>

        <HeaderLink href="/create_post">
          <LinkText className="hover:scale-105">Create post</LinkText>
        </HeaderLink>

        <HeaderLink href="/create_community">
          <LinkText className="hover:scale-105">Create community</LinkText>
        </HeaderLink>

        <HeaderLink href="/donate">
          <Icon IconType={HeartIcon} size={ICON_SIZE.SMALL} title="Donate icon" isInteractable />
        </HeaderLink>
      </div>

      {/* Header Right Side */}
      <div className="flex items-center gap-8 lg:gap-16 text-sm lg:text-base">
        <HeaderSearch />

        <HeaderLink href="/inbox">
          <Icon IconType={BellIcon} size={ICON_SIZE.SMALL} title="Inbox icon" isInteractable />
        </HeaderLink>

        <HeaderLink href="/reports">
          <Icon IconType={ShieldExclamationIcon} size={ICON_SIZE.SMALL} title="Reports icon" isInteractable />
        </HeaderLink>

        <HeaderLink href="/registration_applications">
          <Icon IconType={ClipboardIcon} size={ICON_SIZE.SMALL} title="Donate icon" isInteractable />
        </HeaderLink>

        <ProfileMenu />
      </div>
    </HeaderHeader>
  );
};

export default Header;
