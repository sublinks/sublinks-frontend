'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const HeaderLogoIcon = ({ icon }: { icon: string }) => {
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
    <Image
      className={`${minimized ? 'h-20 w-20 lg:h-32 lg:w-32' : 'h-24 w-24 lg:h-40 lg:w-40'} transition-all duration-300`}
      src={icon}
      alt="Site icon"
      width={40}
      height={40}
      priority
    />
  );
};

export default HeaderLogoIcon;
