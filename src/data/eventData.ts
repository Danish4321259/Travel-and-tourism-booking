import { EventExperience, EventBooking } from '../types';

export const EVENT_CATEGORIES = [
  'Music Concerts',
  'Stand-up Comedy',
  'Festivals',
  'Food Festivals',
  'Cultural Events',
  'Workshops',
  'Adventure Activities',
  'Sports Events',
  'Nightlife',
  'Business Conferences',
  'Exhibitions',
  'Local Experiences',
  'Family Events'
] as const;

export const EVENT_CITIES = [
  'Bali',
  'Kyoto',
  'Paris',
  'Rome',
  'Swiss Alps',
  'New York'
];

export const INITIAL_EVENTS: EventExperience[] = [
  {
    id: 'evt_1',
    title: 'Acoustic Sunset Jungle Sessions',
    category: 'Music Concerts',
    description: 'Immerse yourself in a serene, intimate acoustic concert held deep in the lush Ubud jungles. Featuring local acoustic singer-songwriters and soft percussion, this sunset performance is designed to realign your senses while enjoying tropical mixology and gourmet plant-based appetizers under the canopy.',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80'
    ],
    city: 'Bali',
    venue: 'Green School Sanctuary, Ubud',
    mapLocation: '-8.5194, 115.2631 (Ubud Canopy Stage)',
    date: '2026-07-12',
    startTime: '16:30',
    endTime: '20:30',
    ticketPrice: 45,
    totalSeats: 120,
    availableSeats: 32,
    tags: ['Acoustic', 'Sunset', 'Jungle', 'Wellness', 'Drinks'],
    contactInfo: {
      phone: '+62 812-3456-7890',
      email: 'jungle.sessions@ubudvibe.com'
    },
    organizerName: 'Ubud Sound Healing Collective',
    rating: 4.9,
    reviewsCount: 42,
    isIndoor: false,
    isFamilyFriendly: true,
    artist: 'Nika & The Forest Wind',
    featured: true,
    trending: true,
    schedule: [
      { time: '16:30', activity: 'Welcome Herbal Drinks & Jungle Trails Walks' },
      { time: '17:15', activity: 'Opening Traditional Flute and Sound Bath' },
      { time: '18:00', activity: 'Acoustic Main Set by Nika' },
      { time: '19:30', activity: 'Starlight Social & Gourmet Tapas' }
    ],
    faqs: [
      { question: 'Is transport provided?', answer: 'Yes, a free shuttle is available from Ubud Palace starting at 15:45.' },
      { question: 'What should I wear?', answer: 'Dress comfortably for an outdoor natural venue. Light jackets are recommended as it gets cooler after sunset.' }
    ],
    reviews: [
      { id: 'rev_e1_1', userName: 'Koji Takahashi', userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', rating: 5, date: '2026-06-15', comment: 'An absolute highlight of my Bali trip! The acoustics in the bamboo shala were magical.' },
      { id: 'rev_e1_2', userName: 'Emma Watson', userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', rating: 4.8, date: '2026-06-20', comment: 'Very peaceful setting, great food, and talented musicians. Bring insect repellent!' }
    ]
  },
  {
    id: 'evt_2',
    title: 'Kyoto Summer Matsuri & Lantern Festival',
    category: 'Festivals',
    description: 'Experience the enchantment of Kyoto’s traditional summer evening. Celebrate the historic Matsuri with gorgeous glowing lantern displays, folk dance performances (Bon Odori), and an exclusive array of authentic food stalls serving custom matcha delicacies, takoyaki, and high-grade sake. This exclusive pass grants access to private viewing decks along the river.',
    banner: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80'
    ],
    city: 'Kyoto',
    venue: 'Kamogawa Riverbanks (Gion Section)',
    mapLocation: '35.0037, 135.7712 (Kamogawa Gion Access Point)',
    date: '2026-07-18',
    startTime: '18:00',
    endTime: '22:00',
    ticketPrice: 30,
    totalSeats: 300,
    availableSeats: 85,
    tags: ['Traditional', 'Lanterns', 'Summer', 'Culture', 'Sake'],
    contactInfo: {
      phone: '+81 75-999-8888',
      email: 'matsuri@gion-culture.kyoto'
    },
    organizerName: 'Gion Cultural Preservation Society',
    rating: 4.95,
    reviewsCount: 124,
    isIndoor: false,
    isFamilyFriendly: true,
    artist: 'Kyoto Taiko Drummers',
    featured: true,
    trending: true,
    schedule: [
      { time: '18:00', activity: 'Gates Open & Street Food Bazaar Commences' },
      { time: '19:00', activity: 'Taiko Drumming Grand Opener' },
      { time: '20:00', activity: 'Lantern Lighting & River Float Ceremony' },
      { time: '21:00', activity: 'Traditional Dance Performance & Flute Solos' }
    ],
    faqs: [
      { question: 'Are kimonos or yukatas required?', answer: 'Not required, but highly encouraged! Many attendees wear casual summer yukatas.' },
      { question: 'Is the event child-friendly?', answer: 'Absolutely! Kids under 6 get free admission.' }
    ],
    reviews: [
      { id: 'rev_e2_1', userName: 'John Doe', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', rating: 5, date: '2025-08-01', comment: 'The glowing lanterns on the river looked surreal. Worth every single yen.' }
    ]
  },
  {
    id: 'evt_3',
    title: 'Late Night Comedy Club Paris',
    category: 'Stand-up Comedy',
    description: 'An English-language premium stand-up comedy showcase featuring five award-winning international comedians. Located inside an intimate, underground vaulted cellar in the heart of the Latin Quarter. Comes with a complimentary drink upon entry and plenty of side-splitting humor about life, travel, and French culture.',
    banner: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585699324551-f6c309eed262?auto=format&fit=crop&w=800&q=80'
    ],
    city: 'Paris',
    venue: 'Le Caveau de la Huchette, Latin Quarter',
    mapLocation: '48.8528, 2.3468 (Cellar Vaults)',
    date: '2026-07-15',
    startTime: '21:00',
    endTime: '23:00',
    ticketPrice: 25,
    totalSeats: 60,
    availableSeats: 12,
    tags: ['Comedy', 'Nightlife', 'English', 'Indoor', 'Drinks'],
    contactInfo: {
      phone: '+33 1 43 26 20 00',
      email: 'info@parisstandup.com'
    },
    organizerName: 'English Comedy Paris Ltd.',
    rating: 4.75,
    reviewsCount: 38,
    isIndoor: true,
    isFamilyFriendly: false,
    artist: 'Marcus Brody & Friends',
    featured: false,
    trending: true,
    schedule: [
      { time: '20:30', activity: 'Doors Open, Drinks Served, Jazz Lounge Music' },
      { time: '21:00', activity: 'Host Introduction & Opening Comedian' },
      { time: '21:40', activity: 'Middle Acts & Short Intermission' },
      { time: '22:15', activity: 'Headliner Set by Marcus Brody' }
    ],
    faqs: [
      { question: 'Is the show entirely in English?', answer: 'Yes, 100% in English!' },
      { question: 'Are drinks available inside?', answer: 'Yes, a full underground bar is stocked with cocktails, wine, beers, and soft drinks.' }
    ],
    reviews: [
      { id: 'rev_e3_1', userName: 'Sarah Connor', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', rating: 5, date: '2026-05-12', comment: 'Laughed so hard my cheeks hurt. Great intimacy!' }
    ]
  },
  {
    id: 'evt_4',
    title: 'Rome Wine & Culinary Masterclass',
    category: 'Food Festivals',
    description: 'Learn the secrets of Roman pasta making and wine pairings from a legendary certified sommelier and native Roman chef. You’ll hands-on craft two types of authentic pasta (Cacio e Pepe and Carbonara) inside a gorgeous penthouse kitchen overlooking the Vatican, followed by an elegant, multi-course degustation paired with premium regional white and red wines.',
    banner: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80'
    ],
    city: 'Rome',
    venue: 'Vatican Vista Culinary Rooftop',
    mapLocation: '41.9028, 12.4534 (Vatican Rooftop)',
    date: '2026-07-24',
    startTime: '11:00',
    endTime: '14:30',
    ticketPrice: 95,
    totalSeats: 16,
    availableSeats: 4,
    tags: ['Cooking', 'Wine Tasting', 'Rooftop', 'Hands-on', 'Luxury'],
    contactInfo: {
      phone: '+39 06-1234-5678',
      email: 'masterclass@romeeats.it'
    },
    organizerName: 'Chef Giovanni Romano & Team',
    rating: 4.98,
    reviewsCount: 88,
    isIndoor: true,
    isFamilyFriendly: true,
    artist: 'Chef Giovanni Romano',
    featured: true,
    trending: false,
    schedule: [
      { time: '11:00', activity: 'Aperitivo Welcome with Prosecco and Roman Bruschetta' },
      { time: '11:30', activity: 'Hands-on Pasta Kneading and Shaping Session' },
      { time: '12:45', activity: 'Sauce Crafting and Chef Secrets Demonstration' },
      { time: '13:30', activity: 'Sit-Down Penthouse Banquet with Curated Sommelier Pairings' }
    ],
    faqs: [
      { question: 'Do you accommodate vegetarians?', answer: 'Yes, we can accommodate vegetarian diets easily. Please notify us of allergies at least 24 hours prior.' },
      { question: 'Can children participate?', answer: 'Yes, kids over 10 are welcome. Soft drinks and fresh juices will replace wine for minors.' }
    ],
    reviews: [
      { id: 'rev_e4_1', userName: 'Arthur Pendragon', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', rating: 5, date: '2026-06-28', comment: 'Chef Giovanni was funny, knowledgeable, and the food was celestial. Outstanding rooftop view.' }
    ]
  },
  {
    id: 'evt_5',
    title: 'Swiss Alps Paragliding & Peak Picnic',
    category: 'Adventure Activities',
    description: 'Feel the ultimate rush of gliding over the spectacular Interlaken lakes and the snow-capped Eiger peak. Experience a safe, tandem flight guided by a licensed expert pilot, landing directly on a scenic alpine meadow where a rustic, custom Swiss cheese fondue picnic basket and champagne await you.',
    banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521575107034-ee0f89aa0af6?auto=format&fit=crop&w=800&q=80'
    ],
    city: 'Swiss Alps',
    venue: 'First Station Runway, Interlaken-Grindelwald',
    mapLocation: '46.6256, 8.0315 (Grindelwald Flight Deck)',
    date: '2026-07-11',
    startTime: '09:00',
    endTime: '13:00',
    ticketPrice: 180,
    totalSeats: 8,
    availableSeats: 3,
    tags: ['Paragliding', 'Adventure', 'Fondue', 'Scenic', 'Tandem'],
    contactInfo: {
      phone: '+41 33-826-1111',
      email: 'peaks@swissairgliders.ch'
    },
    organizerName: 'Swiss Alpine Adventures & Flight Academy',
    rating: 4.9,
    reviewsCount: 31,
    isIndoor: false,
    isFamilyFriendly: false,
    artist: 'Tandem Flight Master Lukas',
    featured: true,
    trending: false,
    schedule: [
      { time: '09:00', activity: 'Meet & Greet at Grindelwald Terminal, safety brief' },
      { time: '09:40', activity: 'Cable car ride to First launch station' },
      { time: '10:30', activity: 'Tandem Paragliding Launch (25-35 minutes flight)' },
      { time: '11:30', activity: 'Landing on Peak Meadow, fondue picnic & champagne' }
    ],
    faqs: [
      { question: 'What is the weight limit?', answer: 'Participants must weigh between 35kg (80lbs) and 110kg (240lbs) for tandem safety.' },
      { question: 'What if weather is bad?', answer: 'If flights are cancelled due to strong winds or rain, you will get a full refund or free rescheduling.' }
    ],
    reviews: []
  },
  {
    id: 'evt_6',
    title: 'Broadway Behind the Scenes & Workshop',
    category: 'Workshops',
    description: 'An exclusive, limited-entry workshop inside a real rehearsal studio in Times Square. Led by active Broadway cast members and music directors, you will learn a genuine choreographic sequence and vocal arrangement from a hit musical, complete with a behind-the-scenes stories panel and Q&A session.',
    banner: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80'
    ],
    city: 'New York',
    venue: 'Pearl Studios, Midtown Manhattan',
    mapLocation: '40.7538, -73.9898 (Pearl Studios Eighth Ave)',
    date: '2026-07-29',
    startTime: '13:00',
    endTime: '16:00',
    ticketPrice: 65,
    totalSeats: 35,
    availableSeats: 18,
    tags: ['Broadway', 'Workshop', 'Singing', 'Dance', 'Acting'],
    contactInfo: {
      phone: '+1 (212) 555-0199',
      email: 'broadway.access@midtown-arts.org'
    },
    organizerName: 'Broadway Access Network NYC',
    rating: 4.88,
    reviewsCount: 56,
    isIndoor: true,
    isFamilyFriendly: true,
    artist: 'Cast Members of Wicked & Hamilton',
    featured: false,
    trending: true,
    schedule: [
      { time: '13:00', activity: 'Sign-in & Warm-up with Broadway Vocal Coach' },
      { time: '13:30', activity: 'Song Study: Ensemble vocal harmonies' },
      { time: '14:30', activity: 'Original Broadway choreography routine learning' },
      { time: '15:30', activity: 'Uncensored Q&A panel & cast photo-op' }
    ],
    faqs: [
      { question: 'Do I need professional experience?', answer: 'Not at all! This workshop is open to all skill levels from absolute beginners to advanced amateurs.' },
      { question: 'What should I wear?', answer: 'Sneakers or dance shoes, and comfortable activewear or clothing you can stretch in.' }
    ],
    reviews: [
      { id: 'rev_e6_1', userName: 'Melody Smith', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', rating: 5, date: '2026-06-10', comment: 'Singing with a lead actress from Wicked was literally a dream come true!' }
    ]
  },
  {
    id: 'evt_7',
    title: 'Secret Kyoto Nightlife & Gion Pub Crawl',
    category: 'Nightlife',
    description: 'Venture beyond the tourist trails into Kyoto’s neon-lit alleyways. Guided by a local nightlife veteran, you’ll discover hidden tachinomiya (standing bars), tiny izakayas, and high-end secret whiskey lounges. Includes four premium drinks, traditional bar snacks, and rich storytelling about Kyoto’s modern culture.',
    banner: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80'
    ],
    city: 'Kyoto',
    venue: 'Gion-Shijo Station Meeting point',
    mapLocation: '35.0038, 135.7725 (Meeting Pillar)',
    date: '2026-07-25',
    startTime: '20:00',
    endTime: '23:30',
    ticketPrice: 50,
    totalSeats: 15,
    availableSeats: 9,
    tags: ['Nightlife', 'Pub Crawl', 'Sake', 'Whiskey', 'Adults-Only'],
    contactInfo: {
      phone: '+81 80-2222-3333',
      email: 'crawl@kyoto-afterdark.jp'
    },
    organizerName: 'Kyoto After Dark Tours',
    rating: 4.82,
    reviewsCount: 19,
    isIndoor: true,
    isFamilyFriendly: false,
    artist: 'Guide Kenji',
    featured: false,
    trending: false,
    schedule: [
      { time: '20:00', activity: 'Meet & Traditional Standing Bar Welcome' },
      { time: '20:45', activity: 'Izakaya food matching with local craft draft beer' },
      { time: '21:45', activity: 'Deep Pontocho Alley secret sake tasting' },
      { time: '22:45', activity: 'Cocktail or Yamazaki Whiskey master lounge stop' }
    ],
    faqs: [
      { question: 'Is the legal age strictly enforced?', answer: 'Yes, Japan’s legal drinking age is 20. ID verification is required.' }
    ]
  },
  {
    id: 'evt_8',
    title: 'Starlight Symphony in the Swiss Alps',
    category: 'Music Concerts',
    description: 'Under a pristine, light-pollution-free alpine sky, witness the Swiss Youth Philharmonic Orchestra perform classical and cinematic masterpieces. Staged in a natural mountain amphitheater near Wengen with warming blankets, individual fires, warm mulled wine, and state-of-the-art spatial acoustics.',
    banner: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80'
    ],
    city: 'Swiss Alps',
    venue: 'Wengen Alpine Arena',
    mapLocation: '46.6056, 7.9215 (Alpine Stage Access)',
    date: '2026-07-19',
    startTime: '19:30',
    endTime: '22:30',
    ticketPrice: 70,
    totalSeats: 180,
    availableSeats: 52,
    tags: ['Orchestra', 'Music', 'Alpine', 'Mulled Wine', 'Magical'],
    contactInfo: {
      phone: '+41 33-555-2244',
      email: 'symphony@wengen-events.ch'
    },
    organizerName: 'Swiss Alpine Culture Association',
    rating: 4.97,
    reviewsCount: 74,
    isIndoor: false,
    isFamilyFriendly: true,
    artist: 'Swiss Youth Philharmonic Orchestra',
    featured: true,
    trending: true,
    schedule: [
      { time: '19:30', activity: 'Doors & Alpine mulled wine reception' },
      { time: '20:15', activity: 'Part I: Mozart & Beethoven Peaks Symphony' },
      { time: '21:15', activity: 'Intermission: Hot chocolate & roasted chestnuts' },
      { time: '21:45', activity: 'Part II: Modern Cinematic Soundtracks (Hans Zimmer, John Williams)' }
    ],
    faqs: [
      { question: 'How do we reach the venue?', answer: 'Wengen is car-free. You must take the cogwheel train from Lauterbrunnen, and follow signs (5 mins walk).' }
    ]
  }
];

