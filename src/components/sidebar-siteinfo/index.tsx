import React from 'react';
import { PersonView, Site } from 'sublinks-js-client';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import { useLocalStorage } from '@/utils/localstorage';
import { XMarkIcon } from '@heroicons/react/24/outline';
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
const SidebarItemClassname = 'border-t border-gray-500';

const SidebarSiteInfo = ({
  site,
  admins,
  onSidebarSwitch
}:
SidebarSiteInfoProps) => {
  const [descriptionOpen, setDescriptionOpen] = useLocalStorage('description', true);
  const [informationOpen, setInformationOpen] = useLocalStorage('information', true);
  const [adminOpen, setAdminOpen] = useLocalStorage('admin', true);
  return (
    <div className="flex flex-col">
      {site.banner && (<Image src={site.banner} alt="Site Banner" />)}
      <div className="flex flex-row">
        <H1 className="font-bold dark:text-primary pb-8 flex-grow">{site.name}</H1>
        {onSidebarSwitch && (
        <Button
          type="button"
          className="h-24 px-2 pt-0 pb-0 sticky md:hidden rounded-sm top-4 right-4"
          onClick={() => {
            if (onSidebarSwitch) {
              onSidebarSwitch(true);
            }
          }}
        >
          <Icon IconType={XMarkIcon} size={ICON_SIZE.SMALL} />
        </Button>
        )}
      </div>
      <div className="flex flex-col max-h-screenheight md:max-h-1000 overflow-auto border-t border-gray-500">
        {site.description && (
        <Collapsable
          open={descriptionOpen}
          onSwitch={setDescriptionOpen}
          title="Description"
          contentClassName="flex flex-row"
          containerClassName={SidebarItemClassname}
        >
          <BodyText className="dark:text-primary border-y border-gray-500 pb-8 pt-4">{site.description}</BodyText>
        </Collapsable>
        )}
        {site.sidebar && (
        <Collapsable open={informationOpen} onSwitch={setInformationOpen} title="Information" contentClassName="flex flex-row" containerClassName={SidebarItemClassname}>
          <Markdown remarkPlugins={[remarkGfm]} className="text-sm dark:text-primary flex max-h-full">{site.sidebar}</Markdown>
        </Collapsable>
        )}
      </div>

      <Collapsable open={adminOpen} onSwitch={setAdminOpen} title="Admins" contentClassName="flex flex-row" containerClassName={SidebarItemClassname}>
        {admins.map(x => (
          <PersonBadge key={x.person.name} person={x.person} />
        ))}
      </Collapsable>
    </div>
  );
};

export default SidebarSiteInfo;
