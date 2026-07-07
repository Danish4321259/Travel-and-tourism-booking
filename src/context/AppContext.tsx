import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Property, TourPackage, Review, Destination, EventExperience, EventBooking } from '../types';
import { INITIAL_BOOKINGS } from '../data/dummyData';
import { INITIAL_EVENTS, MOCK_EVENT_BOOKINGS } from '../data/eventData';

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

  // Events & Experiences
  events: EventExperience[];
  eventBookings: EventBooking[];
  savedEvents: string[];
  addEvent: (event: Omit<EventExperience, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => void;
  updateEvent: (id: string, updatedEvent: Partial<EventExperience>) => void;
  deleteEvent: (id: string) => void;
  bookEventTicket: (eventId: string, ticketCount: number, attendeeInfo: { fullName: string; email: string; phone: string }) => void;
  cancelEventBooking: (bookingId: string) => void;
  toggleSavedEvent: (eventId: string) => void;
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

  // Events state
  const [events, setEvents] = useState<EventExperience[]>(() => {
    const saved = localStorage.getItem('tb_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [eventBookings, setEventBookings] = useState<EventBooking[]>(() => {
    const saved = localStorage.getItem('tb_event_bookings');
    return saved ? JSON.parse(saved) : MOCK_EVENT_BOOKINGS;
  });

  const [savedEvents, setSavedEvents] = useState<string[]>(() => {
    const saved = localStorage.getItem('tb_saved_events');
    return saved ? JSON.parse(saved) : ['evt_1', 'evt_2'];
  });

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

  useEffect(() => {
    localStorage.setItem('tb_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('tb_event_bookings', JSON.stringify(eventBookings));
  }, [eventBookings]);

  useEffect(() => {
    localStorage.setItem('tb_saved_events', JSON.stringify(savedEvents));
  }, [savedEvents]);

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

  // Events helper methods
  const addEvent = (eventData: Omit<EventExperience, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => {
    const newEvent: EventExperience = {
      ...eventData,
      id: 'evt_' + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      reviews: []
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, updatedEvent: Partial<EventExperience>) => {
    setEvents(prev =>
      prev.map(evt => (evt.id === id ? { ...evt, ...updatedEvent } : evt))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(evt => evt.id !== id));
    setEventBookings(prev => prev.filter(b => b.eventId !== id));
    setSavedEvents(prev => prev.filter(evtId => evtId !== id));
  };

  const bookEventTicket = (eventId: string, ticketCount: number, attendeeInfo: { fullName: string; email: string; phone: string }) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const totalPrice = event.ticketPrice * ticketCount;
    const newBooking: EventBooking = {
      id: 'eb_' + Date.now(),
      eventId,
      eventTitle: event.title,
      eventBanner: event.banner,
      eventDate: event.date,
      eventTime: event.startTime,
      eventCity: event.city,
      eventVenue: event.venue,
      bookingDate: new Date().toISOString().split('T')[0],
      ticketCount,
      totalPrice,
      status: 'upcoming',
      attendees: attendeeInfo
    };

    setEventBookings(prev => [newBooking, ...prev]);
    
    // Decrement available seats
    setEvents(prev =>
      prev.map(e =>
        e.id === eventId
          ? { ...e, availableSeats: Math.max(0, e.availableSeats - ticketCount) }
          : e
      )
    );
  };

  const cancelEventBooking = (bookingId: string) => {
    const booking = eventBookings.find(b => b.id === bookingId);
    if (!booking) return;

    setEventBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );

    // Refund/increment available seats
    setEvents(prev =>
      prev.map(e =>
        e.id === booking.eventId
          ? { ...e, availableSeats: e.availableSeats + booking.ticketCount }
          : e
      )
    );
  };

  const toggleSavedEvent = (id: string) => {
    setSavedEvents(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
        // Events and Experiences states and actions
        events,
        eventBookings,
        savedEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        bookEventTicket,
        cancelEventBooking,
        toggleSavedEvent,
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
