'use client';

import useScrollHeight from '@/hooks/use-scroll-height';
import React from 'react';

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  const { scrollHeight } = useScrollHeight();

  return (
    <header className={`sticky top-0 z-40 hidden md:flex items-center justify-between ${scrollHeight > 100 ? 'h-48 min-h-48' : 'h-64 min-h-64'} px-24 border-b backdrop-blur-lg border-gray-200 dark:border-gray-400 transition-all duration-300 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60`}>
      {children}
    </header>
  );
};

export default HeaderLayout;
