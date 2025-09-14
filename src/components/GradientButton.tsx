import React from 'react';
import { Link } from 'react-router-dom';
interface GradientButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}
export function GradientButton({
  children,
  to,
  onClick,
  className = '',
  variant = 'primary'
}: GradientButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2';
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-gradient-to-r from-accent-blue to-accent-purple hover:shadow-lg hover:shadow-accent-blue/20';
      break;
    case 'secondary':
      variantClasses = 'bg-card-bg border border-card-border hover:border-accent-blue';
      break;
    case 'outline':
      variantClasses = 'bg-transparent border border-gradient-to-r from-accent-blue to-accent-purple hover:bg-card-bg';
      break;
  }
  const allClasses = `${baseClasses} ${variantClasses} ${className}`;
  if (to) {
    return <Link to={to} className={allClasses}>
        {children}
      </Link>;
  }
  return <button onClick={onClick} className={allClasses}>
      {children}
    </button>;
}