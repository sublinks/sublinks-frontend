"use client"

import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';

interface PopoverProps {
  content: ReactNode,
  direction: PopoverDirection
  children: ReactNode
  openDelay?: number
  closeDelay?: number
  gap?: PopoverGapSize
  darkenBackground?: boolean
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

const Popover = ({ direction, children, content, openDelay = 0, closeDelay = 0, gap=PopoverGapSize.MEDIUM, darkenBackground=false }: PopoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [popoverIsHovered, setPopoverIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const childRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const styleClass = useMemo(() => {
    const rect = childRef.current?.getBoundingClientRect();
    const pop = popoverRef.current?.getBoundingClientRect();

    //console.log(childRef.current?.parentElement?.tagName, rect)

    if (rect) {
      switch(direction) {
        case 'bottom': {
          switch(gap) {
            case PopoverGapSize.NONE: {
              return {
                top: rect.bottom,
                left: rect.left + rect.width / 2,
              }
            }
            case PopoverGapSize.SMALL: {
              return {
                top: rect.bottom + 8,
                left: rect.left + rect.width / 2,
              }
            }
            case PopoverGapSize.MEDIUM: {
              return {
                top: rect.bottom + 16,
                left: rect.left + rect.width / 2,
              }
            }
            case PopoverGapSize.LARGE: {
              return {
                top: rect.bottom + 24,
                left: rect.left + rect.width / 2,
              }
            }
          }
        }
        case 'left': {
          switch(gap) {
            case PopoverGapSize.NONE: {
              return {
                top: rect.top + rect.height / 2,
                left: rect.left - (pop?.width || 0) - rect.width / 2,
              }
            }
            case PopoverGapSize.SMALL: {
              return {
                top: rect.top + rect.height / 2,
                left: rect.left - (pop?.width || 0) - rect.width / 2 - 8,
              }
            }
            case PopoverGapSize.MEDIUM: {
              return {
                top: rect.top + rect.height / 2,
                left: rect.left - (pop?.width || 0) - rect.width / 2 - 16,
              }
            }
            case PopoverGapSize.LARGE: {
              return {
                top: rect.top + rect.height / 2,
                left: rect.left - (pop?.width || 0) - rect.width / 2 - 24,
              }
            }
          }
        }
        case 'right': {
          switch(gap) {
            case PopoverGapSize.NONE: {
              return {
                top: rect.top + rect.height / 2,
                left: rect.right,
              }
            }
            case PopoverGapSize.SMALL: {
              return {
                top: rect.top + rect.height / 2,
                left: rect.right + 8,
              }
            }
            case PopoverGapSize.MEDIUM: {
              return {
                top: rect.top + rect.height / 2,
                left: rect.right + 16,
              }
            }
            case PopoverGapSize.LARGE: {
              return {
                top: rect.top + rect.height / 2,
                left: rect.right + 24,
              }
            }
          }
        }
        case 'top': { // NOTE probably need to change bottom to be top and like the left direction
          switch(gap) {
            case PopoverGapSize.NONE: {
              return {
                bottom: rect.top,
                left: rect.left + rect.width / 2,
              }
            }
            case PopoverGapSize.SMALL: {
              return {
                bottom: rect.top - 8,
                left: rect.left + rect.width / 2,
              }
            }
            case PopoverGapSize.MEDIUM: {
              return {
                bottom: rect.top - 16,
                left: rect.left + rect.width / 2,
              }
            }
            case PopoverGapSize.LARGE: {
              return {
                bottom: rect.top - 24,
                left: rect.left + rect.width / 2,
              }
            }
          }
        }
      }
    }
  }, [direction, gap, childRef.current, popoverRef.current]);

  const directionClass = useMemo(() => {
    // popover direction. Based on parent element, not entire window
    switch(direction) {
      case 'top':
        return '-translate-x-1/2'
      case 'bottom': {
        return '-translate-x-1/2';
      }
      case 'right':
        return '-translate-y-1/2';
      case 'left':
        return '-translate-y-1/2';
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
    <span className='relative' ref={childRef}>
      <span
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>
      {darkenBackground && isMounted && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 49,
          pointerEvents: 'none',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 400ms ease-in-out'
        }} />,
        document.body
      )}
      {isMounted && createPortal(
        <div ref={popoverRef} onMouseEnter={() => setPopoverIsHovered(true)} onMouseLeave={() => setPopoverIsHovered(false)} style={styleClass} className={cx(`transition-all z-50 max-w-480 drop-shadow-md duration-200 absolute p-4 rounded-lg bg-[#1d2432] text-xs text-white border-2 border-gray-800`, directionClass, isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-75 opacity-0 pointer-events-none')}>
          {content}
        </div>,
        document.body
      )}
    </span>
  );

};

export default Popover;

/*
<div className={cx('p-4 rounded-lg bg-[#1d2432] absolute text-xs text-white border-2 border-gray-800', directionClass)}>
        {children}
      </div>
*/
