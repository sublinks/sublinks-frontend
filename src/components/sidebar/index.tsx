'use client';

import React from 'react';
import cx from 'classnames';
import { PersonView, Site } from 'sublinks-js-client';
import SidebarSiteInfo from '../sidebar-siteinfo';

interface SidebarProps {
  open: boolean;
  onSwitch: (newState: boolean) => void;
  site: Site;
  admins: PersonView[];
}

const Sidebar = ({
  open, onSwitch, site, admins
}:
SidebarProps) => (
  <div className="flex flex-col md:flex-row relative m-8 mt-0 md:m-0">
    <div
      aria-expanded={open}
      className={cx({
        hidden: !open,
        block: open
      }, 'md:block overflow-hidden bg-secondary dark:bg-secondary-dark w-full md:w-480 p-8')}
    >
      <SidebarSiteInfo site={site} admins={admins} onSidebarSwitch={onSwitch} />
    </div>
  </div>
);

export default Sidebar;
