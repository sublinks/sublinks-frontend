

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

interface PopoverProps {
  show: boolean,
  direction: PopoverDirection
  children: ReactNode
}

type PopoverDirection =
  | "top"
  | "bottom"
  | "right"
  | "left"

const Popover = ({ show, direction, children }: PopoverProps) => {
  const directionClass = useMemo(() => {
    // popover direction. Based on parent element, not entire window
    switch(direction) {
      case 'top':
        return 'left-1/2 top-[-16px] -translate-x-1/2 -translate-y-full';
      case 'bottom':
        return 'left-1/2 bottom-[-16px] -translate-x-1/2 translate-y-full';
      case 'right':
        return 'top-1/2 right-[-16px] translate-x-full -translate-y-1/2';
      case 'left':
        return 'top-1/2 left-[-16px] -translate-x-full -translate-y-1/2';
    }
  }, [direction]);

  return (
    <div
      className={cx(directionClass, `transition-all duration-200 absolute p-4 rounded-lg bg-[#1d2432] text-xs text-white border-2 border-gray-800 ${show ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`)}
    >
      {children}
    </div>
  );

};

export default Popover;

/*
<div className={cx('p-4 rounded-lg bg-[#1d2432] absolute text-xs text-white border-2 border-gray-800', directionClass)}>
        {children}
      </div>
*/
