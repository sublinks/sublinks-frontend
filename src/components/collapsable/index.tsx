'use client';

import React, { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
import LinkButton from '../button-link';

interface CollapsableProps {
  open?: boolean;
  onSwitch?: (newState: boolean) => void;
  children: React.ReactNode;
  containerClassName?: string;
  buttonClassName?: string;
  contentClassName?: string;
  showIcon?: boolean;
  title?: string;
}

const Collapsable = ({
  open, onSwitch, children, containerClassName, buttonClassName, contentClassName, showIcon, title
}:
CollapsableProps) => {
  const [active, setActive] = useState(open !== undefined ? open : false);

  const handleSwitch = () => {
    if (onSwitch) {
      onSwitch(!active);
    } else {
      setActive(!active);
    }
  };

  useEffect(() => {
    if (open !== undefined) setActive(open);
  }, [open, setActive]);

  return (
    <div className={cx('flex flex-col', containerClassName)}>
      <LinkButton type="button" ariaLabel="Collapsable open/close button" onClick={handleSwitch} className={cx(buttonClassName)}>
        {title}
        {showIcon && (
        <ChevronUpIcon
          className={cx(
            'float-end inline-block ml-2 w-24 text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-400',
            {
              'transform rotate-180': !active,
              'transform rotate-0': active
            }
          )}
        />
        )}
      </LinkButton>
      <div
        aria-expanded={active}
        className={cx({
          hidden: !active,
          visible: active
        }, contentClassName)}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsable;
