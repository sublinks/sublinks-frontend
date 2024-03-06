"use client"

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

interface PopoverProps {
  content: ReactNode,
  direction: PopoverDirection
  children: ReactNode
  openDelay?: number
  closeDelay?: number
  gap?: PopoverGapSize
}

type PopoverDirection =
  | "top"
  | "bottom"
  | "right"
  | "left"

export enum PopoverGapSize {
  NONE,
  SMALL,
  MEDIUM,
  LARGE
}

const Popover = ({ direction, children, content, openDelay = 0, closeDelay = 0, gap=PopoverGapSize.MEDIUM }: PopoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [popoverIsHovered, setPopoverIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const directionClass = useMemo(() => {
    // popover direction. Based on parent element, not entire window
    switch(direction) {
      case 'top':
        switch (gap) {
          case PopoverGapSize.NONE:
            return 'left-1/2 top-0 -translate-x-1/2 -translate-y-full';
          case PopoverGapSize.SMALL:
            return 'left-1/2 top-[-8px] -translate-x-1/2 -translate-y-full';
          case PopoverGapSize.MEDIUM:
            return 'left-1/2 top-[-16px] -translate-x-1/2 -translate-y-full';
          case PopoverGapSize.LARGE:
            return 'left-1/2 top-[-24px] -translate-x-1/2 -translate-y-full';
          default:
            return ''; 
        }
      case 'bottom': {
        switch (gap) {
          case PopoverGapSize.NONE:
            return 'left-1/2 bottom-0 -translate-x-1/2 translate-y-full';
          case PopoverGapSize.SMALL:
            return 'left-1/2 bottom-[-8px] -translate-x-1/2 translate-y-full';
          case PopoverGapSize.MEDIUM:
            return 'left-1/2 bottom-[-16px] -translate-x-1/2 translate-y-full';
          case PopoverGapSize.LARGE:
            return 'left-1/2 bottom-[-24px] -translate-x-1/2 translate-y-full';
          default:
            return ''; 
        }
      }
      case 'right':
        switch (gap) {
          case PopoverGapSize.NONE:
            return 'top-1/2 right-0 translate-x-full -translate-y-1/2';
          case PopoverGapSize.SMALL:
            return 'top-1/2 right-[-8px] translate-x-full -translate-y-1/2';
          case PopoverGapSize.MEDIUM:
            return 'top-1/2 right-[-16px] translate-x-full -translate-y-1/2';
          case PopoverGapSize.LARGE:
            return 'top-1/2 right-[-24px] translate-x-full -translate-y-1/2';
          default:
            return ''; 
        }
      case 'left':
        switch (gap) {
          case PopoverGapSize.NONE:
            return 'top-1/2 left-0 translate-x-full -translate-y-1/2';
          case PopoverGapSize.SMALL:
            return 'top-1/2 left-[-8px] translate-x-full -translate-y-1/2';
          case PopoverGapSize.MEDIUM:
            return 'top-1/2 left-[-16px] translate-x-full -translate-y-1/2';
          case PopoverGapSize.LARGE:
            return 'top-1/2 left-[-24px] translate-x-full -translate-y-1/2';
          default:
            return ''; 
        }
    }
  }, [direction]);

  useEffect(() => {
    if (isHovered || (popoverIsHovered && isOpen)) {
      const timeout = setTimeout(() => {
        setIsOpen(true);
      }, openDelay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, closeDelay);
      return () => clearTimeout(timeout);
    }
  }, [isHovered, popoverIsHovered, openDelay, closeDelay]);

  return (
    <div className='relative'>
      <div
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      <div className='relative z-50'>
        <div onMouseEnter={() => setPopoverIsHovered(true)} onMouseLeave={() => setPopoverIsHovered(false)} className={cx(directionClass, `transition-all duration-200 absolute p-4 rounded-lg bg-[#1d2432] text-xs text-white border-2 border-gray-800 ${isOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-75'}`)}>
          {content}
        </div>
      </div>
    </div>
  );

};

export default Popover;

/*
<div className={cx('p-4 rounded-lg bg-[#1d2432] absolute text-xs text-white border-2 border-gray-800', directionClass)}>
        {children}
      </div>
*/
