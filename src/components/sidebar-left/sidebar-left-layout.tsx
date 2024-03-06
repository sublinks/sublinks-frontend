'use client';

import { ReactNode, useState } from 'react';
import cx from 'classnames';
import SidebarLeftCollapseButton from './sidebar-left-collapse-button';
import useScrollHeight from '@/hooks/use-scroll-height';

const SidebarLeftLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { scrollHeight } = useScrollHeight();

  return (
    <div>
      <div className={cx(collapsed ? 'w-80' : 'w-240', 'transition-all duration-300')} />
      <div className={cx('bg-white bg-opacity-5 fixed bottom-0 transition-all duration-300', collapsed ? 'w-80' : 'w-240', scrollHeight > 100 ? 'top-48' : 'top-64')}>
        <div className='flex-col justify-between h-full'>
          {children}
          <SidebarLeftCollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default SidebarLeftLayout;
