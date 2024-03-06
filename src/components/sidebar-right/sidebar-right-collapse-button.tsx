'use client';

import { ArrowLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Button from '../button';
import cx from 'classnames';

interface SidebarRightCollapseButtonProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarRightCollapseButton = ({collapsed, setCollapsed}: SidebarRightCollapseButtonProps) => (
  <div className='flex'>
    <Button type='button' onClick={() => setCollapsed(!collapsed)} className={cx('m-8 rounded-3xl px-16 text-white !bg-transparent transition-all duration-300', collapsed ? 'translate-x-1/3 mx-0 right-0' : 'translate-x-0')}>
      <ChevronDoubleRightIcon className={cx('w-16 transition-all duration-300', collapsed && 'rotate-180')} />
    </Button>
  </div>
);

export default SidebarRightCollapseButton;