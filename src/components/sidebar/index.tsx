'use client';

import {
  ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/24/outline';
import React from 'react';
import cx from 'classnames';
import { PersonView, Site } from 'sublinks-js-client';
import Icon, { ICON_SIZE } from '../icon';
import SidebarSiteInfo from '../sidebar-siteinfo';
import Button from '../button';

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
    <Button
      onClick={() => {
        if (onSwitch) {
          onSwitch(!open);
        }
      }}
      className="rounded-r-none h-48 bg-secondary dark:bg-secondary-dark hidden md:block"
      type="button"
    >
      <Icon IconType={open ? ChevronLeftIcon : ChevronRightIcon} size={ICON_SIZE.MEDIUM} />
    </Button>
    <div
      aria-expanded={!open}
      className={cx({
        hidden: open,
        block: !open
      }, 'overflow-hidden bg-secondary dark:bg-secondary-dark w-full md:w-480 p-8')}
    >
      <SidebarSiteInfo site={site} admins={admins} onSidebarSwitch={onSwitch} />
    </div>
  </div>
);

export default Sidebar;
