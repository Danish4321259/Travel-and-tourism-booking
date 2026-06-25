import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
  key?: React.Key;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-5 flex flex-col gap-3 shadow-xs">
      {/* Reviewer Header */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="text-sm font-semibold text-slate-800 leading-snug">{review.userName}</h4>
            <span className="text-[10px] text-slate-400 font-medium">{review.date}</span>
          </div>
        </div>
        {/* Rating Stars */}
        <div className="flex items-center gap-0.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold leading-none shrink-0">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span>{review.rating.toFixed(1)}</span>
        </div>
      </div>
      {/* Commentary */}
      <p className="text-xs text-slate-600 leading-relaxed font-normal">
        "{review.comment}"
      </p>
    </div>
  );
}
