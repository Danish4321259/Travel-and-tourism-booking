import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  MapPin,
  TrendingUp,
  Tag,
  Music,
  Compass,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  Smile,
  Coffee,
  Ticket,
  Clock,
  Mic,
  Star,
  Users,
  Briefcase,
  Image,
  Award
} from 'lucide-react';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'motion/react';

// Map categories to beautiful icons
export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Music Concerts': <Music className="w-5 h-5 text-purple-600" />,
  'Stand-up Comedy': <Mic className="w-5 h-5 text-amber-500" />,
  'Festivals': <Sparkles className="w-5 h-5 text-red-500" />,
  'Food Festivals': <Coffee className="w-5 h-5 text-emerald-500" />,
  'Cultural Events': <Compass className="w-5 h-5 text-indigo-500" />,
  'Workshops': <Award className="w-5 h-5 text-sky-500" />,
  'Adventure Activities': <Tag className="w-5 h-5 text-orange-500" />,
  'Sports Events': <Users className="w-5 h-5 text-blue-500" />,
  'Nightlife': <Music className="w-5 h-5 text-pink-500" />,
  'Business Conferences': <Briefcase className="w-5 h-5 text-slate-500" />,
  'Exhibitions': <Image className="w-5 h-5 text-teal-500" />,
  'Local Experiences': <MapPin className="w-5 h-5 text-rose-500" />,
  'Family Events': <Smile className="w-5 h-5 text-green-500" />
};

