'use client';

import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { usePathname } from 'next/navigation';

const BottomNavDiv = ({ children }: { children: React.ReactNode }) => {
  const [wentUp, setWentUp] = useState(true);
  const [navHidingEnabled, setNavHidingEnabled] = useState(true);
  const lastScrollY = useRef(0);
  const path = usePathname();

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current) {
      setWentUp(false);
    } else if (currentScrollY <= lastScrollY.current) {
      setWentUp(true);
    }

    lastScrollY.current = currentScrollY;
  }

  useEffect(() => {
    const regex = /\/c\/[^/]+(?!.)/; // Community URL
    if (path === '/' || regex.test(path)) {
      setNavHidingEnabled(true);
    } else {
      setNavHidingEnabled(false);
    }
  }, [path]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={cx('w-full h-48 flex items-center justify-around py-8 px-8 md:px-16 border-t bg-white z-10 dark:bg-black md:hidden backdrop-blur-lg border-gray-200 dark:border-gray-400 bg-opacity-60 dark:bg-opacity-60 fixed transition-all duration-300', (wentUp || !navHidingEnabled) ? 'bottom-0' : '-bottom-48')}>
      { children }
    </div>
  );
};

export default BottomNavDiv;
