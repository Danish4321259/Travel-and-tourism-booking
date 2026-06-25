import { Destination, Property, TourPackage, Review, Booking } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest_1',
    name: 'Bali, Indonesia',
    description: 'Island of the Gods, lush rice fields, and pristine beaches.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    propertyCount: 1420,
    rating: 4.8,
  },
  {
    id: 'dest_2',
    name: 'Kyoto, Japan',
    description: 'Historic temples, traditional tea houses, and cherry blossoms.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    propertyCount: 890,
    rating: 4.9,
  },
  {
    id: 'dest_3',
    name: 'Paris, France',
    description: 'City of light, world-class art, culinary wonders, and romance.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    propertyCount: 2150,
    rating: 4.7,
  },
  {
    id: 'dest_4',
    name: 'Rome, Italy',
    description: 'Eternal city of ancient gladiators, pizza, and stunning ruins.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    propertyCount: 1750,
    rating: 4.7,
  },
  {
    id: 'dest_5',
    name: 'Swiss Alps, Switzerland',
    description: 'Breathtaking snowy peaks, crystal lakes, and mountain cabins.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    propertyCount: 620,
    rating: 4.9,
  },
  {
    id: 'dest_6',
    name: 'New York, USA',
    description: 'The City That Never Sleeps, soaring skylines, and Broadway.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    propertyCount: 3100,
    rating: 4.6,
  },
];

