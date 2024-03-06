'use client';

import React from 'react';
import cx from 'classnames';
import { PersonView, Site } from 'sublinks-js-client';
import SidebarSiteInfo from '../sidebar-siteinfo';

const open = true

interface SidebarProps {
  site: Site;
  admins: PersonView[];
}

const Sidebar = ({
  site, admins
}:
SidebarProps) => (
  <div className="flex flex-col relative m-8 mt-0 md:m-0">
    <div
      aria-expanded={open}
      className={cx({
        hidden: !open,
        block: open
      }, 'md:block overflow-hidden bg-white bg-opacity-5 w-full p-8  rounded-lg')}
    >
      <SidebarSiteInfo site={site} admins={admins} onSidebarSwitch={() => {}} />
    </div>
  </div>
);

export default Sidebar;
