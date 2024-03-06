"use client"

interface VoteButtonProps {
  children: React.ReactNode,
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string;
}

const VoteButton = ({ children, label, onClick, className }: VoteButtonProps) => (
  <button
    className={className}
    type="button"
    onClick={e => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
    }}
    aria-label={label}
  >
    {children}
  </button>
);

export default VoteButton;