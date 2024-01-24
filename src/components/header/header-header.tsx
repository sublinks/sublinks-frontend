'use client';

import React, { useEffect, useState } from 'react';

const HeaderHeader = ({ children }: { children: React.ReactNode }) => {
  const [minimized, setMinimized] = useState(false);

  function handleScroll() {
    if (window.scrollY > 100) {
      setMinimized(true);
    } else if (window.scrollY <= 100) {
      setMinimized(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 hidden md:flex items-center justify-between ${minimized ? 'h-48 min-h-48' : 'h-64 min-h-64'} px-24 border-b backdrop-blur-lg border-gray-200 dark:border-gray-400 transition-all duration-300 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60`}>
      {children}
    </header>
  );
};

export default HeaderHeader;
