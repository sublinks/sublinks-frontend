import React from 'react';
import cx from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  id?: string;
  ariaLabel?: string;
  active?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  ariaLabel, children, className, id, type, active, onClick
}: ButtonProps) => (
  // Rule doesn't like type being a variable even though types force it to be a valid option
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    aria-label={ariaLabel}
    id={id}
    onClick={onClick}
    className={cx('bg-brand dark:bg-brand-dark hover:bg-opacity-90 rounded-md px-23 py-12', {
      'bg-blue-300 dark:bg-blue-500': active,
      'bg-gray-200 dark:bg-gray-400': active === false
    }, className)}
  >
    {children}
  </button>
);

export default Button;
