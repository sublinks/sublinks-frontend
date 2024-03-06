'use client';

import React, { useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
import LinkButton from '../button-link';
import { BodyText } from '../text';

interface CollapsableProps {
  startOpen?: boolean;
  children: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
  hideIcon?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

const ChevronDownIconClassname = 'float-end inline-block ml-2 w-24 text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-400';

const Collapsable = ({
  startOpen, children, containerClassName, contentClassName, hideIcon, title, icon
}: CollapsableProps) => {
  const [open, setOpen] = useState(startOpen !== undefined ? startOpen : false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSwitch = () => {
    setOpen(!open);

    if (contentRef.current) {
      contentRef.current.style.maxHeight = open ? '0px' : `${contentRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={cx('flex flex-col w-full py-8', containerClassName)}>
      <LinkButton type="button" ariaLabel="Collapsable open/close button" onClick={handleSwitch} className='flex justify-between'>
        <div className='flex items-center gap-8'>
          {icon && (<div className='inline-block mr-2 w-20 h-20'>{icon}</div>)}
          {title && (<BodyText className='text-sm'>{title}</BodyText>)}
        </div>
        {!hideIcon && ( open ? (
            <ChevronUpIcon
              className={ChevronDownIconClassname}
            />
          ) : (
            <ChevronDownIcon
              className={ChevronDownIconClassname}
            />
          )
        )}
      </LinkButton>
      <div
        aria-expanded={open}
        ref={contentRef}
        className={cx("transition-all duration-300 overflow-hidden max-h-0", contentClassName)}
      >
        {children}
      </div>
    </div>
  )
};

export default Collapsable;
