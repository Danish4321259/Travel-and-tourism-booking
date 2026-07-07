import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ShieldCheck, HeartHandshake, ArrowRight, Star, HelpCircle, CheckCircle } from 'lucide-react';
import { DESTINATIONS, PROPERTIES, TOUR_PACKAGES } from '../data/dummyData';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/Button';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();
  const { updateSearch, toggleWishlist, wishlist } = useApp();

  const handleDestinationClick = (name: string) => {
    updateSearch({ destination: name });
    navigate('/search');
  };

  const handleViewProperty = (id: string) => {
    navigate(`/property/${id}`);
  };

  const handleBookPackage = (pkgId: string) => {
    const pkg = TOUR_PACKAGES.find(p => p.id === pkgId);
    if (pkg) {
      navigate(`/property/package_${pkgId}`); // redirect to details page for the package
    }
  };

  const whyChooseUsData = [
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: 'Handpicked Luxury',
      description: 'We audit every single listing manually for superior hygiene, amenities, and hospitality records.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Durable Price Match',
      description: 'Found a lower price elsewhere? We will immediately match and refund 110% of the difference.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
      title: '24/7 Concierge Support',
      description: 'Access real human chat support directly inside the web interface day or night.'
    }
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      
      {/* 1. Hero Banner with Floating Search Bar */}
      <section className="relative min-h-[85vh] md:min-h-[80vh] flex flex-col justify-center items-center text-center px-4 pt-16 pb-26 bg-slate-900">
        {/* Background Artwork */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80"
            alt="Scenic view resort"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Color Gradient Overlay wrapper */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-900/95" />

        {/* Hero Copy */}
        <div className="relative max-w-3xl flex flex-col items-center gap-6 z-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-450 uppercase tracking-widest text-xs md:text-sm font-black bg-emerald-900/40 px-4 py-1.5 rounded-full border border-emerald-800/60"
          >
            Welcome to the future of vacations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-tight"
          >
            Find Your Next Cozy Stay & Adventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl font-medium"
          >
            Book premium hand-verified hotels, serene mountain resorts, custom townhomes, and curated local heritage tours.
          </motion.p>
        </div>

        {/* Search Bar Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 left-0 w-full translate-y-1/2 px-4 sm:px-6 lg:px-8 z-30"
        >
          <SearchBar />
        </motion.div>
      </section>

      {/* 2. Popular Destinations */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="flex justify-between items-end gap-6 mb-8">
          <div>
            <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">Hot spots</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Popular Destinations</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/search')} className="gap-1 font-bold text-emerald-600">
            View All <ArrowRight size={14} />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onClick={() => handleDestinationClick(dest.name.split(',')[0])}
            />
          ))}
        </div>
      </section>

      {/* 3. Featured Hotels */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end gap-6 mb-8">
          <div>
            <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">Handpicked for you</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Featured Hotels & Resorts</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/search')} className="gap-1 font-bold text-emerald-600">
            Explore All <ArrowRight size={14} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.filter(p => p.featured).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={() => handleViewProperty(property.id)}
            />
          ))}
        </div>
      </section>

      {/* 4. Popular Tour Packages */}
      <section className="bg-slate-100/50 border-y border-slate-100 py-16 md:py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end gap-6 mb-10">
            <div>
              <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">All-Inclusive Explorations</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Popular Tour Packages</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOUR_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-50">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {pkg.duration}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-medium mb-1.5">
                      <span>{pkg.location}</span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star size={11} className="fill-amber-400 text-amber-400" /> {pkg.rating}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 tracking-tight line-clamp-1 mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 font-normal">
                      {pkg.description}
                    </p>

                    {/* Features list */}
                    <div className="flex flex-col gap-1.5 mb-5">
                      {pkg.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase">
                          <CheckCircle size={10} className="text-emerald-500 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Tour Price</p>
                      <p className="text-lg font-black text-slate-800 leading-snug">
                        ${pkg.price} <span className="text-[10px] text-slate-400 font-normal">/ guest</span>
                      </p>
                    </div>
                    {/* Use custom id as package identifier for mock pages */}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/property/package_${pkg.id}`)}
                      className="cursor-pointer font-bold shrink-0 text-xs px-3.5 py-2 rounded-lg"
                    >
                      Book Tour
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">Our Commitment</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Why Choose Us?</h2>
          <p className="text-xs text-slate-400 mt-2 font-medium">We do multiple visual inspections on-site and offer unparalleled refund facilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUsData.map((choice, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left gap-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                {choice.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">{choice.title}</h3>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">{choice.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="bg-emerald-950 text-white py-16 md:py-20 w-full overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-emerald-350 text-xs font-black tracking-wider uppercase">Happy travelers</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">Customer Testimonials</h2>
            <p className="text-xs text-slate-300 mt-2 font-light">Read direct feedback left by travelers who toured with us in the previous season.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-900/40 border border-emerald-800/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <p className="text-xs text-slate-250 italic leading-relaxed font-normal">
                "The experience in Kyoto Machiya was like stepping straight into history. Tatami rooms, cedar bath tubs, and the local recommendations from the team were absolutely stellar!"
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" alt="Sarah" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold leading-none mb-0.5">Sophia Laurent</h4>
                  <p className="text-[10px] text-emerald-350 font-semibold uppercase">Stayed in Kyoto</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900/40 border border-emerald-800/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <p className="text-xs text-slate-250 italic leading-relaxed font-normal">
                "Finding secure family resorts in Ubud used to be a nightmare, but the Royal Ubud Suite was verified and perfect. Our private check-in process was faster than a heartbeat."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Marcus" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold leading-none mb-0.5">Marcus Chen</h4>
                  <p className="text-[10px] text-emerald-350 font-semibold uppercase">Stayed in Ubud, Bali</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900/40 border border-emerald-800/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <p className="text-xs text-slate-250 italic leading-relaxed font-normal">
                "The Swiss Alps tour layout was exceptionally smooth. Transfer tickets loaded right into the email, hotels were warm, and mountains were majestic. We will book again next January."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Jessica" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold leading-none mb-0.5">Jessica Mitchell</h4>
                  <p className="text-[10px] text-emerald-350 font-semibold uppercase">Spent 7 Days in Swiss Alps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
