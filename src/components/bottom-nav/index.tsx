import React from 'react';
import Link from 'next/link';
import {
  DocumentPlusIcon, MagnifyingGlassIcon, StarIcon, UserCircleIcon, UserGroupIcon
} from '@heroicons/react/24/outline';

import Icon, { ICON_SIZE } from '../icon';

const BottomNav = (): React.ReactNode => (
  <div className="fixed bottom-0 w-full h-48 flex items-center justify-around py-8 px-8 md:px-16 border-t bg-white z-10 dark:bg-gray-500 dark:border-gray-900 md:hidden">
    <Link href="/communities"><Icon IconType={UserGroupIcon} size={ICON_SIZE.MEDIUM} title="Communities icon" isInteractable /></Link>
    <Link href="/p"><Icon IconType={DocumentPlusIcon} size={ICON_SIZE.MEDIUM} title="Create post icon" isInteractable /></Link>
    <Link href="/favorites"><Icon IconType={StarIcon} size={ICON_SIZE.MEDIUM} title="Favorites icon" isInteractable /></Link>
    <button type="button" aria-label="Search"><Icon IconType={MagnifyingGlassIcon} size={ICON_SIZE.MEDIUM} title="Search icon" isInteractable /></button>
    <Link href="/user"><Icon IconType={UserCircleIcon} size={ICON_SIZE.MEDIUM} title="User icon" isInteractable /></Link>
  </div>
);

export default BottomNav;
