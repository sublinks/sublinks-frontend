'use client';

import useScrollHeight from '@/hooks/use-scroll-height';
import React from 'react';
import Image from 'next/image';

const HeaderLogoIcon = ({ icon }: { icon: string }) => {
  const { scrollHeight } = useScrollHeight();

  return (
    <Image
      className={`${scrollHeight > 100 ? 'h-20 w-20 lg:h-32 lg:w-32' : 'h-24 w-24 lg:h-40 lg:w-40'} transition-all duration-300 object-cover`}
      src={icon}
      alt="Site icon"
      width={40}
      height={40}
      priority
    />
  );
};

export default HeaderLogoIcon;
