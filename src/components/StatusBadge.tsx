// import React from 'react';
type StatusType = 'active' | 'vulnerable' | 'shadow' | 'critical' | 'warning' | 'info' | 'success';
interface StatusBadgeProps {
  status: StatusType;
  text?: string;
}
export function StatusBadge({
  status,
  text
}: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-success/20',
          text: 'text-success',
          label: text || 'Active'
        };
      case 'vulnerable':
        return {
          bg: 'bg-critical/20',
          text: 'text-critical',
          label: text || 'Vulnerable'
        };
      case 'shadow':
        return {
          bg: 'bg-warning/20',
          text: 'text-warning',
          label: text || 'Shadow AI'
        };
      case 'critical':
        return {
          bg: 'bg-critical/20',
          text: 'text-critical',
          label: text || 'Critical'
        };
      case 'warning':
        return {
          bg: 'bg-warning/20',
          text: 'text-warning',
          label: text || 'Warning'
        };
      case 'info':
        return {
          bg: 'bg-info/20',
          text: 'text-info',
          label: text || 'Info'
        };
      case 'success':
        return {
          bg: 'bg-success/20',
          text: 'text-success',
          label: text || 'Success'
        };
    }
  };
  const config = getStatusConfig(status);
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.text.replace('text-', 'bg-')} mr-1.5`}></span>
      {config.label}
    </span>;
}