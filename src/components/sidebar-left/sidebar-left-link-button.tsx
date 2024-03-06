'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { BodyText } from '../text';
import { usePathname } from 'next/navigation'
import cx from 'classnames';
import Popover from '../popover';

interface SidebarLeftLinkButtonProps {
  text: string;
  icon: ReactNode;
  href: string;
  requiresAuth: boolean;
}

const SidebarLeftLinkButton = ({ text, icon, href, requiresAuth }: SidebarLeftLinkButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [width, setWidth] = useState(240);
  const pathname = usePathname()
  const isCurrentPage = pathname === href;
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn] = useState(false);
  
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        const newWidth = entry.contentRect.width;
        setWidth(newWidth);
      }
    });

    // Start observing the element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function
    return () => {
      observer.disconnect(); // Stop observing when component unmounts
    };
  }, []);
  
  return (
    <div className='relative'>
      {(requiresAuth && !isLoggedIn) ? (
        <span className={cx('relative flex items-center py-8 gap-16 group rounded-3xl text-gray-500', width < 100 ? 'justify-center px-0' : 'px-16')} ref={ref}>
          {icon}
          {width >= 100 && (<BodyText className='text-sm text-gray-500 dark:text-gray-500'>{text}</BodyText>)}
        </span>
      ) : (
        <Link onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} href={href} className={cx('relative flex items-center py-8 gap-16 group rounded-3xl transition-all duration-300 hover:bg-opacity-5 hover:bg-white hover:dark:text-yellow-400 hover:text-yellow-400', width < 100 ? 'justify-center px-0' : 'px-16', isCurrentPage ? 'text-green-400 dark:text-green-400 text-opacity-50 bg-green-400 bg-opacity-15' : 'text-black dark:text-white')} ref={ref}>
          <div className='group-hover:animate-growAndShrink'>
            {icon}
          </div>
          {width >= 100 && (<BodyText className={cx('text-sm group-hover:dark:text-yellow-400 group-hover:text-yellow-400 transition-all duration-300', isCurrentPage && 'text-green-400 dark:text-green-400 text-opacity-50')}>{text}</BodyText>)}
        </Link>
      )}
      <Popover show={isHovered} direction='right'>
        <p>{text}</p>
      </Popover>
    </div>
  )
};

/*
{width >= 100 && (<BodyText className={cx('text-sm group-hover:dark:text-yellow-400 group-hover:text-yellow-400 transition-all duration-300', isCurrentPage && 'text-green-400 dark:text-green-400 text-opacity-50')}>{text}</BodyText>)}
*/


export default SidebarLeftLinkButton;