import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Heart,
  Share2,
  ChevronRight,
  Star,
  Users,
  ShieldAlert,
  Info,
  ChevronLeft,
  Mail,
  Phone,
  HelpCircle,
  CheckCircle2,
  Ticket,
  ArrowLeft,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import Button from '../components/Button';
import { CATEGORY_ICONS } from './EventsLanding';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, savedEvents, toggleSavedEvent, bookEventTicket, isLoggedIn, user } = useApp();

  const [activeImage, setActiveImage] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Form states for booking
  const [attendeeName, setAttendeeName] = useState(user.fullName || '');
  const [attendeeEmail, setAttendeeEmail] = useState(user.email || '');
  const [attendeePhone, setAttendeePhone] = useState(user.phone || '');
  const [formError, setFormError] = useState('');

  // Find active event
  const event = events.find(e => e.id === id);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center gap-4 min-h-[60vh]">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
          <ShieldAlert size={28} />
        </div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Experience Not Found</h2>
        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
          The event you are looking for does not exist or has been removed by the organizer.
        </p>
        <Button variant="primary" onClick={() => navigate('/events/explore')} className="font-bold mt-2">
          Browse Other Events
        </Button>
      </div>
    );
  }

  const isSaved = savedEvents.includes(event.id);
  const similarEvents = events
    .filter(e => e.id !== event.id && (e.category === event.category || e.city === event.city))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!attendeeName.trim() || !attendeeEmail.trim() || !attendeePhone.trim()) {
      setFormError('All attendee contact fields are required.');
      return;
    }

    if (ticketCount > event.availableSeats) {
      setFormError(`Only ${event.availableSeats} tickets left for this event.`);
      return;
    }

    bookEventTicket(event.id, ticketCount, {
      fullName: attendeeName,
      email: attendeeEmail,
      phone: attendeePhone
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSuccess(false);
      navigate('/my-events');
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Back button header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate('/events/explore')}
          className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-emerald-600 uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to explore
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Main Details, Gallery, description, FAQs */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Main Cover Display */}
          <div className="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-xs">
            <div className="relative h-[250px] sm:h-[350px] md:h-[400px] bg-slate-900">
              <img
                src={event.gallery[activeImage] || event.banner}
                alt={event.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Category tag */}
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-800 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-slate-100">
                {CATEGORY_ICONS[event.category]}
                <span>{event.category}</span>
              </span>

              {/* Action Buttons overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleSavedEvent(event.id)}
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-red-500 hover:scale-105 shadow-md cursor-pointer transition-all"
                  title="Save Event"
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
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-emerald-600 hover:scale-105 shadow-md cursor-pointer transition-all relative"
                  title="Share Event"
                >
                  <Share2 size={18} />
                  {shareSuccess && (
                    <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-30">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {event.gallery.length > 1 && (
              <div className="p-4 border-t border-slate-100 flex gap-2 overflow-x-auto bg-slate-50/50">
                {event.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer transition-all ${
                      idx === activeImage ? 'border-emerald-500 scale-102 shadow-xs' : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Experience Description */}
          <div className="bg-white rounded-2xl border border-slate-150 p-6 md:p-8 flex flex-col gap-4">
            <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase border-b border-slate-100 pb-2">
              About This Experience
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {event.description}
            </p>

            {event.artist && (
              <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-150 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Featured Performer / Host</p>
                  <p className="text-base font-black text-slate-800 mt-1">{event.artist}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <User size={18} />
                </div>
              </div>
            )}
          </div>

          {/* Schedule / Timeline */}
          {event.schedule && event.schedule.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-150 p-6 md:p-8 flex flex-col gap-6">
              <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase border-b border-slate-100 pb-2">
                Event Schedule
              </h2>
              <div className="flex flex-col gap-4 relative pl-4 border-l border-emerald-100 ml-2">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors z-10" />
                    <p className="text-xs font-black text-emerald-600 uppercase flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </p>
                    <p className="text-sm font-bold text-slate-800 mt-1">{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {event.faqs && event.faqs.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-150 p-6 md:p-8 flex flex-col gap-4">
              <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <HelpCircle size={18} className="text-emerald-600" /> Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-4 mt-2">
                {event.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                    <h3 className="text-xs font-black text-slate-800 uppercase leading-normal">
                      Q: {faq.question}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2 pl-4 border-l-2 border-emerald-500">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews section */}
          <div className="bg-white rounded-2xl border border-slate-150 p-6 md:p-8 flex flex-col gap-6">
            <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase border-b border-slate-100 pb-2 flex items-center gap-2">
              <MessageSquare size={18} className="text-emerald-600" /> Attendee Reviews ({event.reviewsCount})
            </h2>

            {/* Average score */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-150">
              <div className="text-center sm:border-r sm:border-slate-200 sm:pr-8 flex flex-col items-center">
                <p className="text-4xl font-black text-slate-850">{event.rating}</p>
                <div className="flex gap-1 text-amber-500 my-1.5">
                  <Star className="w-5.5 h-5.5 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-[10px] text-slate-450 font-black uppercase">Out of 5 stars</p>
              </div>

              <div className="flex-1 flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-500 w-8 uppercase">5 Star</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">85%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-500 w-8 uppercase">4 Star</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '12%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">12%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-500 w-8 uppercase">3 Star</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '3%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">3%</span>
                </div>
              </div>
            </div>

            {/* Real Review list */}
            {event.reviews && event.reviews.length > 0 ? (
              <div className="flex flex-col gap-4 mt-2">
                {event.reviews.map((review) => (
                  <div key={review.id} className="border-b border-slate-100 pb-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="text-xs font-black text-slate-800 leading-none">{review.userName}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 text-amber-500 text-xs font-bold items-center">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed pl-1.5 mt-1">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-450 italic font-medium text-center py-6">No direct reviews published yet. Be the first to attend and post a review!</p>
            )}
          </div>

        </div>

        {/* Right column: Sticky Checkout / Booking Panel, Organizer Card, Venue/Map */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-fit sticky top-20">
          
          {/* Main Booking Ticket Board */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase leading-none">Price per ticket</p>
              <h3 className="text-2xl font-black text-slate-850 mt-1.5 flex items-baseline gap-1">
                ${event.ticketPrice}
                <span className="text-xs font-bold text-slate-450 uppercase">USD / entry</span>
              </h3>
            </div>

            <div className="border-t border-b border-slate-100 py-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-black text-slate-700 uppercase">Quantity</span>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1 rounded-lg">
                  <button
                    disabled={ticketCount <= 1}
                    onClick={() => setTicketCount(prev => prev - 1)}
                    className="w-7 h-7 rounded-md bg-white border border-slate-200 text-slate-600 flex items-center justify-center font-bold hover:bg-slate-50 cursor-pointer disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-black text-slate-800 text-sm">
                    {ticketCount}
                  </span>
                  <button
                    disabled={ticketCount >= Math.min(10, event.availableSeats)}
                    onClick={() => setTicketCount(prev => prev + 1)}
                    className="w-7 h-7 rounded-md bg-white border border-slate-200 text-slate-600 flex items-center justify-center font-bold hover:bg-slate-50 cursor-pointer disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Seating Availability */}
              <div className="flex justify-between items-center text-xs">
                <span className="font-black text-slate-400 uppercase">Availability</span>
                <span className={`font-black uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-md ${
                  event.availableSeats > 20
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-750 border border-red-200 animate-pulse'
                }`}>
                  {event.availableSeats} seats remaining!
                </span>
              </div>

              <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase pt-2 border-t border-slate-100">
                <span>Total Amount</span>
                <span className="text-base text-slate-855">${event.ticketPrice * ticketCount}</span>
              </div>
            </div>

            {event.availableSeats > 0 ? (
              <Button
                variant="primary"
                onClick={() => setShowBookingModal(true)}
                className="w-full font-black py-3 text-sm shadow-md shadow-emerald-700/10 uppercase tracking-widest"
              >
                Get Tickets
              </Button>
            ) : (
              <Button disabled variant="outline" className="w-full font-black py-3 text-sm uppercase">
                SOLD OUT
              </Button>
            )}

            <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400 font-extrabold uppercase mt-1">
              <CheckCircle2 size={12} className="text-emerald-500" />
              <span>Instant Confirmation & Tickets</span>
            </div>
          </div>

          {/* Organizer Card */}
          <div className="bg-white rounded-2xl border border-slate-150 p-5 shadow-xs flex flex-col gap-4">
            <h3 className="text-xs font-black text-slate-800 uppercase border-b border-slate-100 pb-2">
              Organizer Details
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-black uppercase">
                {event.organizerName.slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 leading-none">{event.organizerName}</p>
                <p className="text-[10px] text-slate-450 font-bold uppercase mt-1">Verified Experience Host</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-slate-400" />
                <span>{event.contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-slate-400" />
                <span>{event.contactInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Venue & Google Maps Graphic Mock */}
          <div className="bg-white rounded-2xl border border-slate-150 p-5 shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-black text-slate-800 uppercase border-b border-slate-100 pb-2">
              Venue Location
            </h3>
            
            <div>
              <p className="text-xs font-black text-slate-800">{event.venue}</p>
              <p className="text-[10px] text-emerald-655 font-bold uppercase mt-1 flex items-center gap-1">
                <MapPin size={11} /> {event.city}
              </p>
            </div>

            {/* Simulated Map */}
            <div className="h-36 w-full rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 flex items-center justify-center">
              {/* Map grid mock */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
              {/* Pin indicator */}
              <div className="relative flex flex-col items-center gap-1 text-center z-10 p-2">
                <div className="w-8 h-8 rounded-full bg-emerald-650 flex items-center justify-center text-white shadow-md animate-bounce">
                  <MapPin size={16} />
                </div>
                <p className="text-[9px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-md shadow-xs">
                  {event.mapLocation.split(' ')[0]}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 6. Similar Experiences Section */}
      {similarEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="mb-6">
            <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">More Like This</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-1">Similar Experiences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => navigate(`/events/${evt.id}`)}
                className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative h-36 w-full overflow-hidden bg-slate-50">
                  <img src={evt.banner} alt={evt.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 text-slate-800 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow-sm">
                    {evt.category.split(' ')[0]}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase">
                      {evt.city} • {new Date(evt.date).toLocaleDateString()}
                    </p>
                    <h4 className="text-xs font-black text-slate-800 tracking-tight line-clamp-1 mt-1 group-hover:text-emerald-600 transition-colors">
                      {evt.title}
                    </h4>
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-50 pt-3 mt-3">
                    <span className="text-xs font-black text-slate-850">${evt.ticketPrice}</span>
                    <span className="text-[10px] font-black text-emerald-600">View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- CHECKOUT / BOOKING MODAL --- */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-150 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Ticket className="text-emerald-400 w-5 h-5" />
                <h3 className="text-sm font-black uppercase tracking-widest">Confirm Booking</h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-slate-400 hover:text-white font-black text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleBookingSubmit} className="p-6 flex flex-col gap-4">
              
              {/* Event mini card */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex gap-3">
                <img
                  src={event.banner}
                  alt=""
                  className="w-16 h-12 object-cover rounded-lg shrink-0"
                />
                <div>
                  <h4 className="text-xs font-black text-slate-800 leading-tight line-clamp-1">{event.title}</h4>
                  <p className="text-[9px] text-slate-450 font-bold uppercase mt-1">
                    {event.venue} ({event.city})
                  </p>
                  <p className="text-[9px] text-emerald-600 font-extrabold uppercase mt-0.5">
                    {new Date(event.date).toLocaleDateString()} at {event.startTime}
                  </p>
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-750 text-xs font-bold rounded-lg flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {bookingSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black rounded-lg text-center flex flex-col items-center gap-2">
                  <CheckCircle2 size={24} className="text-emerald-600 animate-bounce" />
                  <span>Booking Confirmed! Generating your tickets now...</span>
                </div>
              )}

              {!bookingSuccess && (
                <>
                  <div className="grid grid-cols-1 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-550 uppercase">Attendee Name</label>
                      <input
                        type="text"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="Full Name"
                        required
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-550 uppercase">Email Address</label>
                      <input
                        type="email"
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-550 uppercase">Phone Number</label>
                      <input
                        type="tel"
                        value={attendeePhone}
                        onChange={(e) => setAttendeePhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        required
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Pricing Overview */}
                  <div className="border-t border-slate-100 pt-4 mt-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                      <span>{ticketCount} x Ticket Price</span>
                      <span>${event.ticketPrice * ticketCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 mt-1">
                      <span>Convenience Booking Fee</span>
                      <span className="text-emerald-600">FREE</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-black text-slate-800 mt-2 pt-2 border-t border-dashed border-slate-200 uppercase">
                      <span>Total Price</span>
                      <span>${event.ticketPrice * ticketCount}</span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 font-bold text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1 font-black text-xs uppercase tracking-wider"
                    >
                      Pay & Secure Tickets
                    </Button>
                  </div>
                </>
              )}

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
