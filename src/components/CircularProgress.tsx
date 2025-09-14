// import React from 'react';
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}
export function CircularProgress({
  value,
  size = 160,
  strokeWidth = 12,
  label,
  className = ''
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - value / 100 * circumference;
  // Determine color based on value
  let colorClass = '';
  if (value < 50) {
    colorClass = 'text-critical';
  } else if (value < 80) {
    colorClass = 'text-warning';
  } else {
    colorClass = 'text-success';
  }
  return <div className={`relative flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke="#2A2A3A" fill="transparent" />
        {/* Progress circle with gradient */}
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke="url(#gradient)" fill="transparent" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#29A8FF" />
            <stop offset="100%" stopColor="#6C63FF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{value}</span>
        {label && <span className="text-sm text-gray-400 mt-1">{label}</span>}
      </div>
    </div>;
}