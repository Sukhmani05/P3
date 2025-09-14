import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}
export function Card({
  children,
  className = '',
  title,
  subtitle
}: CardProps) {
  return <div className={`bg-card-bg border border-card-border rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:shadow-accent-blue/10 ${className}`}>
      {(title || subtitle) && <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
        </div>}
      {children}
    </div>;
}