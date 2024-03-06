'use client';

import Button from '../button';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import cx from 'classnames';

interface SidebarLeftLinkButtonProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarLeftCollapseButton = ({collapsed, setCollapsed}: SidebarLeftLinkButtonProps) => (
  <div className='flex'>
    <Button type='button' onClick={() => setCollapsed(!collapsed)} className={cx('m-8 rounded-3xl px-16 text-white !bg-transparent transition-all duration-300', collapsed ? 'translate-x-1/3 mx-0 left-0' : 'translate-x-0')}>
      <ChevronDoubleLeftIcon className={cx('w-16 transition-all duration-300', collapsed && 'rotate-180')} />
    </Button>
  </div>
);

export default SidebarLeftCollapseButton;