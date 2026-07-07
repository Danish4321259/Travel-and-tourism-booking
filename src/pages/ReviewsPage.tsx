import React, { useState } from 'react';
import { Star, MessageSquare, BookOpen, PenTool, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/dummyData';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);

  // Form states
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submittingDone, setSubmittingDone] = useState(false);

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: 'mock_rev_' + Date.now(),
      propertyId: 'prop_1', // default attached to Ubud
      userName: userName,
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0],
      comment: comment
    };

    setReviewsList(prev => [newReview, ...prev]);
    setUserName('');
    setComment('');
    setRating(5);
    setSubmittingDone(true);
    setTimeout(() => setSubmittingDone(false), 3000);
  };

  // Calculations
  const averageRating = (reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
          <MessageSquare size={24} className="text-emerald-600 shrink-0" /> Verified Customer Reviews
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Read honest experiences shared by elite members after completing their itineraries.</p>
      </div>

      {/* Metric panels split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: Metrics and New Form */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Summary Metric */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs text-center flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase font-bold text-slate-400">Average Feed Score</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-slate-800 tracking-tight">{averageRating}</span>
              <Star size={24} className="fill-amber-400 text-amber-400" />
            </div>
            <p className="text-xs text-slate-500 font-medium">Based on {reviewsList.length} verified stays</p>
          </div>

          {/* Form write feedback */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-50">
              <PenTool size={14} className="text-emerald-650" /> Add Your Feedback
            </h3>

            {submittingDone && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs p-3.5 rounded-xl font-bold flex items-center gap-2">
                <CheckCircle size={15} /> Verified. Review appended successfully!
              </div>
            )}

            <form onSubmit={handleCreateReview} className="flex flex-col gap-4 text-xs font-semibold">
              <InputField
                label="Your Public Display Name"
                placeholder="e.g. Danish Phu"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700">Rating Stars</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-lg text-xs outline-none focus:border-emerald-500 font-bold text-slate-705"
                >
                  <option value="5">5 Stars (Perfect Stay)</option>
                  <option value="4">4 Stars (Good stay)</option>
                  <option value="3">3 Stars (Average)</option>
                  <option value="2">2 Stars (Poor experience)</option>
                  <option value="1">1 Star (Terrible)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700">Detailed Commentary</label>
                <textarea
                  placeholder="Tell others about the pool, sheets comfort levels, or local guide services..."
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full min-h-[90px] text-xs font-medium text-slate-800 bg-transparent border border-slate-200 outline-none rounded-lg p-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
                Submit Verified Feedback
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Stream of comments */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-50">Latest Feed</h3>
          <div className="flex flex-col gap-4">
            {reviewsList.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
