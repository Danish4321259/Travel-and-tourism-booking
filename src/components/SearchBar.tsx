import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Check, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact = false }: SearchBarProps) {
  const { searchParams, updateSearch } = useApp();
  const navigate = useNavigate();

  // Local state for dropdowns
  const [showGuests, setShowGuests] = useState(false);
  const [destination, setDestination] = useState(searchParams.destination);
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [adults, setAdults] = useState(searchParams.adults);
  const [children, setChildren] = useState(searchParams.children);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearch({
      destination,
      checkIn,
      checkOut,
      adults,
      children,
    });
    setShowGuests(false);
    navigate('/search');
  };

  const handleGuestCount = (type: 'adults' | 'children', operation: 'inc' | 'dec') => {
    if (type === 'adults') {
      if (operation === 'inc') setAdults(prev => prev + 1);
      if (operation === 'dec' && adults > 1) setAdults(prev => prev - 1);
    } else {
      if (operation === 'inc') setChildren(prev => prev + 1);
      if (operation === 'dec' && children > 0) setChildren(prev => prev - 1);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative w-full bg-white border border-slate-100 rounded-2xl md:rounded-full ${
        compact ? 'p-2 shadow-md max-w-4xl mx-auto' : 'p-4 md:p-3 shadow-xl max-w-5xl mx-auto'
      } flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-1.5 z-35`}
    >
      {/* 1. Destination Field */}
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 md:py-1.5 hover:bg-slate-50/75 rounded-xl md:rounded-full transition-colors group">
        <MapPin size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Where to?</label>
          <input
            type="text"
            placeholder="Bali, Kyoto, Paris, Swiss Alps..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full text-xs font-semibold text-slate-800 bg-transparent border-none outline-none placeholder-slate-400 p-0"
          />
        </div>
      </div>

      <div className="hidden md:block w-px h-10 bg-slate-100 shrink-0" />

      {/* 2. Check-In Date */}
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 md:py-1.5 hover:bg-slate-50/75 rounded-xl md:rounded-full transition-colors group">
        <Calendar size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Check-In</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-xs font-semibold text-slate-800 bg-transparent border-none outline-none p-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="hidden md:block w-px h-10 bg-slate-100 shrink-0" />

      {/* 3. Check-Out Date */}
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 md:py-1.5 hover:bg-slate-50/75 rounded-xl md:rounded-full transition-colors group">
        <Calendar size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Check-Out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-xs font-semibold text-slate-800 bg-transparent border-none outline-none p-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="hidden md:block w-px h-10 bg-slate-100 shrink-0" />

      {/* 4. Guests Dropdown Gate */}
      <div className="relative flex-1">
        <div
          onClick={() => setShowGuests(!showGuests)}
          className="flex items-center justify-between gap-3 px-4 py-2.5 md:py-1.5 hover:bg-slate-50/75 rounded-xl md:rounded-full transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Users size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Guests</label>
              <span className="text-xs font-bold text-slate-800 block">
                {adults + children} Guest{adults + children > 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-400 transition-transform duration-200" style={{ transform: showGuests ? 'rotate(180deg)' : 'none' }} />
        </div>

        {/* Guest Selector Popover context */}
        {showGuests && (
          <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl border border-slate-100 shadow-xl p-5 flex flex-col gap-4 z-40">
            {/* Adults Counter */}
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-slate-800 leading-none mb-1">Adults</h4>
                <p className="text-[10px] text-slate-400">Ages 13 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleGuestCount('adults', 'dec')}
                  disabled={adults <= 1}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 select-none cursor-pointer text-slate-600 font-bold"
                >
                  -
                </button>
                <span className="text-sm font-black text-slate-800 w-4 text-center">{adults}</span>
                <button
                  type="button"
                  onClick={() => handleGuestCount('adults', 'inc')}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 select-none cursor-pointer text-slate-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children Counter */}
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-slate-800 leading-none mb-1">Children</h4>
                <p className="text-[10px] text-slate-400">Ages 2 to 12</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleGuestCount('children', 'dec')}
                  disabled={children === 0}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 select-none cursor-pointer text-slate-600 font-bold"
                >
                  -
                </button>
                <span className="text-sm font-black text-slate-800 w-4 text-center">{children}</span>
                <button
                  type="button"
                  onClick={() => handleGuestCount('children', 'inc')}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 select-none cursor-pointer text-slate-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowGuests(false)}
              className="mt-1"
            >
              Done Selection
            </Button>
          </div>
        )}
      </div>

      {/* 5. Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size={compact ? 'md' : 'lg'}
        className="md:rounded-full gap-2 text-xs md:text-sm shadow-md cursor-pointer shrink-0 py-3 md:py-2.5 px-6 self-stretch md:self-auto"
      >
        <Search size={16} />
        <span>Search</span>
      </Button>
    </form>
  );
}
