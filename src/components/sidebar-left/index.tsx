import SidebarLeftLinkButton from './sidebar-left-link-button';
import { BookmarkIcon, BuildingLibraryIcon, EllipsisHorizontalIcon, GlobeAltIcon, HomeIcon, MagnifyingGlassCircleIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import SidebarLeftLayout from './sidebar-left-layout';
import Divider from '../divider';
import * as testData from '../../../test-instance-data.json';
import { GetSiteResponse } from 'sublinks-js-client';
import sublinksClient from '@/utils/client';
import Image from 'next/image';
import { BodyText } from '../text';
import cx from 'classnames';

const SidebarLeft = async () => {
  const instance = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL ? await sublinksClient().getSite()
    : testData as unknown as GetSiteResponse;

  return (
    <SidebarLeftLayout>
      <div className='relative'>
        <Image src={instance.site_view.site.banner || '/logo.png'} alt="Site Icon" width={240} height={96} className="w-full h-96 max-h-96 object-cover absolute"  style={{ maskImage: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)' }} />
        
        <div className='flex flex-col mx-8 gap-8 relative'>
          <div className='pt-100'></div>
          <SidebarLeftLinkButton text='Home' requiresAuth={true} icon={<HomeIcon className='w-20 transition-all duration-300' />} href='/test' />
          <SidebarLeftLinkButton text='Local' requiresAuth={false} icon={<BuildingLibraryIcon className='w-20' />} href='/' />
          <SidebarLeftLinkButton text='Global' requiresAuth={false} icon={<GlobeAltIcon className='w-20' />} href='/test' />
          <Divider />
          <SidebarLeftLinkButton text='Bookmarks' requiresAuth={true} icon={<BookmarkIcon className='w-20' />} href='/bookmarks' />
          <SidebarLeftLinkButton text='Announcements' requiresAuth={false} icon={<MegaphoneIcon className='w-20' />} href='/announcements' />
          <SidebarLeftLinkButton text='Explore' requiresAuth={false} icon={<MagnifyingGlassCircleIcon className='w-20' />} href='/search' />
          <SidebarLeftLinkButton text='More' requiresAuth={false} icon={<EllipsisHorizontalIcon className='w-20' />} href='/more' />
          <Divider />
        </div>
      </div>
    </SidebarLeftLayout>
  )
};

export default SidebarLeft;

/*
<div className='w-240 order-2 bg-white bg-opacity-5 flex flex-col w-full items-stretch divide-y divide-slate-700'>
        <div className='flex flex-col w-full items-stretch py-20'>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-25 text-center bg-purple-500 rounded-2xl'>
            <HomeIcon className='w-24' />
            <p>Home</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
            <BuildingLibraryIcon className='w-24' />
            <p>Local</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
            <GlobeAltIcon className='w-24' />
            <p>All</p>
          </Button>
        </div>
        <div className='flex flex-col w-full items-stretch py-20'>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
            <BookmarkIcon className='w-24' />
            <p>Bookmarks</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
           <MegaphoneIcon className='w-24' />
            <p>Announcements</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
            <MagnifyingGlassCircleIcon className='w-24' />
            <p>Explore</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
            <ServerIcon className='w-24' />
            <p>Drive</p>
          </Button>
        </div>
        <div className='flex flex-col w-full items-stretch py-20'>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
            <EllipsisHorizontalIcon className='w-24' />
            <p>More</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
            <Cog6ToothIcon className='w-24' />
            <p>Settings</p>
          </Button>
        </div>
        <div className='flex flex-col w-full items-stretch py-20'>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>c/programming</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>technology@lemmy.world</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>comics</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>lemmy@lemmy.ml</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>fediverse@lemmy.world</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>rust</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>cpp</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>privacy@lemmy.ml</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>linux@lemmy.ml</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>xkcd@lemmy.world</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>196@lemmy.blahaj.zone</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>minecraft_dev</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
          <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>factorio@lemmy.world</p>
          </Button>
          <Button type='button' className='mx-8 py-8 flex justify-center items-center gap-4 w-220 !bg-opacity-0 text-center'>
            <Image src="/logo.png" alt="Site Icon" width={24} height={24} className="w-24 h-24 max-h-24 rounded-full object-cover" />
            <p>java</p>
          </Button>
        </div>
      </div>
*/