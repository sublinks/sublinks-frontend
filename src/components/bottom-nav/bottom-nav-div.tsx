'use client';

import useScrollHeight from '@/hooks/use-scroll-height';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { usePathname } from 'next/navigation';

const BottomNavDiv = ({ children }: { children: React.ReactNode }) => {
  const { wentUp } = useScrollHeight();
  const [navHidingEnabled, setNavHidingEnabled] = useState(true);
  const path = usePathname();

  useEffect(() => {
    const regex = /\/c\//; // Paths for communities & posts (both share being after c)
    setNavHidingEnabled(path === '/' || regex.test(path));
  }, [path]);

  return (
    <div className={cx('w-full h-48 flex items-center justify-around p-8 border-t bg-white z-10 dark:bg-black md:hidden backdrop-blur-lg border-gray-200 dark:border-gray-400 bg-opacity-60 dark:bg-opacity-60 fixed transition-all duration-300', (wentUp || !navHidingEnabled) ? 'bottom-0' : '-bottom-48')}>
      { children }
    </div>
  );
};

export default BottomNavDiv;