export const MOCK_EVENT_BOOKINGS: EventBooking[] = [
  {
    id: 'eb_1',
    eventId: 'evt_1',
    eventTitle: 'Acoustic Sunset Jungle Sessions',
    eventBanner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    eventDate: '2026-07-12',
    eventTime: '16:30',
    eventCity: 'Bali',
    eventVenue: 'Green School Sanctuary, Ubud',
    bookingDate: '2026-07-01',
    ticketCount: 2,
    totalPrice: 90,
    status: 'upcoming',
    attendees: {
      fullName: 'Danish Phu',
      email: 'danishphu4321@gmail.com',
      phone: '+1 (555) 234-5678'
    }
  },
  {
    id: 'eb_2',
    eventId: 'evt_3',
    eventTitle: 'Late Night Comedy Club Paris',
    eventBanner: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=400&q=80',
    eventDate: '2026-05-15',
    eventTime: '21:00',
    eventCity: 'Paris',
    eventVenue: 'Le Caveau de la Huchette, Latin Quarter',
    bookingDate: '2026-05-10',
    ticketCount: 1,
    totalPrice: 25,
    status: 'past',
    attendees: {
      fullName: 'Danish Phu',
      email: 'danishphu4321@gmail.com',
      phone: '+1 (555) 234-5678'
    }
  }
];
