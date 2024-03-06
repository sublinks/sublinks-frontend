import React, { useEffect, useState } from 'react';
import { PersonView, Site } from 'sublinks-js-client';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { mdToHtml } from 'sublinks-markdown';
import PersonBadge from '../person-badge';
import Markdown from '../markdown';
import Collapsable from '../collapsable';
import { BodyText, H1 } from '../text';
import Icon, { ICON_SIZE } from '../icon';
import Button from '../button';

interface SidebarSiteInfoProps {
  site: Site;
  admins: PersonView[],
  onSidebarSwitch?: (newState: boolean) => void
}

const SidebarSiteInfo = ({
  site,
  admins,
  onSidebarSwitch
}:
SidebarSiteInfoProps) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Collapsable open={open} onSwitch={setOpen} title="Admins" contentClassName="flex flex-row flex-wrap max-w-full">
      {admins.map(x => (
        <PersonBadge key={x.person.name} person={x.person} />
      ))}
    </Collapsable>
  );
};

export default SidebarSiteInfo;