export default function EventsLanding() {
  const { events, savedEvents, toggleSavedEvent } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  // Filter out featured and trending events
  const featuredEvents = events.filter(e => e.featured);
  const trendingEvents = events.filter(e => e.trending);
  
  const categories = Object.keys(CATEGORY_ICONS);
  const popularCities = ['Bali', 'Kyoto', 'Paris', 'Rome', 'Swiss Alps', 'New York'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events/explore?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/events/explore');
    }
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20 bg-slate-50">
      
      {/* 1. Hero Event Banner Slider */}
      <section className="relative w-full h-[450px] md:h-[500px] overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          {featuredEvents.length > 0 && (
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background cover image */}
              <img
                src={featuredEvents[activeSlide].banner}
                alt={featuredEvents[activeSlide].title}
                className="w-full h-full object-cover opacity-65"
                referrerPolicy="no-referrer"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/40" />

              {/* Slider Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-start gap-4 text-white">
                  <span className="bg-emerald-500/25 border border-emerald-500/50 text-emerald-350 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md">
                    Featured Experience
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight max-w-2xl leading-tight">
                    {featuredEvents[activeSlide].title}
                  </h1>
                  <p className="text-sm md:text-base text-slate-200 max-w-xl font-medium line-clamp-2 leading-relaxed">
                    {featuredEvents[activeSlide].description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs md:text-sm text-slate-300 font-bold mt-2">
                    <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                      <Calendar size={14} className="text-emerald-500" />
                      {new Date(featuredEvents[activeSlide].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                      <MapPin size={14} className="text-emerald-500" />
                      {featuredEvents[activeSlide].city}
                    </span>
                    <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                      From ${featuredEvents[activeSlide].ticketPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/events/${featuredEvents[activeSlide].id}`)}
                      className="font-bold shadow-lg shadow-emerald-700/20"
                    >
                      Book Tickets Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toggleSavedEvent(featuredEvents[activeSlide].id)}
                      className="text-white border-white/30 hover:bg-white/10"
                    >
                      {savedEvents.includes(featuredEvents[activeSlide].id) ? 'Saved' : 'Save Event'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        {featuredEvents.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-white cursor-pointer transition-colors z-20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-white cursor-pointer transition-colors z-20"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {featuredEvents.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide ? 'bg-emerald-500 w-6' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Floating Interactive Search Bar */}
      <section className="max-w-4xl mx-auto w-full px-4 -mt-16 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Event Name, Artist, Venue, City or Category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors text-slate-800 font-medium"
              />
            </div>
            <Button type="submit" variant="primary" className="py-3 font-bold px-6">
              Search Experiences
            </Button>
          </form>
        </div>
      </section>

      {/* 2. Popular Categories */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">What is your mood?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Browse by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/events/explore?category=${encodeURIComponent(cat)}`}
              className="bg-white hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl p-4 flex flex-col items-center text-center gap-3 transition-all duration-300 group cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-white flex items-center justify-center transition-colors shadow-xs">
                {CATEGORY_ICONS[cat]}
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-700 transition-colors leading-tight">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending This Week / Month */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end gap-6 mb-8">
          <div>
            <span className="text-emerald-600 text-xs font-black tracking-wider uppercase flex items-center gap-1">
              <TrendingUp size={14} /> Rising Stars & Popular Bookings
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Trending Events</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/events/explore?sort=popular')}
            className="gap-1 font-bold text-emerald-600"
          >
            See All Trending <ChevronRight size={14} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingEvents.map((event) => {
            const isSaved = savedEvents.includes(event.id);
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group relative"
              >
                {/* Event Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-50">
                  <img
                    src={event.banner}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Chip */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 border border-slate-100">
                    {CATEGORY_ICONS[event.category]}
                    <span>{event.category}</span>
                  </div>

                  {/* Seat left countdown badge */}
                  {event.availableSeats <= 20 && (
                    <div className="absolute top-4 right-4 bg-red-650 text-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 animate-pulse">
                      <Clock size={11} /> {event.availableSeats} Seats Left!
                    </div>
                  )}

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleSavedEvent(event.id);
                    }}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-red-500 hover:scale-105 transition-all shadow-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={isSaved ? '#ef4444' : 'none'}
                      stroke={isSaved ? '#ef4444' : 'currentColor'}
                      strokeWidth="2.5"
                      className="w-4.5 h-4.5"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                </div>

                {/* Event details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-emerald-500" /> {event.city}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-800 tracking-tight leading-tight line-clamp-1 mb-2 group-hover:text-emerald-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mb-4">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-2">
                    <div>
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase leading-none">Starting from</p>
                      <p className="text-base font-black text-slate-800 mt-1">${event.ticketPrice}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="text-xs font-bold border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Popular Cities / Destinations */}
      <section className="bg-slate-950 text-white py-16 md:py-20 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-slate-900 to-slate-950 opacity-90" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="mb-10 text-center md:text-left">
            <span className="text-emerald-400 text-xs font-black tracking-wider uppercase">Vibrant Local Scenes</span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">Explore Events by Cities</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCities.map((city) => {
              // Count events in this city
              const cityEventCount = events.filter(e => e.city.toLowerCase() === city.toLowerCase()).length;
              return (
                <Link
                  key={city}
                  to={`/events/explore?city=${encodeURIComponent(city)}`}
                  className="bg-slate-900 hover:bg-emerald-950/40 border border-slate-850 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-850 group-hover:bg-emerald-500 flex items-center justify-center text-emerald-450 group-hover:text-white transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-100 group-hover:text-white transition-colors">{city}</h3>
                    <p className="text-[10px] text-slate-450 mt-1 font-bold uppercase">{cityEventCount} Upcoming Events</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Recommended / Upcoming this Month */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex justify-between items-end gap-6 mb-8">
          <div>
            <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">Curated Just For You</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Recommended Experiences</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/events/explore')}
            className="gap-1 font-bold text-emerald-600"
          >
            View All Events <ChevronRight size={14} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.slice(0, 4).map((event) => {
            const isSaved = savedEvents.includes(event.id);
            return (
              <div
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="bg-white rounded-xl border border-slate-150/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Small Header image */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={event.banner}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/70 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                    {event.category.split(' ')[0]}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                      {event.city} • {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-tight line-clamp-1 mb-2 group-hover:text-emerald-600 transition-colors">
                      {event.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-1">
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-extrabold">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span>{event.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({event.reviewsCount})</span>
                    </div>
                    <span className="text-xs font-black text-slate-800">
                      ${event.ticketPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
