import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  MapPin,
  Clock,
  Bookmark,
  Ticket,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Phone,
  User,
  Trash2,
  CalendarDays,
  Activity
} from 'lucide-react';
import Button from '../components/Button';
import { CATEGORY_ICONS } from './EventsLanding';

export default function MyEvents() {
  const { eventBookings, savedEvents, events, toggleSavedEvent, cancelEventBooking } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled' | 'saved'>('upcoming');

  const filteredBookings = eventBookings.filter(b => b.status === activeTab);
  
  // Find actual saved event objects
  const savedEventObjects = events.filter(e => savedEvents.includes(e.id));

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you absolutely sure you want to cancel this event ticket? Your seats will be released.')) {
      cancelEventBooking(bookingId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-slate-50 flex flex-col gap-6">
      
      {/* Page header */}
      <div>
        <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">Guest Portal</span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">My Events & Experiences</h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold uppercase">
          Track your tickets, passes, schedules, and bookmarks in one place
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto bg-white p-1 rounded-xl border">
        {(['upcoming', 'past', 'cancelled', 'saved'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
            }`}
          >
            {tab === 'saved' ? <Bookmark size={14} /> : <Ticket size={14} />}
            <span>{tab === 'saved' ? 'Saved Bookmarks' : `${tab} Tickets`}</span>
            {tab !== 'saved' ? (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {eventBookings.filter(b => b.status === tab).length}
              </span>
            ) : (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {savedEvents.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* --- CONTENT VIEWS --- */}
      {activeTab === 'saved' ? (
        // SAVED BOOKMARKS LISTING
        savedEventObjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-150 p-16 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
              <Bookmark size={24} />
            </div>
            <h3 className="text-base font-black text-slate-850">No Saved Events</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              You haven't bookmarked any events yet. Browse our experiences and save your favorite upcoming activities!
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate('/events')} className="font-bold mt-2">
              Browse Experiences
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEventObjects.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-50">
                  <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white/95 text-slate-800 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1 border">
                    {CATEGORY_ICONS[event.category]}
                    <span>{event.category}</span>
                  </div>
                  <button
                    onClick={() => toggleSavedEvent(event.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white text-slate-400 hover:text-red-500 shadow-sm cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                      <MapPin size={11} className="text-emerald-500" /> {event.city} • {new Date(event.date).toLocaleDateString()}
                    </p>
                    <h3 className="text-sm font-black text-slate-800 mt-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {event.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-3">
                    <span className="text-xs font-black text-slate-800">${event.ticketPrice}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="text-[10px] font-bold"
                    >
                      Book Ticket
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        // BOOKED TICKETS LISTING
        filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-150 p-16 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
              <Ticket size={24} />
            </div>
            <h3 className="text-base font-black text-slate-850">No {activeTab} tickets</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              You do not have any {activeTab} tickets registered to this account. Check other tabs or book new activities!
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate('/events')} className="font-bold mt-2">
              Explore Upcoming Events
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row"
              >
                {/* Ticket Body / Artistic Perforated Pass */}
                <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative">
                  {/* Left Side: Info */}
                  <div className="flex gap-4 items-start">
                    <img
                      src={booking.eventBanner}
                      alt=""
                      className="w-20 h-20 object-cover rounded-xl border border-slate-100 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="bg-emerald-50 text-emerald-850 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-emerald-150">
                        CONFIRMED PASS
                      </span>
                      <h3 className="text-base font-black text-slate-800 mt-1.5 leading-tight tracking-tight">
                        {booking.eventTitle}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400 text-xs mt-2 font-bold uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-emerald-500" />
                          {new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-emerald-500" />
                          {booking.eventTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-emerald-500" />
                          {booking.eventVenue}, {booking.eventCity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: Attendee details */}
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-xs w-full md:w-auto">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Lead Attendee</p>
                      <p className="font-extrabold text-slate-700 flex items-center gap-1 mt-0.5">
                        <User size={11} /> {booking.attendees.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Pass Quantity</p>
                      <p className="font-extrabold text-slate-700 flex items-center gap-1 mt-0.5">
                        <Ticket size={11} /> {booking.ticketCount} tickets
                      </p>
                    </div>
                  </div>
                </div>

                {/* Perforated Dot Separation Graphic */}
                <div className="hidden md:flex flex-col justify-between items-center w-1 relative bg-slate-100">
                  <div className="w-4 h-4 bg-slate-50 border border-slate-200 rounded-full -mt-2 absolute" />
                  <div className="border-l-2 border-dashed border-slate-200 h-full w-0" />
                  <div className="w-4 h-4 bg-slate-50 border border-slate-200 rounded-full -mb-2 absolute" />
                </div>

                {/* Right Side: Pass / Stub controls */}
                <div className="p-6 bg-slate-50/70 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-center items-center gap-4 text-center min-w-[180px]">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase leading-none">Total Paid</p>
                    <p className="text-lg font-black text-slate-800 mt-1">${booking.totalPrice}</p>
                    <p className="text-[8px] text-slate-400 mt-1 uppercase font-bold">Booking ID: {booking.id}</p>
                  </div>

                  {/* Simulated barcode */}
                  <div className="flex flex-col items-center gap-1 bg-white p-2.5 rounded-lg border border-slate-150">
                    <div className="flex gap-0.5 h-6 w-28 items-stretch justify-center opacity-75">
                      <div className="bg-slate-800 w-1.5" />
                      <div className="bg-slate-800 w-0.5" />
                      <div className="bg-slate-800 w-1" />
                      <div className="bg-slate-800 w-2" />
                      <div className="bg-slate-800 w-0.5" />
                      <div className="bg-slate-800 w-1.5" />
                      <div className="bg-slate-800 w-0.5" />
                      <div className="bg-slate-800 w-2.5" />
                      <div className="bg-slate-800 w-0.5" />
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-widest">{booking.id}</span>
                  </div>

                  {/* Cancel ticket capability if upcoming */}
                  {booking.status === 'upcoming' && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="text-[10px] text-red-500 hover:text-red-700 font-extrabold uppercase tracking-wider cursor-pointer"
                    >
                      Cancel Ticket
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      )}

    </div>
  );
}
