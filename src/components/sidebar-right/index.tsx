import { BookmarkIcon, BuildingLibraryIcon, EllipsisHorizontalIcon, GlobeAltIcon, HomeIcon, MagnifyingGlassCircleIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import Divider from '../divider';
import * as testData from '../../../test-instance-data.json';
import { GetSiteResponse } from 'sublinks-js-client';
import sublinksClient from '@/utils/client';
import Image from 'next/image';
import SidebarRightLayout from './sidebar-right-layout';

const SidebarRight = async () => {
  const instance = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL ? await sublinksClient().getSite()
    : testData as unknown as GetSiteResponse;

  return (
    <SidebarRightLayout>
      <div className='relative'>
        
      </div>
    </SidebarRightLayout>
  )
};

export default SidebarRight;