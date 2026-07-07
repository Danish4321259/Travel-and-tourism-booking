import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PROPERTIES, TOUR_PACKAGES, REVIEWS } from '../data/dummyData';
import { Star, MapPin, Coffee, Utensils, Wifi, Car, Calendar, Users, ArrowLeft, Heart, Sparkles, Navigation } from 'lucide-react';
import Button from '../components/Button';
import ErrorComponent from '../components/ErrorComponent';
import ReviewCard from '../components/ReviewCard';
import { motion } from 'motion/react';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, searchParams, setCurrentBookingSession, isLoggedIn } = useApp();

  // Selected state indices
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Booking fields mimicking global search context initially
  const [checkIn, setCheckIn] = useState(searchParams.checkIn || new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  const [adults, setAdults] = useState(searchParams.adults || 2);
  const [children, setChildren] = useState(searchParams.children || 0);

  // Check if it is a Tour Package instead of a standard Hotel property
  const isPackage = id?.startsWith('package_');
  const actualId = isPackage ? id?.replace('package_', '') : id;

  // Retrieve proper model
  const property = !isPackage ? PROPERTIES.find(p => p.id === actualId) : null;
  const tourPackage = isPackage ? TOUR_PACKAGES.find(p => p.id === actualId) : null;

  // Sync default selected room
  useEffect(() => {
    if (property && property.rooms.length > 0) {
      setSelectedRoomId(property.rooms[0].id);
    }
  }, [property]);

  if (!property && !tourPackage) {
    return (
      <div className="py-20">
        <ErrorComponent
          title="Listing Not Found"
          message="We couldn't retrieve details for this location. It may have been booked out or removed."
          onRetry={() => navigate('/search')}
        />
      </div>
    );
  }

  // Common metadata helpers
  const name = property ? property.name : tourPackage!.name;
  const description = property ? property.description : tourPackage!.description;
  const rating = property ? property.rating : tourPackage!.rating;
  const reviewCount = property ? property.reviewCount : tourPackage!.reviewCount;
  const basePrice = property ? property.price : tourPackage!.price;
  const locationText = property ? property.location : tourPackage!.location;
  const mainImageIndexSrc = property ? property.images[selectedImageIdx] : tourPackage!.image;
  const imageGallery = property ? property.images : [tourPackage!.image];

  // Calculate pricing
  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 65 * 60 * 24)));
  const selectedRoom = property?.rooms.find(r => r.id === selectedRoomId);
  const priceMultiplier = isPackage ? 1 : nights;
  const unitPrice = isPackage ? tourPackage!.price : (selectedRoom ? selectedRoom.price : basePrice);
  const subtotal = unitPrice * priceMultiplier;
  const serviceFee = 15;
  const totalWithTaxes = subtotal + serviceFee;

  const handleStartBookingProcess = () => {
    // Save session in context
    setCurrentBookingSession({
      type: isPackage ? 'package' : 'property',
      itemId: actualId!,
      roomId: selectedRoom?.id,
      itemName: name,
      itemImage: imageGallery[0],
      pricePerNightOrPackage: unitPrice,
      checkIn: isPackage ? new Date().toISOString().split('T')[0] : checkIn,
      checkOut: isPackage ? new Date(Date.now() + 864500000).toISOString().split('T')[0] : checkOut,
      guests: { adults, children },
      totalPrice: totalWithTaxes,
    });

    navigate('/booking-form');
  };

  const isWishlisted = property ? wishlist.includes(property.id) : false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      
      {/* 1. Back button & quick action row */}
      <div className="flex justify-between items-center bg-white border border-slate-100 p-3.5 rounded-2xl shadow-xs">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-650 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Listings
        </button>
        {property && (
          <button
            onClick={() => toggleWishlist(property.id)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-500 cursor-pointer"
          >
            <Heart size={14} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
            <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
          </button>
        )}
      </div>

      {/* 2. Main Title Row */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {property && <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-emerald-100">{property.type}</span>}
          {isPackage && <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-indigo-100">All-Inclusive Tour</span>}
          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>{rating} ({reviewCount} reviews)</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">{name}</h1>
        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-medium">
          <MapPin size={13} className="text-emerald-500 shrink-0" /> {locationText}
        </p>
      </div>

      {/* 3. Image Layout: Large banner + sidebar carousel selector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white border border-slate-100 p-3.5 rounded-3xl shadow-xs">
        {/* Main large image */}
        <div className="lg:col-span-3 h-96 sm:h-[480px] rounded-2xl overflow-hidden bg-slate-100">
          <img
            src={mainImageIndexSrc}
            alt={name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Vertical sidebar options */}
        <div className="lg:col-span-1 flex lg:flex-col gap-3 max-h-[480px] overflow-x-auto lg:overflow-y-auto pr-1">
          {imageGallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIdx(idx)}
              className={`relative flex-1 lg:h-28 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 min-w-[100px] lg:min-w-0
                ${selectedImageIdx === idx ? 'border-emerald-600 shadow-md' : 'border-slate-50 hover:border-slate-200'}`}
            >
              <img src={img} alt="Thumbnail thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      </div>

      {/* 4. Split Layout: Details descriptions vs Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-4">
        {/* LEFT COLUMN: Deep description details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* A. Property Intro */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-50 pb-2">About this experience</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* B. Amenities Row */}
          {property && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col gap-4">
              <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-50 pb-2">Offered Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-2 text-xs text-slate-600 font-bold">
                <span className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-lg"><Wifi size={14} className="text-emerald-600" /> Free Wi-Fi</span>
                <span className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-lg"><Coffee size={14} className="text-emerald-600" /> Breakfast</span>
                <span className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-lg"><Car size={14} className="text-emerald-600" /> Free Parking</span>
                <span className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-lg"><Utensils size={14} className="text-emerald-600" /> Fine Dining</span>
              </div>
            </div>
          )}

          {/* C. Rooms Config List (Hotel) or Itinerary Schedule List (Tours) */}
          {property && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col gap-4">
              <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-50 pb-2">Select Your Accomodation</h3>
              <div className="flex flex-col gap-4">
                {property.rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`border rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4 cursor-pointer transition-all hover:border-emerald-500
                      ${selectedRoomId === room.id ? 'bg-emerald-50/15 border-emerald-600 shadow-sm' : 'bg-transparent border-slate-200'}`}
                  >
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h4 className="text-sm font-bold text-slate-800">{room.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{room.bedType} • Sleeps {room.capacity} Guests</p>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{room.description}</p>
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {room.amenities.map((a, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 flex sm:flex-col justify-between sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Price Per Night</span>
                        <p className="text-lg font-black text-slate-800">${room.price}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                        ${selectedRoomId === room.id ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`}>
                        {selectedRoomId === room.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isPackage && tourPackage && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col gap-4">
              <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-50 pb-2">Full Tour Itinerary</h3>
              <div className="relative border-l border-emerald-250 ml-3 pl-6 flex flex-col gap-6 py-2">
                {tourPackage.itinerary.map((day) => (
                  <div key={day.day} className="relative">
                    {/* Ring Indicator */}
                    <div className="absolute -left-9 top-1 w-5 h-5 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center font-black text-[10px] text-emerald-600 shadow-sm leading-none">
                      {day.day}
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 leading-none mb-1.5">Day {day.day}: {day.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{day.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* D. Map Simulation */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-50 pb-2 flex justify-between items-center">
              <span>Location Radar Map</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">GPS Active</span>
            </h3>
            {/* Visual Stylistic CSS Canvas Map */}
            <div className="relative w-full h-44 rounded-xl border border-slate-100 bg-emerald-50/20 overflow-hidden flex items-center justify-center select-none">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              {/* Radar Radiuses */}
              <div className="absolute w-44 h-44 rounded-full border border-emerald-200/50 animate-ping opacity-25" />
              <div className="absolute w-24 h-24 rounded-full border border-emerald-200/50" />
              <div className="absolute w-12 h-12 rounded-full border border-emerald-300/40" />

              {/* Central Pin */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center animate-bounce">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <MapPin size={12} />
                  </div>
                </div>
                <span className="bg-slate-900 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-md">{property ? property.city : tourPackage!.location.split(',')[0]}</span>
              </div>

              {/* Surrounding Pointers */}
              <div className="absolute top-10 left-12 flex items-center gap-1.5 text-[8px] font-bold text-slate-400 bg-white/70 px-1.5 py-0.5 rounded border border-slate-100">
                <Sparkles size={8} className="text-emerald-500" /> Local Airport
              </div>
              <div className="absolute bottom-8 right-16 flex items-center gap-1.5 text-[8px] font-bold text-slate-400 bg-white/70 px-1.5 py-0.5 rounded border border-slate-100">
                <Navigation size={8} className="text-blue-500" /> Subway Center
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              We provide exact gate coordinates, map coordinates, and secure driver contact options immediately inside email files after checkout completes.
            </p>
          </div>

          {/* E. Reviews segment */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-black text-slate-800 tracking-tight">Recent Client Feedbacks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REVIEWS.filter(rev => rev.propertyId === (isPackage ? 'prop_1' : actualId)).map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
              {REVIEWS.filter(rev => rev.propertyId === (isPackage ? 'prop_1' : actualId)).length === 0 && (
                <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-6 text-center text-xs text-slate-400">
                  No direct comments registered for this listing yet. High scores were left via mobile review meters.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Reservation Sidebar Summary */}
        <aside className="lg:col-span-1 bg-white border border-emerald-50 rounded-2xl p-6 shadow-md flex flex-col gap-5 sticky top-20">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Booking Summary</span>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-xl font-black text-slate-800">
                ${unitPrice}
                <span className="text-xs text-slate-400 font-normal">{isPackage ? ' / package' : ' / night'}</span>
              </h3>
              <span className="text-xs text-slate-500 font-semibold">Instantly Available</span>
            </div>
          </div>

          <hr className="border-slate-50" />

          {/* Booking inputs form in sidebar */}
          <div className="flex flex-col gap-3">
            {!isPackage && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Check-In Date</label>
                  <div className="relative">
                    <Calendar size={13} className="absolute left-3 top-3 text-emerald-600 pointer-events-none" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2.5 pl-9 pr-3 rounded-xl outline-none font-semibold focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Check-Out Date</label>
                  <div className="relative">
                    <Calendar size={13} className="absolute left-3 top-3 text-emerald-600 pointer-events-none" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2.5 pl-9 pr-3 rounded-xl outline-none font-semibold focus:border-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2.5">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Adults</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2.5 px-3 rounded-xl outline-none font-semibold focus:border-emerald-500 w-full"
                >
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Children</label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2.5 px-3 rounded-xl outline-none font-semibold focus:border-emerald-500 w-full"
                >
                  {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-50" />

          {/* Invoice calculations */}
          <div className="flex flex-col gap-2.5 text-xs text-slate-500 font-semibold">
            {!isPackage && (
              <div className="flex justify-between">
                <span>${unitPrice} × {nights} Nights</span>
                <span className="text-slate-800 font-bold">${subtotal}</span>
              </div>
            )}
            {isPackage && (
              <div className="flex justify-between">
                <span>All-Inclusive Core Package</span>
                <span className="text-slate-800 font-bold">${subtotal}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Standard Service Taxes</span>
              <span className="text-slate-800 font-bold">${serviceFee}</span>
            </div>
            <div className="flex justify-between border-t border-slate-50 pt-2.5 text-slate-800 text-sm font-black">
              <span>Total Price</span>
              <span>${totalWithTaxes}</span>
            </div>
          </div>

          {/* Confirm booking processor */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartBookingProcess}
            className="w-full cursor-pointer mt-2"
          >
            Instant Reservation
          </Button>
          <span className="text-[10px] text-center text-slate-400 font-semibold leading-none">Standard free cancellation applies to this booking.</span>
        </aside>
      </div>
    </div>
  );
}
