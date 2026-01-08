import React, { forwardRef } from 'react';

// Utility function for robust class merging (mimicking clsx/twMerge behavior for this file)
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Spinner component for loading state
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const baseClasses =
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap';

const variantClasses = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500 focus-visible:ring-offset-white',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400 focus-visible:ring-offset-white',
  outline:
    'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-400 focus-visible:ring-offset-white',
  ghost:
    'hover:bg-gray-100 text-gray-900 focus-visible:ring-gray-400 focus-visible:ring-offset-white',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 focus-visible:ring-offset-white',
  link: 'text-indigo-600 underline-offset-4 hover:underline focus-visible:ring-indigo-500 focus-visible:ring-offset-white h-auto p-0',
};

const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 py-2 text-base',
  lg: 'h-11 px-6 text-lg',
  icon: 'h-10 w-10 p-0',
};

/**
 * A versatile button component supporting different variants, sizes, loading states,
 * and rendering as a button or an anchor tag.
 */
const Button = forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the element type: 'a' if href is provided, otherwise 'button'
    const Component = props.href ? 'a' : 'button';

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    return (
      <Component
        className={classes}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner />}
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;