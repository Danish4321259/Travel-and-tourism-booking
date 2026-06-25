import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorComponent({
  title = 'Something went wrong',
  message = 'We could not load this information. Please check your internet connection or try searching again.',
  onRetry,
  className = '',
}: ErrorProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-red-50 bg-red-50/30 rounded-2xl max-w-lg mx-auto ${className}`}>
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4 animate-bounce">
        <AlertCircle size={24} />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="gap-2">
          <RefreshCw size={14} /> Retry Now
        </Button>
      )}
    </div>
  );
}
