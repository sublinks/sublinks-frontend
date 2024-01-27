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
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(true);
  const [informationOpen, setInformationOpen] = useState<boolean>(true);
  const [adminOpen, setAdminOpen] = useState<boolean>(true);

  const [sidebarMarkdown, setSidebarMarkdown] = useState<string>('');

  useEffect(() => {
    const setSidebarMd = async () => {
      if (site.sidebar) {
        setSidebarMarkdown(await mdToHtml(site.sidebar, site.actor_id));
      } else {
        setSidebarMarkdown('');
      }
    };
    setSidebarMd();
  }, [site.actor_id, site.sidebar]);

  return (
    <div className="flex flex-col">
      {site.banner && (<Image src={site.banner} alt="Site Banner" width={400} height={400} className="w-full h-full" />)}
      <div className="flex flex-row">
        <H1 className="font-bold dark:text-primary pb-8 flex-grow">{site.name}</H1>
        {onSidebarSwitch && (
        <Button
          type="button"
          className="h-24 px-2 pt-0 pb-0 sticky md:hidden rounded-sm top-4 right-4"
          onClick={() => {
            if (onSidebarSwitch) {
              onSidebarSwitch(false);
            }
          }}
        >
          <Icon IconType={XMarkIcon} size={ICON_SIZE.SMALL} />
        </Button>
        )}
      </div>
      <div className="flex flex-col max-h-90vh md:max-h-1000 overflow-auto border-t border-gray-500">
        {site.description && (
        <Collapsable
          open={descriptionOpen}
          onSwitch={setDescriptionOpen}
          title="Description"
          contentClassName="flex flex-row"
        >
          <BodyText className="dark:text-primary border-y border-gray-500 pb-8 pt-4">{site.description}</BodyText>
        </Collapsable>
        )}
        {site.sidebar && (
        <Collapsable
          open={informationOpen}
          onSwitch={setInformationOpen}
          title="Informations"
          contentClassName="flex flex-row flex-wrap max-w-full"
        >
          <Markdown markdown={sidebarMarkdown} />
        </Collapsable>
        )}
      </div>

      <Collapsable open={adminOpen} onSwitch={setAdminOpen} title="Admins" contentClassName="flex flex-row flex-wrap max-w-full">
        {admins.map(x => (
          <PersonBadge key={x.person.name} person={x.person} />
        ))}
      </Collapsable>
    </div>
  );
};

export default SidebarSiteInfo;
