export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  bedType: string;
  description: string;
  amenities: string[];
}

export interface Property {
  id: string;
  name: string;
  type: 'hotel' | 'homestay' | 'resort';
  description: string;
  rating: number;
  reviewCount: number;
  price: number; // base price per night
  image: string;
  images: string[];
  location: string;
  city: string;
  country: string;
  amenities: string[];
  popular: boolean;
  featured: boolean;
  rooms: Room[];
}

export interface TourPackage {
  id: string;
  name: string;
  description: string;
  duration: string; // e.g., "5 Days, 4 Nights"
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  features: string[];
  itinerary: {
    day: number;
    title: string;
    text: string;
  }[];
}

export interface Booking {
  id: string;
  propertyId?: string;
  packageId?: string;
  itemType: 'property' | 'package';
  itemName: string;
  itemImage: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalPrice: number;
  status: 'upcoming' | 'past' | 'cancelled';
  bookingDate: string;
  travelerInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
}

export interface Review {
  id: string;
  propertyId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  propertyCount: number;
  rating: number;
}

export type EventCategory =
  | 'Music Concerts'
  | 'Stand-up Comedy'
  | 'Festivals'
  | 'Food Festivals'
  | 'Cultural Events'
  | 'Workshops'
  | 'Adventure Activities'
  | 'Sports Events'
  | 'Nightlife'
  | 'Business Conferences'
  | 'Exhibitions'
  | 'Local Experiences'
  | 'Family Events';

export interface EventFAQ {
  question: string;
  answer: string;
}

export interface EventScheduleItem {
  time: string;
  activity: string;
}

export interface EventReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface EventExperience {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  banner: string;
  gallery: string[];
  city: string;
  venue: string;
  mapLocation: string; // Coordinate display text or embed text
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  ticketPrice: number;
  totalSeats: number;
  availableSeats: number;
  tags: string[];
  contactInfo: {
    phone: string;
    email: string;
  };
  organizerName: string;
  rating: number;
  reviewsCount: number;
  isIndoor: boolean;
  isFamilyFriendly: boolean;
  artist?: string;
  schedule?: EventScheduleItem[];
  faqs?: EventFAQ[];
  reviews?: EventReview[];
  featured?: boolean;
  trending?: boolean;
}

export interface EventBooking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventBanner: string;
  eventDate: string;
  eventTime: string;
  eventCity: string;
  eventVenue: string;
  bookingDate: string;
  ticketCount: number;
  totalPrice: number;
  status: 'upcoming' | 'past' | 'cancelled';
  attendees: {
    fullName: string;
    email: string;
    phone: string;
  };
}

