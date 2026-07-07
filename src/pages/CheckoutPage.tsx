import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CreditCard, Shield, Lock, ChevronRight, CheckCircle, CreditCard as CardIcon } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ErrorComponent from '../components/ErrorComponent';
import Modal from '../components/Modal';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentBookingSession, addBooking, setCurrentBookingSession } = useApp();

  // Retrieve state arguments passed from Booking Page
  const stateData = location.state as { travelerInfo: { fullName: string; email: string; phone: string } } | null;

  // Local payment parameters
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState(stateData?.travelerInfo?.fullName || '');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [paymentDone, setPaymentDone] = useState(false);

  // Guards
  if (!currentBookingSession || !stateData) {
    return (
      <div className="py-20">
        <ErrorComponent
          title="Expired checkout checkout"
          message="Please select a property or package details first, then proceed to input traveler information."
          onRetry={() => navigate('/')}
        />
      </div>
    );
  }

  const { travelerInfo } = stateData;

  const handleCardNumberChange = (value: string) => {
    // Standard credit card numbers spacing formatting
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const matches = cleaned.match(/\d{1,4}/g);
    setCardNumber(matches ? matches.join(' ') : cleaned);
  };

  const handleValidation = () => {
    const errors: { [key: string]: string } = {};
    if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) errors.cardNumber = 'A valid 16-digit Card Number is required';
    if (!expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) errors.expiry = 'Expiration format MM/YY is required';
    if (!cvv.match(/^\d{3,4}$/)) errors.cvv = 'CVV must be 3 or 4 digits';
    if (!cardName.trim()) errors.cardName = 'Cardholder name is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    // Trigger transaction
    addBooking({
      propertyId: currentBookingSession.type === 'property' ? currentBookingSession.itemId : undefined,
      packageId: currentBookingSession.type === 'package' ? currentBookingSession.itemId : undefined,
      itemType: currentBookingSession.type,
      itemName: currentBookingSession.itemName,
      itemImage: currentBookingSession.itemImage,
      checkIn: currentBookingSession.checkIn,
      checkOut: currentBookingSession.checkOut,
      guests: currentBookingSession.guests,
      totalPrice: currentBookingSession.totalPrice,
      status: 'upcoming',
      travelerInfo: travelerInfo
    });

    // Start success animation screen
    setPaymentDone(true);
  };

  const handleSuccessDoneClosing = () => {
    setCurrentBookingSession(null); // delete active temporary session
    navigate('/bookings'); // take user directly to bookings!
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Steps */}
      <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-400">
        <span className="text-slate-500">1. Traveler Information</span>
        <ChevronRight size={12} />
        <span className="text-emerald-600">2. Secure Payment Checkout</span>
        <ChevronRight size={12} />
        <span>3. Complete Invitation</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Credit Card payment form details */}
        <form onSubmit={handleConfirmBooking} className="lg:col-span-2 flex flex-col gap-6 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <Lock size={18} className="text-emerald-500" /> Secure Payment Gateway
            </h1>
            <p className="text-xs text-slate-500 font-medium">All connection channels are encrypted with military-grade 256-bit certificates.</p>
          </div>

          <hr className="border-slate-50" />

          {/* Payment input layout */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Credit Cardholder Name"
              placeholder="e.g. Danish Phu"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              error={formErrors.cardName}
              icon={<Shield size={16} />}
              required
            />

            <InputField
              label="Standard Card Number"
              placeholder="4000 1234 5678 9010"
              value={cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              error={formErrors.cardNumber}
              icon={<CreditCard size={16} />}
              required
            />

            <div className="flex gap-4">
              <InputField
                label="Expiration Date"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                error={formErrors.expiry}
                maxLength={5}
                required
              />

              <InputField
                label="CVV / CVC Code"
                placeholder="123"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                error={formErrors.cvv}
                maxLength={4}
                required
              />
            </div>
          </div>

          {/* Verification Badge */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <Shield size={16} className="text-emerald-600 shrink-0" />
            <span>Secured & Insured with standard traveler legal frameworks</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-50 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1 text-slate-500 font-bold"
            >
              Go Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1 font-black cursor-pointer shadow-md hover:shadow-lg gap-1.5"
            >
              Confirm & Pay ${currentBookingSession.totalPrice}
            </Button>
          </div>
        </form>

        {/* Invoice column */}
        <aside className="lg:col-span-1 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col gap-4 text-xs font-semibold">
          <h3 className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Billing Summary</h3>
          
          <div className="flex flex-col gap-2.5 text-slate-600 border-b border-slate-50 pb-3">
            <div className="flex justify-between font-bold text-slate-800">
              <span className="font-normal text-slate-500">Service booked</span>
              <span className="max-w-[120px] truncate">{currentBookingSession.itemName}</span>
            </div>
            <div className="flex justify-between">
              <span>Primary Guest</span>
              <span>{travelerInfo.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span>Email</span>
              <span className="max-w-[120px] truncate">{travelerInfo.email}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800">
              <span>Grand Total</span>
              <span>${currentBookingSession.totalPrice}</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
            By clicking pay, you authorize booking operations. Invoices and printable tickets are sent directly to the email registered.
          </p>
        </aside>
      </div>

      {/* POS TRANSACTION SUCCESSFUL POPUP */}
      <Modal
        isOpen={paymentDone}
        onClose={handleSuccessDoneClosing}
        title="Transaction Succeeded!"
      >
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
            <CheckCircle size={36} className="fill-emerald-50" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight">Your vacation is officially set!</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm font-medium">
              We completed your booking for <strong>{currentBookingSession.itemName}</strong> successfully.
            </p>
            <p className="text-[10px] text-slate-450 mt-3 border border-slate-100 bg-slate-50/50 p-2.5 rounded-lg max-w-xs mx-auto line-clamp-3">
              We dispatched billing invoices, printable passes, and coordinates with check-in schedules directly to <strong>{travelerInfo.email}</strong>.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={handleSuccessDoneClosing} className="mt-4 w-full">
            Go to My Bookings
          </Button>
        </div>
      </Modal>
    </div>
  );
}
