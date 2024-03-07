'use client';

import { ReactNode, useEffect, useState } from 'react';
import cx from 'classnames';
import SidebarLeftCollapseButton from './sidebar-left-collapse-button';
import useScrollHeight from '@/hooks/use-scroll-height';
import { useSwipeable } from 'react-swipeable';

const SidebarLeftLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [actuallyCollapsed, setActuallyCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const { scrollHeight } = useScrollHeight();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Call the handleResize function to set the initial width
    handleResize();

    // Clean up the event listener when the component is unmounted
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActuallyCollapsed(windowWidth <= 1024 || collapsed);
  }, [windowWidth, collapsed]);

  const handlers = useSwipeable({
    onSwipedLeft: () => console.log('You swiped left.'),
    onSwipedRight: () => console.log('You swiped right.'),
    // Add more handlers as needed
  });

  return <div {...handlers}>
      <div className={cx(actuallyCollapsed ? 'w-80' : 'w-240', 'transition-all duration-300')} />
      <div className={cx('bg-white bg-opacity-5 fixed bottom-0 transition-all duration-300', actuallyCollapsed ? 'w-80' : 'w-240', scrollHeight > 100 ? 'top-48' : 'top-64')}>
        <div className='flex-col justify-between h-full'>
          {children}
          {(windowWidth > 1024) && <SidebarLeftCollapseButton collapsed={actuallyCollapsed} setCollapsed={setCollapsed} />}
        </div>
      </div>
    </div>
  ;
};

export default SidebarLeftLayout;
