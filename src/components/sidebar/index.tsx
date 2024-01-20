'use client';

import {
  Button
} from '@/components/TailwindMaterial';
import {
  ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon
} from '@heroicons/react/24/outline';
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

  return (
    <div className="flex flex-col md:flex-row relative m-8 mt-0 md:m-0">
      <Button
        onClick={() => {
          setHidden(!hidden);
          if (onSwitch) {
            onSwitch(!hidden);
          }
        }}
        placeholder={!hidden ? 'Close' : 'Open'}
        className="rounded-r-none h-48 bg-secondary dark:bg-secondary-dark hidden md:block"
      >
        <Icon className="bg-none" IconType={hidden ? ChevronLeftIcon : ChevronRightIcon} size={ICON_SIZE.MEDIUM} />
      </Button>
      <div
        aria-expanded={!hidden}
        className={cx({
          hidden,
          visible: !hidden
        }, 'overflow-hidden bg-secondary dark:bg-secondary-dark w-full md:w-480 p-8')}
      >
        <SidebarSiteInfo site={site} admins={admins} />
      </div>
      <Button
        onClick={() => {
          setHidden(!hidden);
          if (onSwitch) {
            onSwitch(!hidden);
          }
        }}
        placeholder={!hidden ? 'Close' : 'Open'}
        className="rounded-t-none h-24 bg-secondary dark:bg-secondary-dark block md:hidden items-center"
      >
        <Icon className="bg-none ml-auto mr-auto" IconType={hidden ? ChevronDownIcon : ChevronUpIcon} size={ICON_SIZE.VERYSMALL} />
      </Button>
    </div>
  );
};

export default Sidebar;
