import React from 'react';
import Image from 'next/image';

const Header = () => (
  <header className="flex justify-between p-2">
    <Image
      src="/logo.png"
      alt="Sublinks logo"
      width={32}
      height={32}
      priority
    />
    <div className="md:w-1/2 lg:w-1/3 border">
      SEARCH
    </div>
    <div className="border">
      USER ACTIONS
    </div>
  </header>
);

export default Header;
