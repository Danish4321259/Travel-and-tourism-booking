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
