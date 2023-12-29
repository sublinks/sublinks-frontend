import React from 'react';
import cx from 'classnames';

interface LinkButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  id?: string;
  ariaLabel?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LinkButton = ({
  ariaLabel, children, className, id, type, onClick
}: LinkButtonProps) => (
  // Rule doesn't like type being a variable even though types force it to be a valid option
  // eslint-disable-next-line react/button-has-type
  <button type={type} aria-label={ariaLabel} id={id} onClick={onClick} className={cx('text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-400', className)}>{children}</button>
);

export default LinkButton;
