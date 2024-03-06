'use client';

import { ReactNode, useState } from 'react';
import cx from 'classnames';
import SidebarLeftCollapseButton from './sidebar-right-collapse-button';
import useScrollHeight from '@/hooks/use-scroll-height';
import SidebarRightCollapseButton from './sidebar-right-collapse-button';

const SidebarRightLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { scrollHeight } = useScrollHeight();

  return (
    <div className={cx('bg-white bg-opacity-5 fixed bottom-0 transition-all duration-300', collapsed ? 'w-80' : 'w-240', scrollHeight > 100 ? 'top-48' : 'top-64')}>
      <div className='flex-col justify-between h-full'>
        {children}
        <SidebarRightCollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </div>
  );
};

export default SidebarRightLayout;
