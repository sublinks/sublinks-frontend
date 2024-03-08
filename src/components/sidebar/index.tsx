'use client';

import React from 'react';
import cx from 'classnames';
import { PersonView, Site } from 'sublinks-js-client';
import SidebarSiteInfo from '../sidebar-siteinfo';
import { ErrorText } from '../text';

interface SidebarProps {
  open: boolean;
  onSwitch: (newState: boolean) => void;
  site?: Site;
  admins?: PersonView[];
}

const errorMessage = 'Something went wrong trying to show site information. Please reload the page to try again.';

const Sidebar = ({
  open, onSwitch, site, admins
}:
SidebarProps) => (
  <div className="flex flex-col md:w-480 relative m-8 mt-0 md:m-0">
    <div
      aria-expanded={open}
      className={cx({
        hidden: !open,
        block: open
      }, 'md:block overflow-hidden bg-secondary dark:bg-secondary-dark w-full md:w-480 p-8 rounded-l-md')}
    >
      {site && admins
        ? <SidebarSiteInfo site={site} admins={admins} onSidebarSwitch={onSwitch} />
        : <ErrorText>{errorMessage}</ErrorText>}
    </div>
  </div>
);

export default Sidebar;
