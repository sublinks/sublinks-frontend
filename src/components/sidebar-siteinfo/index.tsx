import React from 'react';
import { PersonView, Site } from 'sublinks-js-client';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import { useLocalStorage } from '@/utils/localstorage';
import PersonBadge from '../person-badge';
import Markdown from '../markdown';
import Collapsable from '../collapsable';

interface SidebarSiteInfoProps {
  site: Site;
  admins: PersonView[]
}

const SidebarSiteInfo = ({
  site,
  admins
}:
SidebarSiteInfoProps) => {
  const [descriptionOpen, setDescriptionOpen] = useLocalStorage('description', true);
  const [informationOpen, setInformationOpen] = useLocalStorage('information', true);
  const [adminOpen, setAdminOpen] = useLocalStorage('admin', true);
  return (
    <div className="flex flex-col">
      {site.banner && (
      <Image src={site.banner} alt="Site Banner" />)}
      <h1 className="text-2xl font-bold dark:text-primary pb-8">{site.name}</h1>
      <div className="flex flex-col max-h-1000 overflow-auto border-t border-gray-500">
        {site.description && (
        <Collapsable
          open={descriptionOpen}
          onSwitch={desc => {
            console.log('Description open:', desc);
            setDescriptionOpen(desc);
          }}
          title="Description"
          showIcon
          contentClassName="flex flex-row"
          containerClassName="border-t border-gray-500"
        >
          <p className="text-sm dark:text-primary border-y border-gray-500 pb-8 pt-4">{site.description}</p>
        </Collapsable>
        )}
        {site.sidebar && (
        <Collapsable open={informationOpen} onSwitch={setInformationOpen} title="Information" showIcon contentClassName="flex flex-row" containerClassName="border-t border-gray-500">
          <Markdown remarkPlugins={[remarkGfm]} className="text-sm dark:text-primary flex max-h-full">{site.sidebar}</Markdown>
        </Collapsable>
        )}
      </div>

      <Collapsable open={adminOpen} onSwitch={setAdminOpen} title="Admins" contentClassName="flex flex-row" containerClassName="border-t border-gray-500" showIcon>
        {admins.map(x => (
          <PersonBadge key={x.person.name} person={x.person} />
        ))}
      </Collapsable>
    </div>
  );
};

export default SidebarSiteInfo;
