import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'gradient' | 'outlined' | 'text';
  colorType?: 'primary' | 'secondary' | 'error';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'filled',
  colorType = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  // Base classes for the button
  const baseClasses = 'px-6 py-2.5 rounded-full font-label-md text-label-md transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer border-none flex items-center justify-center gap-2';

  // Variant classes based on color Type
  const variants = {
    filled: {
      primary: 'bg-[#003c90] text-white hover:bg-[#0f52ba] shadow-md hover:shadow-lg',
      secondary: 'bg-[#006c49] text-white hover:bg-[#008f60] shadow-md hover:shadow-lg',
      error: 'bg-[#ba1a1a] text-white hover:bg-[#dc2626] shadow-md hover:shadow-lg',
    },
    gradient: {
      primary: 'bg-gradient-to-r from-[#003c90] to-[#0f52ba] text-white hover:opacity-95 shadow-md hover:shadow-lg',
      secondary: 'bg-gradient-to-r from-[#006c49] to-[#008f60] text-white hover:opacity-95 shadow-md hover:shadow-lg',
      error: 'bg-gradient-to-r from-[#ba1a1a] to-[#dc2626] text-white hover:opacity-95 shadow-md hover:shadow-lg',
    },
    outlined: {
      primary: 'border border-[#003c90] text-[#003c90] bg-transparent hover:bg-[#eff4ff]',
      secondary: 'border border-[#006c49] text-[#006c49] bg-transparent hover:bg-[#e6f4ef]',
      error: 'border border-[#ba1a1a] text-[#ba1a1a] bg-transparent hover:bg-[#fff5f5]',
    },
    text: {
      primary: 'text-[#003c90] bg-transparent hover:bg-[#eff4ff]',
      secondary: 'text-[#006c49] bg-transparent hover:bg-[#e6f4ef]',
      error: 'text-[#ba1a1a] bg-transparent hover:bg-[#fff5f5]',
    },
  };

  const selectedVariant = variants[variant]?.[colorType] || variants.filled.primary;

  return (
    <button
      className={`${baseClasses} ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
