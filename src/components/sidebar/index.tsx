'use client';

import {
  Button
} from '@/components/TailwindMaterial';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Site } from 'sublinks-js-client';
import Icon, { ICON_SIZE } from '../icon';
import SidebarSiteInfo from '../sidebar-siteinfo';

interface SidebarProps {
  open?: boolean;
  onSwitch?: (newState: boolean) => void;
  site: Site;
}

const Sidebar = ({
  open, onSwitch, site
}:
SidebarProps) => {
  const [active, setActive] = useState(open || false);

  useEffect(() => {
    setActive(open || false);
  }, [open]);

  return (
    <div className="flex flex-row">
      <Button
        onClick={() => {
          setActive(!active);
          if (onSwitch) {
            onSwitch(!active);
          }
        }}
        className="rounded-r-none h-48"
      >
        <Icon IconType={active ? ChevronLeftIcon : ChevronRightIcon} size={ICON_SIZE.MEDIUM} />
      </Button>
      <div className={cx({
        hidden: active,
        visible: !active
      }, 'transition-all overflow-hidden bg-secondary w-240')}
      >
        <SidebarSiteInfo site={site} />
      </div>
    </div>
  );
};

export default Sidebar;
