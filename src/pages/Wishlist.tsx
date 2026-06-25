import React from 'react';
import { useApp } from '../context/AppContext';
import { PROPERTIES } from '../data/dummyData';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartOff, Map } from 'lucide-react';
import Button from '../components/Button';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist } = useApp();

  // Find actual property data records saved in global array
  const wishlistedProperties = PROPERTIES.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
          <Heart size={24} className="text-red-500 fill-red-500 shrink-0" /> Saved Wishlist
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Keep track of your dream properties, cabins, and suites for seasonal comparisons.</p>
      </div>

      <hr className="border-slate-100" />

      {/* Grid listing */}
      {wishlistedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={() => navigate(`/property/${property.id}`)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center flex flex-col items-center gap-4 max-w-lg mx-auto w-full">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-50 flex items-center justify-center text-red-500">
            <HeartOff size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
              Tap the heart icon on any resort, penthouse, or cottage detail card to bundle items here for simple reference.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/search')} className="font-bold gap-1.5 cursor-pointer">
            <Map size={13} /> Start Selecting Stays
          </Button>
        </div>
      )}
    </div>
  );
}
