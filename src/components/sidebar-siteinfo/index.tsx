import React from 'react';
import { Site } from 'sublinks-js-client';
import Image from 'next/image';

interface SidebarSiteInfoProps {
  site: Site;
}

const SidebarSiteInfo = ({
  site
}:
SidebarSiteInfoProps) => (
  <div className="flex flex-col">
    {site.banner && (
    <Image src={site.banner} alt="Site Banner" />)}
  </div>
);

export default SidebarSiteInfo;
