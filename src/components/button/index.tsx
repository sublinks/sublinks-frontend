import React from 'react';
import cx from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  id: string;
  ariaLabel?: string;
  className?: string;
}

const Button = ({
  ariaLabel, children, className, id, type
}: ButtonProps) => (
  // Rule doesn't like type being a variable even though types force it to be a valid option
  // eslint-disable-next-line react/button-has-type
  <button type={type} aria-label={ariaLabel} id={id} className={cx('bg-brand dark:bg-brand-dark hover:bg-opacity-90 rounded-md px-23 py-12', className)}>{children}</button>
);

export default Button;
