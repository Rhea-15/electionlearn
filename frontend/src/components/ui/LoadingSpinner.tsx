const LoadingSpinner = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const dimensions = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`
        ${dimensions[size]}
        border-primary/20
        border-t-primary
        rounded-full
        animate-spin
      `}></div>
    </div>
  );
};

export default LoadingSpinner;
