// import React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
type AlertType = 'info' | 'warning' | 'success' | 'error';
interface AlertBannerProps {
  type: AlertType;
  title: string;
  message?: string;
  className?: string;
}
export function AlertBanner({
  type,
  title,
  message,
  className = ''
}: AlertBannerProps) {
  const getAlertConfig = (type: AlertType) => {
    switch (type) {
      case 'info':
        return {
          bg: 'bg-info/10',
          border: 'border-info',
          icon: <Info size={20} className="text-info" />
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning',
          icon: <AlertTriangle size={20} className="text-warning" />
        };
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success',
          icon: <CheckCircle size={20} className="text-success" />
        };
      case 'error':
        return {
          bg: 'bg-critical/10',
          border: 'border-critical',
          icon: <XCircle size={20} className="text-critical" />
        };
    }
  };
  const config = getAlertConfig(type);
  return <div className={`flex p-4 rounded-lg border-l-4 ${config.bg} ${config.border} ${className}`}>
      <div className="mr-3 flex-shrink-0">{config.icon}</div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        {message && <p className="text-sm opacity-80 mt-1">{message}</p>}
      </div>
    </div>;
}