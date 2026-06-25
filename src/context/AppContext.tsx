import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Property, TourPackage, Review, Destination } from '../types';
import { INITIAL_BOOKINGS } from '../data/dummyData';

interface SearchCriteria {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
}

interface BookingSession {
  type: 'property' | 'package';
  itemId: string; // propertyId or packageId
  roomId?: string; // only if property
  itemName: string;
  itemImage: string;
  pricePerNightOrPackage: number;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalPrice: number;
}

interface AppContextType {
  user: UserProfile;
  updateUser: (profile: Partial<UserProfile>) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => void;
  cancelBooking: (id: string) => void;
  wishlist: string[]; // property IDs
  toggleWishlist: (id: string) => void;
  searchParams: SearchCriteria;
  updateSearch: (params: Partial<SearchCriteria>) => void;
  currentBookingSession: BookingSession | null;
  setCurrentBookingSession: (session: BookingSession | null) => void;
  isLoggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Mock logged in state
  const [isLoggedIn, setLoggedIn] = useState(true);

  // Load state from local storage or fallback to dummy
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('tb_user');
    return saved ? JSON.parse(saved) : {
      fullName: 'Danish Phu',
      email: 'danishphu4321@gmail.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    };
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('tb_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tb_wishlist');
    return saved ? JSON.parse(saved) : ['prop_1', 'prop_4'];
  });

  const [searchParams, setSearchParams] = useState<SearchCriteria>({
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
  });

  const [currentBookingSession, setCurrentBookingSession] = useState<BookingSession | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('tb_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tb_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('tb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const updateUser = (profile: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profile }));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: 'b_' + Date.now(),
      bookingDate: new Date().toISOString().split('T')[0],
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const cancelBooking = (id: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const updateSearch = (params: Partial<SearchCriteria>) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        bookings,
        addBooking,
        cancelBooking,
        wishlist,
        toggleWishlist,
        searchParams,
        updateSearch,
        currentBookingSession,
        setCurrentBookingSession,
        isLoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
