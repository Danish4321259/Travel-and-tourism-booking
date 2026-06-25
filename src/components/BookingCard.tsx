import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Ban, CheckCircle2, History, AlertTriangle } from 'lucide-react';
import { Booking } from '../types';
import { useApp } from '../context/AppContext';
import Button from './Button';
import Modal from './Modal';

interface BookingCardProps {
  booking: Booking;
  key?: React.Key;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const { cancelBooking } = useApp();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getStatusDetails = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return {
          bg: 'bg-emerald-50 border-emerald-100 text-emerald-700',
          icon: <CheckCircle2 size={13} className="text-emerald-500 fill-emerald-50" />,
          label: 'Confirmed (Upcoming)'
        };
      case 'past':
        return {
          bg: 'bg-slate-50 border-slate-200 text-slate-600',
          icon: <History size={13} className="text-slate-500" />,
          label: 'Completed'
        };
      default:
        return {
          bg: 'bg-red-50 border-red-150 text-red-700',
          icon: <Ban size={13} className="text-red-500" />,
          label: 'Cancelled'
        };
    }
  };

  const statusInfo = getStatusDetails(booking.status);

  const handleCancelClick = () => {
    cancelBooking(booking.id);
    setShowCancelModal(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-5 p-4">
      {/* Thumbnail */}
      <div className="w-full md:w-36 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-50">
        <img
          src={booking.itemImage}
          alt={booking.itemName}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Main details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Title and Status Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className={`text-[10px] py-1 px-2.5 rounded-full border font-semibold flex items-center gap-1 leading-none ${statusInfo.bg}`}>
              {statusInfo.icon}
              {statusInfo.label}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              ID: {booking.id}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight mb-2">
            {booking.itemName}
          </h3>

          {/* Guest and Date summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-slate-400 shrink-0" />
              <span>{booking.checkIn} to {booking.checkOut}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} className="text-slate-400 shrink-0" />
              <span>{booking.guests.adults} Adults, {booking.guests.children} Children</span>
            </div>
          </div>
        </div>

        {/* Footer info: Price & Cancel controls */}
        <div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-slate-50">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block leading-none">Total paid</span>
            <p className="text-base font-black text-slate-800 leading-snug">
              ${booking.totalPrice}
            </p>
          </div>

          {booking.status === 'upcoming' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCancelModal(true)}
              className="text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 font-semibold gap-1.5 px-3 py-1.5 rounded-lg"
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Cancellation */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Your Booking"
      >
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-800 mb-1">Are you absolutely sure?</h4>
            <p className="text-xs text-slate-500 max-w-sm">
              This will cancel your upcoming stay at <strong>{booking.itemName}</strong>. You will receive a full refund within 3–5 working days to your original payment method.
            </p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <Button variant="secondary" size="sm" onClick={() => setShowCancelModal(false)} className="flex-1">
              Go Back
            </Button>
            <Button variant="danger" size="sm" onClick={handleCancelClick} className="flex-1">
              Yes, Cancel It
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
