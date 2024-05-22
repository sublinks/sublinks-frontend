import React from 'react';
import Link from 'next/link';
import {
  DocumentPlusIcon, MagnifyingGlassIcon, UserGroupIcon
} from '@heroicons/react/24/outline';
import { GetSiteResponse } from 'sublinks-js-client';

import Icon, { ICON_SIZE } from '../icon';
import UserNav from '../user-nav';
import BottomNavDiv from './bottom-nav-div';

const BottomNav = async ({ site }: { site?: GetSiteResponse }) => {
  const myUser = site?.my_user;

  return (
    <BottomNavDiv>
      <Link href="/communities">
        <Icon IconType={UserGroupIcon} size={ICON_SIZE.MEDIUM} title="Communities icon" isInteractable />
      </Link>

      <Link href="/p">
        <Icon IconType={DocumentPlusIcon} size={ICON_SIZE.MEDIUM} title="Create post icon" isInteractable />
      </Link>

      <button type="button" aria-label="Search">
        <Icon IconType={MagnifyingGlassIcon} size={ICON_SIZE.MEDIUM} title="Search icon" isInteractable />
      </button>

      <UserNav initialMyUser={myUser} />
    </BottomNavDiv>
  );
};

export default BottomNav;
