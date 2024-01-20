'use client';

import {
  Button
} from '@/components/TailwindMaterial';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import cx from 'classnames';
import { PersonView, Site } from 'sublinks-js-client';
import { useLocalStorage } from '@/utils/localstorage';
import Icon, { ICON_SIZE } from '../icon';
import SidebarSiteInfo from '../sidebar-siteinfo';

interface SidebarProps {
  open?: boolean;
  onSwitch?: (newState: boolean) => void;
  site: Site;
  admins: PersonView[];
}

const Sidebar = ({
  open, onSwitch, site, admins
}:
SidebarProps) => {
  const [hidden, setHidden] = useLocalStorage<boolean>('sidebar', true);

  useEffect(() => {
    if (open !== undefined) setHidden(open);
  }, [open, setHidden]);

  useEffect(() => {
    console.log('Sidebar hidden:', hidden);
  }, [hidden]);
  return (
    <div className="flex flex-row relative">
      <Button
        onClick={() => {
          setHidden(!hidden);
          if (onSwitch) {
            onSwitch(!hidden);
          }
        }}
        placeholder={!hidden ? 'Close' : 'Open'}
        className="rounded-r-none h-48 bg-secondary dark:bg-secondary-dark"
      >
        <Icon className="bg-none" IconType={hidden ? ChevronLeftIcon : ChevronRightIcon} size={ICON_SIZE.MEDIUM} />
      </Button>
      <div
        aria-expanded={!hidden}
        className={cx({
          hidden,
          visible: !hidden
        }, 'overflow-hidden bg-secondary dark:bg-secondary-dark w-480 p-8')}
      >
        <SidebarSiteInfo site={site} admins={admins} />
      </div>
    </div>
  );
};

export default Sidebar;