export const PROPERTIES: Property[] = [
  {
    id: 'prop_1',
    name: 'The Royal Ubud Resort & Spa',
    type: 'resort',
    description: 'Overlooking the sacred Ayung River, The Royal Ubud Resort offers unmatched peace and luxurious jungle villas with private plunge pools, authentic Balinese architecture, and holistic wellness therapies.',
    rating: 4.9,
    reviewCount: 312,
    price: 240,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Jalan Raya Sanggingan, Ubud, Bali',
    city: 'Bali',
    country: 'Indonesia',
    amenities: ['Private Pool', 'Free Wi-Fi', 'Full Spa', 'Airport Shuttle', 'Gym', 'Restaurant', 'AC', '24/7 Desk'],
    popular: true,
    featured: true,
    rooms: [
      {
        id: 'r_ubud_1',
        name: 'Deluxe Jungle View Villa',
        type: 'Villa',
        price: 240,
        capacity: 2,
        bedType: '1 King Bed',
        description: 'Immerse yourself in forest views from your private outdoor deck. Features deep-soak stone tub and Balinese canopy bed.',
        amenities: ['Ocean/Jungle View', 'Private Deck', 'Espresso Machine', 'Mini Bar', 'Bathrobes']
      },
      {
        id: 'r_ubud_2',
        name: 'Royal Executive Private Pool Villa',
        type: 'Private Pool Villa',
        price: 490,
        capacity: 4,
        bedType: '2 King Beds',
        description: 'Enormous duplex villa with infinity pool hanging over the canyon valley. Includes private butler service.',
        amenities: ['Infinity Pool', 'Butler Service', 'Kitchenette', 'Free Wine', 'Home Theater']
      }
    ]
  },
  {
    id: 'prop_2',
    name: 'Cozy Canal Attic Apartment',
    type: 'homestay',
    description: 'Charming 17th-century historical loft overlooking the beautiful canals of Amsterdam. Features industrial brick details, complete open-concept kitchen, and cozy hammock reading corners.',
    rating: 4.8,
    reviewCount: 184,
    price: 135,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672090437-0244723e415a?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Prinsengracht Road, Jordaan, Amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    amenities: ['Free Wi-Fi', 'Equipped Kitchen', 'Washing Machine', 'Bicycles Provided', 'Coffee Maker', 'AC'],
    popular: true,
    featured: false,
    rooms: [
      {
        id: 'r_canal_1',
        name: 'Entire Loft Apartment',
        type: 'Apartment',
        price: 135,
        capacity: 3,
        bedType: '1 Queen Bed + 1 Sofa Bed',
        description: 'Exclusive use of the entire attic apartment, including classic bikes and terrace keys.',
        amenities: ['Bicycles', 'Kitchen', 'Espresso Machine', 'Washing Machine', 'Smart TV']
      }
    ]
  },
  {
    id: 'prop_3',
    name: 'The Ritz Carlton Grand Plaza',
    type: 'hotel',
    description: 'Setting standard of pure cosmopolitan luxury, the Ritz Carlton stands tall in midtown Manhattan. Indulge in award winning dining rooms, luxury silk linens, white marble bathrooms, and sky lounge views.',
    rating: 4.7,
    reviewCount: 450,
    price: 380,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Central Park South, Midtown, New York',
    city: 'New York',
    country: 'USA',
    amenities: ['Gym', 'Free Wi-Fi', 'Valet Parking', 'Fine Dining', 'City View Lounge', 'Meeting Rooms', 'AC', 'Room Service'],
    popular: false,
    featured: true,
    rooms: [
      {
        id: 'r_ritz_1',
        name: 'Grand Signature Guestroom',
        type: 'Double Room',
        price: 380,
        capacity: 2,
        bedType: '1 King Bed',
        description: 'Plush carpeted room featuring fully custom-designed walnut wood furniture and direct view on Central Park.',
        amenities: ['Central Park View', 'Marble Bath', 'Premium Spirits Mini Bar', 'Smart Control Console']
      },
      {
        id: 'r_ritz_2',
        name: 'Metropolitan Luxury Suite',
        type: 'Suite',
        price: 720,
        capacity: 4,
        bedType: '2 King Beds',
        description: 'Elite penthouse experience with full kitchen, walk-in closets, and personal chauffeured city driver service.',
        amenities: ['Chauffeur', 'Living Room', 'Walk-In Wardrobe', 'High-Speed LAN', 'Double Marble Basins']
      }
    ]
  },
  {
    id: 'prop_4',
    name: 'Kyoto Machiya Traditional Townhouse',
    type: 'homestay',
    description: 'Experience deep historic Japan. Rent a traditional wooden residential machiya townhome with inner rock gardens, tatami dining floors, sliding shoji screens, and authentic cypress wood bath barrels.',
    rating: 4.95,
    reviewCount: 112,
    price: 190,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Gion District, Higashiyama, Kyoto',
    city: 'Kyoto',
    country: 'Japan',
    amenities: ['Free Wi-Fi', 'Traditional Bath', 'Zen Rock Garden', 'Kitchen', 'Bicycles', 'Tea Set', 'AC'],
    popular: true,
    featured: true,
    rooms: [
      {
        id: 'r_machiya_1',
        name: 'Entire Classic Townhouse',
        type: 'Traditional House',
        price: 190,
        capacity: 5,
        bedType: 'Futon Mats on Tatami',
        description: 'Pure historic charm in Kyoto. Best for travelers seeking deep heritage and local life.',
        amenities: ['Private Garden', 'Ceramics Set', 'Hinoki Wooden Hot Tub', 'Kyoto Green Tea Bags']
      }
    ]
  },
  {
    id: 'prop_5',
    name: 'The Alps Vista Chalet',
    type: 'resort',
    description: 'A cozy mountain peak ski-in ski-out luxury resort featuring modern timber aesthetics, glass skylight ceilings, dry saunas, and hot thermal jacuzzis looking out on snow-kissed, pine-filled scenery.',
    rating: 4.88,
    reviewCount: 78,
    price: 295,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Zermatt Ski Lodge, Valais, Swiss Alps',
    city: 'Swiss Alps',
    country: 'Switzerland',
    amenities: ['Ski-In/Ski-Out', 'Sauna', 'Outdoor Jacuzzi', 'Indoor Fireplace', 'Free Wi-Fi', 'Complimentary Breakfast', 'Restaurant'],
    popular: false,
    featured: false,
    rooms: [
      {
        id: 'r_alps_1',
        name: 'Premium Chalet Suite',
        type: 'Luxury Suite',
        price: 295,
        capacity: 2,
        bedType: '1 King Bed',
        description: 'Cozy modern mountain aesthetics. Features a wood-burning stone fireplace and mountain panoramas.',
        amenities: ['Fireplace', 'Heated Floors', 'Ski Storage', 'Gourmet Breakfast']
      }
    ]
  },
  {
    id: 'prop_6',
    name: 'Colosseum Grand Suite Hotel',
    type: 'hotel',
    description: 'A stunning architectural hotel directly facing the Colosseum ruins in Rome. Offers upscale Italian dining, custom concierge tour arrangements, and elegant neoclassical suites.',
    rating: 4.65,
    reviewCount: 389,
    price: 180,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Via Dei Fori Imperiali, Rome',
    city: 'Rome',
    country: 'Italy',
    amenities: ['Free Wi-Fi', 'Breakfast Buffet', 'Rooftop Bar', 'Private Tours', 'AC', 'Fitness Center'],
    popular: true,
    featured: false,
    rooms: [
      {
        id: 'r_rome_1',
        name: 'Colosseum View Double Room',
        type: 'Double Room',
        price: 180,
        capacity: 2,
        bedType: '1 Double Bed',
        description: 'Wake up directly looking at one of the world\'s historic wonders. Features modern Roman art elements.',
        amenities: ['Historical View', 'Wine Opener', 'Bose Speakers', 'Espresso Pods']
      }
    ]
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg_1',
    name: 'Classic Bali Heritage & Island Tour',
    description: 'Discover the ancient heritage, pristine coastal temples, volcanic peaks, and stunning waterfalls of Bali.',
    duration: '6 Days, 5 Nights',
    location: 'Bali, Indonesia',
    price: 499,
    rating: 4.85,
    reviewCount: 204,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    features: ['Airport Transfer Included', 'Daily Breakfast', 'Local Certified Guide', 'Private AC Transport', 'Entrance Fees Handled'],
    itinerary: [
      { day: 1, title: 'Arrival & Welcome', text: 'Touch down, private shuttle to Ubud, sunset welcome dinner.' },
      { day: 2, title: 'Ubud Art Centres & Rice Terrace Walks', text: 'Hike Tegalalang Rice Terraces, explore sacred monkey forest.' },
      { day: 3, title: 'Water Temple Blessings & volcano View', text: 'Purify at Tirta Empul, enjoy gourmet lunch facing Mount Batur.' },
      { day: 4, title: 'Nusa Penida Beach Hop', text: 'Ferry to the spectacular Kelingking Beach cliffs, snorkelling with Manta Rays.' },
      { day: 5, title: 'Sunset Uluwatu Temple & Kecak Dance', text: 'Classic fiery dance on ocean cliffs.' },
      { day: 6, title: 'Departure Transfer', text: 'Morning spa massage and drop back to Denpasar Airport.' }
    ]
  },
  {
    id: 'pkg_2',
    name: 'Grand Kyoto & Nara Autumn Blossom Expedition',
    description: 'Immerse deeply in traditional Japanese culture, walk inside thousands of vermilion shrines, feed Nara deer, and drink fine matcha.',
    duration: '5 Days, 4 Nights',
    location: 'Kyoto, Japan',
    price: 750,
    rating: 4.9,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    features: ['Bullet Train Pass included', 'Premium Tea Ceremony', 'Bilingual Cultural Guide', '4-Star Machiya Stay', 'Pocket Wi-Fi Device'],
    itinerary: [
      { day: 1, title: 'Gion District Walk', text: 'Explore lanterns, historical teahouses, and spot local Geishas.' },
      { day: 2, title: 'Torii Gates & Bamboo Groves', text: 'Hike Fushimi Inari at sunrise, then head to breezy Arashiyama Forest.' },
      { day: 3, title: 'Golden Pavilion & Temples', text: 'Visit iconic Kinkaku-ji and complete a zen stone garden meditation.' },
      { day: 4, title: 'Day Trip to Nara Park', text: 'Walk amongst giant temples and feed friendly bowing deer.' },
      { day: 5, title: 'Matcha Ceremony & Departure', text: 'Premium whisking class with historical families, train station drop-off.' }
    ]
  },
  {
    id: 'pkg_3',
    name: 'Swiss Alps Winter Ski & train Odyssey',
    description: 'Take the scenic panoramic train lines across massive glaciers and ski the global slopes of Zermatt.',
    duration: '7 Days, 6 Nights',
    location: 'Swiss Alps, Switzerland',
    price: 1250,
    rating: 4.95,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    features: ['Swiss Travel Rail Pass', 'Professional Ski Pass & Gear Rent', 'Scenic Glacier Express Cabin', 'Mountain Resort Stays', 'Thermal Bath Entrances'],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich', text: 'Train transit directly into standard cozy alpine rooms.' },
      { day: 2, title: 'Glacier Express Ride', text: 'Stunning floor-to-ceiling panoramic glass railway ride.' },
      { day: 3, title: 'Zermatt Exploration', text: 'Ski sessions facing the famous sharp peak Matterhorn.' },
      { day: 4, title: 'Ice Palace Caves', text: 'Climb 3800m up by cablecar to explore interior tunnels of glaciers.' },
      { day: 5, title: 'Thermal Spa Baths', text: 'Unwind under hot waters while surrounded by snow walls.' },
      { day: 6, title: 'Alpine Food Tour', text: 'Enjoy authentic melting Swiss cheese fondue pots and fine local wines.' },
      { day: 7, title: 'Depart', text: 'Scenic morning train back to major airport terminals for farewells.' }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev_1',
    propertyId: 'prop_1',
    userName: 'Jessica Mitchell',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-05-14',
    comment: 'An absolute heaven on Earth! The private plunge pool looking straight over the misty jungle canopy was sensational. Fully recommended for honeymoons!'
  },
  {
    id: 'rev_2',
    propertyId: 'prop_1',
    userName: 'Marcus Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 4.8,
    date: '2026-03-22',
    comment: 'Extremely polite Balinese service. The massage treatments resolved two weeks of desk stiffness. Only minor note was that remote jungle setting brings friendly small insects — but that\'s nature!'
  },
  {
    id: 'rev_3',
    propertyId: 'prop_2',
    userName: 'Sophia Laurent',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-06-01',
    comment: 'The location is unbeatable. Staring out the direct attic window at early morning barges sailing the canals was magical. Cozy, clean, and full of vintage Dutch characters.'
  },
  {
    id: 'rev_4',
    propertyId: 'prop_3',
    userName: 'David Vance',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4,
    date: '2026-04-10',
    comment: 'Luxurious with flawless room service. Centered on Central Park so walks were incredibly easy. It can, however, feel a bit corporate and busy on weekend morning rushes.'
  },
  {
    id: 'rev_5',
    propertyId: 'prop_4',
    userName: 'Akira Tanaka',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-05-20',
    comment: 'Pure elegance. Sleeping on top of fine tatami straw mats under historical wood frame ceilings was incredibly restful. Highlight was the deep cypress Hinoki wood bathtub!'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b_1',
    propertyId: 'prop_1',
    itemType: 'property',
    itemName: 'The Royal Ubud Resort & Spa',
    itemImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    checkIn: '2026-08-10',
    checkOut: '2026-08-15',
    guests: { adults: 2, children: 0 },
    totalPrice: 1200,
    status: 'upcoming',
    bookingDate: '2026-06-15',
    travelerInfo: {
      fullName: 'Danish Phu',
      email: 'danishphu4321@gmail.com',
      phone: '+1 (555) 234-5678'
    }
  },
  {
    id: 'b_2',
    propertyId: 'prop_2',
    itemType: 'property',
    itemName: 'Cozy Canal Attic Apartment',
    itemImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    checkIn: '2026-05-01',
    checkOut: '2026-05-04',
    guests: { adults: 2, children: 1 },
    totalPrice: 405,
    status: 'past',
    bookingDate: '2026-04-10',
    travelerInfo: {
      fullName: 'Danish Phu',
      email: 'danishphu4321@gmail.com',
      phone: '+1 (555) 234-5678'
    }
  }
];
