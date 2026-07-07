import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, Calendar, Users, Briefcase, ChevronRight, Info } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ErrorComponent from '../components/ErrorComponent';

export default function BookingPage() {
  const navigate = useNavigate();
  const { currentBookingSession, user, isLoggedIn } = useApp();

  // Traveler info form state
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Guard clause if session expired or lost
  if (!currentBookingSession) {
    return (
      <div className="py-20">
        <ErrorComponent
          title="No Active Session Found"
          message="Please select a property or tour package and click 'Instant Reservation' to begin the booking process."
          onRetry={() => navigate('/search')}
        />
      </div>
    );
  }

  const handleValidation = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim()) errors.fullName = 'Full Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = 'A valid Email is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitTravelerInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    // Direct routing to simulated Checkout Gateway containing Traveler Information
    navigate('/booking-payment', {
      state: {
        travelerInfo: { fullName, email, phone }
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Step Progress indicators */}
      <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-400">
        <span className="text-emerald-600">1. Traveler Information</span>
        <ChevronRight size={12} />
        <span>2. Secure Payment Checkout</span>
        <ChevronRight size={12} />
        <span>3. Complete Invitation</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: Input form */}
        <form onSubmit={handleSubmitTravelerInfo} className="lg:col-span-2 flex flex-col gap-6 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight mb-1">Traveler Details</h1>
            <p className="text-xs text-slate-500 font-medium">Please match names precisely to your passports or state driving licenses.</p>
          </div>

          <hr className="border-slate-50" />

          {/* Form Inputs */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Lead Traveler Full Name"
              placeholder="e.g. Danish Phu"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={formErrors.fullName}
              icon={<User size={16} />}
              required
            />

            <InputField
              label="Contact Email Address"
              placeholder="danish@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={formErrors.email}
              icon={<Mail size={16} />}
              required
            />

            <InputField
              label="Mobile Telephone Number"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={formErrors.phone}
              icon={<Phone size={16} />}
              required
            />
          </div>

          {/* Terms & Policies summary */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex gap-3 text-xs text-slate-500 font-medium leading-relaxed">
            <Info size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-slate-700 mb-0.5">Checked-In Policies</h4>
              <p>Cancellation is free until 48 hours before check-in. The properties reserves coordinate controls for security validation. Late check-ins can call the concierge counter 24 hours a day.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-50 mt-2">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="text-slate-500 font-bold text-xs gap-1">
              Back to Details
            </Button>
            <Button type="submit" variant="primary" size="md" className="gap-1.5 font-bold cursor-pointer">
              Continue to Checkout <ChevronRight size={14} />
            </Button>
          </div>
        </form>

        {/* RIGHT COLUMN: Static Invoice visualizer */}
        <aside className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Booking Summary</h3>
          <div className="flex gap-4 items-center">
            <img
              src={currentBookingSession.itemImage}
              alt={currentBookingSession.itemName}
              className="w-16 h-16 rounded-lg object-cover bg-slate-50 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="text-xs font-black text-slate-800 line-clamp-2 leading-tight">{currentBookingSession.itemName}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{currentBookingSession.type}</p>
            </div>
          </div>

          <hr className="border-slate-50" />

          {/* Info Details */}
          <div className="flex flex-col gap-2.5 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-slate-400 shrink-0" />
              <span>{currentBookingSession.checkIn} to {currentBookingSession.checkOut}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={13} className="text-slate-400 shrink-0" />
              <span>{currentBookingSession.guests.adults} Adults, {currentBookingSession.guests.children} Children</span>
            </div>
          </div>

          <hr className="border-slate-50" />

          {/* Pricing detail items */}
          <div className="flex flex-col gap-2.5 text-xs font-bold text-slate-500">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-400">Total Price Calculated</span>
              <span className="text-slate-800 font-extrabold text-base">${currentBookingSession.totalPrice}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
