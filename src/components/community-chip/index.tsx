'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import {
  Community, CommunityView, GetSiteResponse, Site,
} from 'sublinks-js-client';
import {formatDistanceToNow} from 'date-fns';

import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Icon, { ICON_SIZE } from '../icon';
import Popover, { PopoverGapSize } from '../popover';
import Markdown from '../markdown';
import { getCommunityInstanceFromUrl, getCommunityNameFromUrl } from '@/utils/communities';
import sublinksClient from '@/utils/client';
import { mdToHtml } from '@/utils/markdown';
import { createPortal } from 'react-dom';
import Divider from '../divider';
import { ChatBubbleLeftIcon, DocumentIcon, EllipsisHorizontalCircleIcon, QuestionMarkCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import { compactNumber } from '@/utils/number';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface CommunityChipProps {
  name: string
  icon?: string
  displayName?: string
}

const CommunityChip = ({
  name, icon, displayName
}: CommunityChipProps) => {
  const [site, setSite] = useState<Site>();
  const [bioMarkdown, setBioMarkdown] = useState<string | JSX.Element | JSX.Element[]>('');
  const [community, setCommunity] = useState<Community>();
  const [communityView, setCommunityView] = useState<CommunityView>();
  const [loading, setLoading] = useState(false);

  const handleHover = async () => {
    if (loading) return;
    setLoading(true);
    
    const localcom = await sublinksClient().getCommunity({name: name});

      if (!localcom.community_view) return;

      setCommunityView(localcom.community_view);
      setCommunity(localcom.community_view.community);
      setSite(localcom.site);
      
      if (localcom.community_view.community.description) {
        setBioMarkdown(await mdToHtml(localcom.community_view.community.description, localcom.site?.actor_id || ''));
      } else {
        setBioMarkdown('');
      }
  };

  return (
    <Popover handleHover={handleHover} direction='bottom' darkenBackground={true} openDelay={1000} closeDelay={300} gap={PopoverGapSize.NONE} content={
      <div>
        {
          (
            community ?
            (
              community.banner ? (
                <Image src={community.banner} alt={`${community.name}'s banner`} style={{width: "100%"}} width={480} height={64} className='h-64 min-h-64 max-h-64 object-cover absolute z-0 inset-0 rounded-lg' />
              ) : (
                <div style={{width: "100%"}} className='h-64 min-h-64 max-h-64 bg-gradient-to-r from-blue-700 to-green-800 rounded-lg absolute z-0 inset-0' />
              )
            ) : (
              <Skeleton height={64} />
            )
          )
        }
        {
          community ? (
            <Image src={community.icon ?? '/logo.png'} alt={`${community.name}'s avatar`} width={64} height={64} className='transform translate-y-1/2 ml-32 relative w-64 h-64 min-w-64 max-w-64 min-h-64 max-h-64 object-cover rounded-xl outline outline-4 outline-[#1d2432] bg-[#1d2432]' />
          ) : (
            <Skeleton height={64} width={64} />
          )
        }
        
        <div className='flex transform ml-112 mt-8 flex-col mr-20'>
          <p className='text-base'>{community?.title || community?.name || <Skeleton />}</p>
          <div className='flex'>
            <p className='text-gray-500'>{community ? `@${getCommunityNameFromUrl(community.actor_id)}` : <Skeleton />}</p>
            <p className='text-gray-600'>{community ? `@${getCommunityInstanceFromUrl(community.actor_id)}` : <Skeleton />}</p>
          </div>
        </div>
        <Markdown className='mt-8 p-8' markdown={bioMarkdown} />
        <Divider />
        <div className='flex gap-8 p-8 text-gray-500'>
          <Popover direction='bottom' content='Posts'>
            <div className='flex gap-4 items-center cursor-default'>
              <DocumentIcon className='w-12 h-12' />
              <p>{compactNumber(communityView?.counts.posts)}</p>
            </div>
          </Popover>
          <Popover direction='bottom' content='Comments'>
            <div className='flex gap-4 items-center cursor-default'>
              <ChatBubbleLeftIcon className='w-12 h-12' />
              <p>{compactNumber(communityView?.counts.comments)}</p>
            </div>
          </Popover>
          <Popover direction='bottom' content='Subscribers'>
            <div className='flex gap-4 items-center cursor-default'>
              <UserIcon className='w-12 h-12' />
              <p>{compactNumber(communityView?.counts.subscribers)}</p>
            </div>
          </Popover>
          <p className='cursor-default'>
            -
          </p>
          <Popover direction='bottom' content='Created At'>
            <div className='flex gap-4 items-center cursor-default'>
              <p>{community ? `Created ${formatDistanceToNow(communityView?.community.published || '', { addSuffix: true })}` : <Skeleton />}</p>
            </div>
          </Popover>
        </div>
      </div>
    }>
      <Link href={`/c/${name}`} className='gap-4 flex items-center text-xs z-10'>
        {icon || community?.icon ? <Image src={icon ?? community?.icon ?? '/logo.png'} alt="alt" width={16} height={16} className='rounded-full max-h-16 max-w-16 bg-transparent' /> : <EllipsisHorizontalCircleIcon className='w-16 h-16' /> }
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 block">{displayName || community?.title || name}</span>
      </Link>
    </Popover>)
};

export default CommunityChip;
