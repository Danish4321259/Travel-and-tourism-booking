import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import BookingCard from '../components/BookingCard';
import { useNavigate } from 'react-router-dom';
import { Calendar, History, Compass, Ban } from 'lucide-react';
import Button from '../components/Button';

export default function MyBookings() {
  const navigate = useNavigate();
  const { bookings } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

  // Filter bookings based on active status selection
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'past' || b.status === 'cancelled');

  const selectedList = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">My Bookings</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Manage reservations, print flight board passes, or trigger refunds.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/search')} className="text-xs gap-1.5 font-bold">
          <Compass size={14} className="text-emerald-600 animate-spin-slow" /> Explore Stays
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-100 bg-white p-1 rounded-xl border border-slate-100/60 max-w-sm">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg text-xs font-bold leading-none select-none cursor-pointer transition-all
            ${activeTab === 'upcoming'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-850 hover:bg-slate-50'}`}
        >
          <Calendar size={13} />
          <span>Upcoming ({upcomingBookings.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg text-xs font-bold leading-none select-none cursor-pointer transition-all
            ${activeTab === 'history'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-850 hover:bg-slate-50'}`}
        >
          <History size={13} />
          <span>Past Stays ({pastBookings.length})</span>
        </button>
      </div>

      {/* Bookings Display Area */}
      <div className="flex flex-col gap-4">
        {selectedList.length > 0 ? (
          selectedList.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          /* Custom Empty State */
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center flex flex-col items-center gap-4 max-w-xl mx-auto w-full">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-450">
              {activeTab === 'upcoming' ? <Compass size={22} className="text-emerald-500" /> : <Ban size={22} />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                {activeTab === 'upcoming' ? 'No Upcoming Vacations' : 'No Travel History'}
              </h3>
              <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                {activeTab === 'upcoming'
                  ? "It looks like you don't have any stays scheduled currently. Let's make an escape!"
                  : "We don't spot any previous vacation receipts associated with this authenticated account."}
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/search')}>
              {activeTab === 'upcoming' ? 'Find Next Destination' : 'Rent a Holiday Cozy Loft'}
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
