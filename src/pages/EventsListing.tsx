import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Calendar as CalendarIcon,
  Grid,
  MapPin,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  CalendarCheck,
  Check
} from 'lucide-react';
import Button from '../components/Button';
import { CATEGORY_ICONS } from './EventsLanding';

export default function EventsListing() {
  const { events, savedEvents, toggleSavedEvent } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Navigation / Query States
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlCity = searchParams.get('city') || '';

  // Local Filter States
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCity, setSelectedCity] = useState(urlCity);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [priceRange, setPriceRange] = useState<number>(200);
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'this_week' | 'this_weekend' | 'this_month'>('all');
  const [filterPaidType, setFilterPaidType] = useState<'all' | 'free' | 'paid'>('all');
  const [isIndoor, setIsIndoor] = useState<boolean | null>(null);
  const [isFamilyFriendly, setIsFamilyFriendly] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price_asc' | 'price_desc' | 'date_asc'>('popular');

  // View States
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [calendarMode, setCalendarMode] = useState<'monthly' | 'weekly'>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date('2026-07-07')); // Sync to 2026-07-07 system reference
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  const cities = ['Bali', 'Kyoto', 'Paris', 'Rome', 'Swiss Alps', 'New York'];
  const categories = [
    'Music Concerts',
    'Stand-up Comedy',
    'Festivals',
    'Food Festivals',
    'Cultural Events',
    'Workshops',
    'Adventure Activities',
    'Sports Events',
    'Nightlife',
    'Business Conferences',
    'Exhibitions',
    'Local Experiences',
    'Family Events'
  ];

  // Sync state if URL search parameters change
  useEffect(() => {
    setSearchQuery(urlSearch);
    setSelectedCategory(urlCategory);
    setSelectedCity(urlCity);
  }, [urlSearch, urlCategory, urlCity]);

  // Helper function to check if date falls in range
  const isDateInFilter = (eventDateStr: string) => {
    const eventDate = new Date(eventDateStr);
    const today = new Date('2026-07-07'); // Pin to current relative date
    
    // Set hours to zero for clean comparison
    const clearTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const eventClear = clearTime(eventDate);
    const todayClear = clearTime(today);

    if (dateFilter === 'today') {
      return eventClear.getTime() === todayClear.getTime();
    }

    if (dateFilter === 'this_week') {
      // Within next 7 days
      const sevenDaysLater = new Date(todayClear.getTime() + 7 * 24 * 60 * 60 * 1000);
      return eventClear >= todayClear && eventClear <= sevenDaysLater;
    }

    if (dateFilter === 'this_weekend') {
      // Saturday & Sunday of the current week
      const currentDay = today.getDay();
      const distanceToSat = 6 - currentDay;
      const distanceToSun = 7 - currentDay;

      const satDate = clearTime(new Date(today.getTime() + distanceToSat * 24 * 60 * 60 * 1000));
      const sunDate = clearTime(new Date(today.getTime() + distanceToSun * 24 * 60 * 60 * 1000));

      return eventClear.getTime() === satDate.getTime() || eventClear.getTime() === sunDate.getTime();
    }

    if (dateFilter === 'this_month') {
      return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
    }

    return true; // 'all'
  };

  // Main Filter Logic
  const filteredEvents = events.filter((event) => {
    // 1. Text Search matches title, artist, venue, tags, or description
    const text = searchQuery.toLowerCase();
    const matchesSearch =
      !text ||
      event.title.toLowerCase().includes(text) ||
      (event.artist && event.artist.toLowerCase().includes(text)) ||
      event.venue.toLowerCase().includes(text) ||
      event.city.toLowerCase().includes(text) ||
      event.category.toLowerCase().includes(text) ||
      event.tags.some(t => t.toLowerCase().includes(text));

    // 2. City
    const matchesCity = !selectedCity || event.city.toLowerCase() === selectedCity.toLowerCase();

    // 3. Category
    const matchesCategory = !selectedCategory || event.category === selectedCategory;

    // 4. Price
    const matchesPrice = event.ticketPrice <= priceRange;

    // 5. Free/Paid
    const matchesPaid =
      filterPaidType === 'all' ||
      (filterPaidType === 'free' && event.ticketPrice === 0) ||
      (filterPaidType === 'paid' && event.ticketPrice > 0);

    // 6. Indoor/Outdoor
    const matchesIndoor = isIndoor === null || event.isIndoor === isIndoor;

    // 7. Family Friendly
    const matchesFamily = isFamilyFriendly === null || event.isFamilyFriendly === isFamilyFriendly;

    // 8. Date Range Filter
    const matchesDate = isDateInFilter(event.date);

    // 9. Calendar Selected Date
    const matchesCalendarSelectedDate = !selectedCalendarDate || event.date === selectedCalendarDate;

    return (
      matchesSearch &&
      matchesCity &&
      matchesCategory &&
      matchesPrice &&
      matchesPaid &&
      matchesIndoor &&
      matchesFamily &&
      matchesDate &&
      matchesCalendarSelectedDate
    );
  });

  // Main Sort Logic
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.rating - a.rating || b.reviewsCount - a.reviewsCount;
    }
    if (sortBy === 'newest') {
      // Sort by listing order or simulated launch date
      return b.id.localeCompare(a.id);
    }
    if (sortBy === 'price_asc') {
      return a.ticketPrice - b.ticketPrice;
    }
    if (sortBy === 'price_desc') {
      return b.ticketPrice - a.ticketPrice;
    }
    if (sortBy === 'date_asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedCategory('');
    setPriceRange(200);
    setDateFilter('all');
    setFilterPaidType('all');
    setIsIndoor(null);
    setIsFamilyFriendly(null);
    setSelectedCalendarDate(null);
    setSearchParams({});
  };

  // --- CALENDAR VIEW UTILS ---
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (calendarMode === 'monthly') {
      const blanks = Array(firstDay).fill(null);
      const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      const totalCells = [...blanks, ...days];

      return (
        <div className="bg-white rounded-2xl border border-slate-150 p-5 shadow-xs">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              {monthNames[month]} {year}
            </h3>
            <div className="flex gap-1">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-2">
            {totalCells.map((day, idx) => {
              if (day === null) return <div key={`blank-${idx}`} className="h-14 bg-slate-50/50 rounded-xl" />;

              // Format date string YYYY-MM-DD
              const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              
              // Get events on this date
              const dayEvents = events.filter(e => e.date === dateString);
              const isSelected = selectedCalendarDate === dateString;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => {
                    setSelectedCalendarDate(isSelected ? null : dateString);
                  }}
                  className={`min-h-14 p-1.5 rounded-xl border flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                      : 'border-slate-100 hover:border-emerald-350 hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-xs font-extrabold ${isSelected ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {day}
                  </span>

                  {dayEvents.length > 0 && (
                    <div className="flex flex-col gap-0.5 mt-1">
                      {dayEvents.slice(0, 2).map((evt) => (
                        <div
                          key={evt.id}
                          title={evt.title}
                          className="text-[9px] font-black px-1.5 py-0.5 bg-emerald-600 text-white truncate rounded-md"
                        >
                          {evt.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[8px] font-extrabold text-slate-400 text-center uppercase">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-[10px] text-slate-400 font-bold uppercase">
            <Info size={12} className="text-emerald-500" />
            <span>Click any day to show events only happening on that date. Click again to reset.</span>
          </div>
        </div>
      );
    } else {
      // Weekly calendar layout starting from the current date
      const weekDays = [];
      const startOfWeek = new Date(currentDate);
      
      for (let i = 0; i < 7; i++) {
        const nextDay = new Date(startOfWeek.getTime() + i * 24 * 60 * 60 * 1000);
        weekDays.push(nextDay);
      }

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      return (
        <div className="bg-white rounded-2xl border border-slate-150 p-5 shadow-xs">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Weekly Agenda View
            </h3>
            <div className="flex gap-1">
              <button
                onClick={prevWeek}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextWeek}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {weekDays.map((day) => {
              const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
              const dayEvents = events.filter(e => e.date === formattedDate);
              const isSelected = selectedCalendarDate === formattedDate;

              return (
                <div
                  key={formattedDate}
                  onClick={() => setSelectedCalendarDate(isSelected ? null : formattedDate)}
                  className={`p-3 rounded-xl border flex flex-col gap-2.5 min-h-[140px] cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : 'border-slate-150 hover:border-emerald-350 hover:bg-slate-50'
                  }`}
                >
                  <div className="border-b border-slate-100 pb-1.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      {dayNames[day.getDay()]}
                    </p>
                    <p className={`text-base font-black ${isSelected ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {day.getDate()} {monthNames[day.getMonth()].slice(0, 3)}
                    </p>
                  </div>

                  <div className="flex-1 flex flex-col gap-1.5">
                    {dayEvents.length > 0 ? (
                      dayEvents.map(evt => (
                        <div
                          key={evt.id}
                          className="p-1.5 rounded-md bg-emerald-600 text-white text-[9px] font-black leading-tight truncate"
                          title={evt.title}
                        >
                          <p className="truncate font-black">{evt.title}</p>
                          <p className="opacity-80 text-[8px] font-bold mt-0.5">{evt.startTime}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[9px] text-slate-350 italic font-medium my-auto text-center">No Events</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 bg-slate-50 min-h-screen">
      
      {/* 1. Header & View Toggle Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">Endless Adventures</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Discover Local Experiences</h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold uppercase">
            {sortedEvents.length} Events matches your search & filters
          </p>
        </div>

        {/* Mode Switchers */}
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              viewMode === 'grid'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            <Grid size={14} /> Grid Layout
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              viewMode === 'calendar'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            <CalendarIcon size={14} /> Calendar Explorer
          </button>
        </div>
      </div>

      {/* 2. Main Content Split: Filter Sidebar + Listings / Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filter Panel */}
        <div className="lg:col-span-1 flex flex-col gap-6 bg-white p-5 rounded-2xl border border-slate-150 shadow-xs h-fit sticky top-20">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-sm font-black text-slate-800 tracking-tight uppercase flex items-center gap-1.5">
              <SlidersHorizontal size={14} className="text-emerald-600" /> Filters
            </h2>
            <button
              onClick={clearAllFilters}
              className="text-[10px] text-red-500 hover:text-red-700 font-extrabold uppercase tracking-wider cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Text Search Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-700 uppercase">Keywords</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Artist, concert, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* City Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-700 uppercase">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-emerald-500 font-bold"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-700 uppercase">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-emerald-500 font-bold"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date Filter Pills */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-700 uppercase">When</label>
            <div className="flex flex-col gap-1.5">
              {(['all', 'today', 'this_week', 'this_weekend', 'this_month'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setDateFilter(p)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold capitalize flex justify-between items-center cursor-pointer transition-all ${
                    dateFilter === p
                      ? 'bg-emerald-50 text-emerald-800 font-black'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{p.replace('_', ' ')}</span>
                  {dateFilter === p && <Check size={12} className="text-emerald-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase">
              <span>Max Price</span>
              <span className="text-emerald-600">${priceRange}</span>
            </div>
            <input
              type="range"
              min="0"
              max="250"
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Paid / Free toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-700 uppercase">Ticket Type</label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-1 rounded-lg">
              {(['all', 'free', 'paid'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilterPaidType(type)}
                  className={`py-1.5 text-[10px] font-black uppercase rounded-md cursor-pointer transition-all ${
                    filterPaidType === type
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Indoor / Outdoor Toggles */}
          <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
            <label className="text-xs font-black text-slate-700 uppercase">Setting</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsIndoor(isIndoor === true ? null : true)}
                className={`flex-1 py-1.5 border rounded-lg text-[10px] font-black uppercase text-center cursor-pointer transition-all ${
                  isIndoor === true
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-850 font-black'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Indoor Only
              </button>
              <button
                type="button"
                onClick={() => setIsIndoor(isIndoor === false ? null : false)}
                className={`flex-1 py-1.5 border rounded-lg text-[10px] font-black uppercase text-center cursor-pointer transition-all ${
                  isIndoor === false
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-850 font-black'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Outdoor Only
              </button>
            </div>
          </div>

          {/* Family Friendly Toggle */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs font-black text-slate-700 uppercase">Family Friendly Only</span>
            <button
              onClick={() => setIsFamilyFriendly(isFamilyFriendly === true ? null : true)}
              className={`w-11 h-6 rounded-full transition-all relative ${
                isFamilyFriendly === true ? 'bg-emerald-600' : 'bg-slate-250'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                  isFamilyFriendly === true ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Main List Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Sorting / View Info Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
              <span>Showing {sortedEvents.length} Experiences</span>
              {selectedCalendarDate && (
                <span className="bg-emerald-50 text-emerald-850 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                  On {new Date(selectedCalendarDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-600 uppercase">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg text-xs px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-emerald-500 font-bold cursor-pointer"
              >
                <option value="popular">Popularity / Rating</option>
                <option value="date_asc">Event Date (Chronological)</option>
                <option value="newest">Recently Published</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Calendar Selector Options (shown only if Calendar View is active) */}
          {viewMode === 'calendar' && (
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setCalendarMode('monthly')}
                className={`px-3 py-1.5 border rounded-lg text-xs font-black uppercase cursor-pointer ${
                  calendarMode === 'monthly'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Monthly Calendar
              </button>
              <button
                onClick={() => setCalendarMode('weekly')}
                className={`px-3 py-1.5 border rounded-lg text-xs font-black uppercase cursor-pointer ${
                  calendarMode === 'weekly'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Weekly agenda
              </button>
            </div>
          )}

          {/* --- VIEW SWITCHER LAYOUTS --- */}
          {viewMode === 'calendar' ? (
            // CALENDAR SCHEDULER VIEW
            <div className="flex flex-col gap-6">
              {renderCalendar()}
              
              {/* Highlight list of filtered day events below the calendar */}
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase mb-4">
                  {selectedCalendarDate ? `Experiences on ${new Date(selectedCalendarDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}` : 'Events matching filters'}
                </h3>
                {sortedEvents.length === 0 ? (
                  <div className="bg-white border border-slate-150 p-8 rounded-xl text-center">
                    <p className="text-sm text-slate-550 font-bold">No matching events found on this date.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedEvents.map(event => (
                      <EventCard key={event.id} event={event} savedEvents={savedEvents} toggleSavedEvent={toggleSavedEvent} navigate={navigate} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // STANDARD GRID VIEW
            sortedEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-150 p-16 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                  <SlidersHorizontal size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight mt-2">No Matching Experiences Found</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                  We couldn't find any events that match your current filters. Try resetting the filters or broadening your search queries!
                </p>
                <Button variant="primary" size="sm" onClick={clearAllFilters} className="font-bold mt-2">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map((event) => (
                  <EventCard key={event.id} event={event} savedEvents={savedEvents} toggleSavedEvent={toggleSavedEvent} navigate={navigate} />
                ))}
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
}

// Separate reusable card component
export function EventCard({
  event,
  savedEvents,
  toggleSavedEvent,
  navigate
}: {
  event: any;
  savedEvents: string[];
  toggleSavedEvent: (id: string) => void;
  navigate: any;
  key?: any;
}) {
  const isSaved = savedEvents.includes(event.id);
  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-50">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Category Chip */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-800 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 border border-slate-100">
          {CATEGORY_ICONS[event.category]}
          <span>{event.category}</span>
        </div>

        {/* Seats left */}
        {event.availableSeats <= 15 && (
          <div className="absolute top-3 right-3 bg-red-650 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-sm">
            {event.availableSeats} Left!
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-0.5 text-emerald-600">
              <MapPin size={10} /> {event.city}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Clock size={10} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <h3 className="text-sm font-black text-slate-800 tracking-tight leading-tight line-clamp-1 mb-1 group-hover:text-emerald-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-[11px] text-slate-400 font-bold uppercase leading-none mt-1">
            By {event.organizerName}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-3">
          <div>
            <p className="text-[8px] font-black text-slate-400 uppercase leading-none">Starting at</p>
            <p className="text-sm font-black text-slate-800 mt-1">${event.ticketPrice}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              navigate(`/events/${event.id}`);
            }}
            className="text-[10px] font-black text-emerald-600 hover:text-emerald-800 uppercase px-1.5 py-1"
          >
            Book tickets
          </Button>
        </div>
      </div>
    </div>
  );
}
