import React, { useEffect, useState } from 'react';
import { PersonView, Site } from 'sublinks-js-client';
import Image from 'next/image';
import { ChartBarIcon, DocumentTextIcon, HeartIcon, InformationCircleIcon, ScaleIcon, ServerIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { mdToHtml } from 'sublinks-markdown';
import Markdown from '../markdown';
import Collapsable from '../collapsable';
import { BodyText, H1 } from '../text';
import Icon, { ICON_SIZE } from '../icon';
import Button from '../button';
import LinkButton from '../button-link';
import Popover from '../popover';
import PersonChip from '../person-chip';

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
    <div className="flex flex-col text-sm">
      {site.banner && (<Image src={site.banner} alt="Site Banner" width={400} height={400} className="w-full h-full max-h-100 object-cover rounded-lg" />)}
      <div>
        <div className='flex items-center gap-8'>
        <Image src={site.icon || '/icon.png'} alt="Site Icon" width={60} height={60} className="w-60 h-60 max-h-60 object-cover" />
          <div className='flex flex-col justify-center'>
            <div className="flex flex-row">
              <H1 className="font-bold dark:text-primary flex-grow">{site.name}</H1>
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
            <div className="flex flex-col max-h-90vh md:max-h-1000 overflow-auto">
              {site.description && (
                <BodyText className="dark:text-primary">{site.description}</BodyText>
              )}
            </div>
          </div>
          
        </div>
        </div>

      <div className='flex gap-4 py-8'>
        <Popover content="Modlog" direction='bottom'>
          <LinkButton type="button" className='border rounded p-2'>
            <DocumentTextIcon className="w-24 h-24" />
          </LinkButton>
        </Popover>
        <Popover content="Legal" direction='bottom'>
          <LinkButton type="button" className='border rounded p-2'>
            <ScaleIcon className="w-24 h-24" />
          </LinkButton>
        </Popover>
        <Popover content="Instances" direction='bottom'>
          <LinkButton type="button" className='border rounded p-2'>
            <ServerIcon className="w-24 h-24" />
          </LinkButton>
        </Popover>
        <Popover content="Donate" direction='bottom'>
          <LinkButton type="button" className='border rounded p-2'>
            <HeartIcon className="w-24 h-24" />
          </LinkButton>
        </Popover>
      </div>

      <div className='flex flex-col divide-y'>
        {site.sidebar && (
        <Collapsable
          icon={<InformationCircleIcon />}
          title="Information"
          contentClassName="flex flex-row flex-wrap max-w-full"
        >
          <Markdown markdown={sidebarMarkdown} />
        </Collapsable>
        )}
      
        <Collapsable icon={<ChartBarIcon />} title="Statistics" contentClassName="flex flex-row flex-wrap max-w-full">
          <p>T</p>
        </Collapsable>
        <Collapsable icon={<UserIcon />} title="Admins">
          <div className='flex flex-row flex-wrap max-w-full gap-8 p-8'>
            {admins.map(x => (
              <PersonChip key={x.person.name} person={x.person} />
            ))}
          </div>
        </Collapsable>
        <div className='flex text-slate-400 py-16 gap-8'>
          <ServerIcon className='w-24 h-24' />
          <p>v0.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarSiteInfo;
