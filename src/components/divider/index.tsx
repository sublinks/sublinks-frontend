interface DividerProps {
  className?: string;
  height?: string;
}

const Divider = ({ className, height = "1px" }: DividerProps) => {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded-2xl ${className}`} style={{ height: height }} />
  );
};

export default Divider;