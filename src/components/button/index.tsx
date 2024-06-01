import React from 'react';
import cx from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  palette?: 'brand' | 'pale';
  id?: string;
  ariaLabel?: string;
  active?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  ariaLabel, children, className, disabled, id, type, palette, active, onClick
}: ButtonProps) => (
  // Rule doesn't like type being a variable even though types force it to be a valid option
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    aria-label={ariaLabel}
    id={id}
    disabled={disabled}
    onClick={onClick}
    className={cx(
      'rounded-md px-23 py-12',
      palette === 'pale' ? 'bg-gray-200 dark:bg-gray-400' : 'bg-brand dark:bg-brand-dark',
      {
        '!bg-blue-300 !dark:bg-blue-500': active,
        'hover:bg-opacity-90': !disabled,
        'bg-opacity-50': disabled
      },
      className
    )}
  >
    {children}
  </button>
);

export default Button;
