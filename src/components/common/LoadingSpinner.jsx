import React from 'react';

/**
 * A highly customizable, accessible loading spinner component built with Tailwind CSS.
 *
 * @param {object} props
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Defines the size of the spinner.
 * @param {string} [props.color='border-indigo-600'] - Tailwind class for the primary border color (e.g., 'border-red-500').
 * @param {string} [props.className=''] - Additional classes to apply to the spinner container.
 * @returns {JSX.Element}
 */

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
  xl: 'w-16 h-16 border-4',
};

const LoadingSpinner = ({ size = 'md', color = 'border-indigo-600', className = '' }) => {
  const spinnerSizeClasses = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`
        ${spinnerSizeClasses}
        ${color}
        border-t-transparent 
        rounded-full
        animate-spin
        ${className}
      `}
      role="status"
      aria-live="polite"
    >
      {/* Visually hidden text for screen readers */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;