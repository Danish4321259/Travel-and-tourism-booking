import React from 'react';

interface SkeletonProps {
  type?: 'text' | 'card' | 'circle' | 'list';
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({
  type = 'text',
  count = 1,
  className = '',
}: SkeletonProps) {
  const shimmerClass = 'animate-pulse bg-slate-200 rounded';

  if (type === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border border-slate-100 rounded-xl overflow-hidden p-3 shadow-sm bg-white flex flex-col gap-3">
            <div className={`h-48 w-full ${shimmerClass}`} />
            <div className="flex justify-between items-center mt-2">
              <div className={`h-4 w-1/3 ${shimmerClass}`} />
              <div className={`h-4 w-10 ${shimmerClass}`} />
            </div>
            <div className={`h-6 w-3/4 ${shimmerClass}`} />
            <div className={`h-4 w-1/2 ${shimmerClass}`} />
            <div className="flex gap-2 mt-2">
              <div className={`h-8 w-1/3 ${shimmerClass}`} />
              <div className={`h-8 w-1/3 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'circle') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`w-16 h-16 rounded-full ${shimmerClass}`} />
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className={`w-12 h-12 rounded-lg ${shimmerClass}`} />
            <div className="flex-1 flex flex-col gap-2">
              <div className={`h-4 w-1/2 ${shimmerClass}`} />
              <div className={`h-3 w-1/3 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`h-4 w-full ${shimmerClass}`} />
      ))}
    </div>
  );
}
