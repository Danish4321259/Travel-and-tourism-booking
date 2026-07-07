import React from 'react';
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import Button from './Button';

interface PropertyCardProps {
  property: Property;
  onViewDetails?: () => void;
  key?: React.Key;
}

export default function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const { wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(property.id);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'resort': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'homestay': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
    >
      {/* Property Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          referrerPolicy="no-referrer"
        />
        
        {/* Wishlist Floating Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(property.id);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-xs shadow-md border border-slate-100 text-slate-500 hover:text-red-500 hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <Heart
            size={18}
            className={`transition-all ${isWishlisted ? 'fill-red-500 text-red-500 stroke-red-500 scale-105' : 'stroke-slate-600'}`}
          />
        </button>

        {/* Floating Property Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-sm ${getBadgeColor(property.type)}`}>
            {property.type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Location & Rating */}
        <div className="flex justify-between items-center gap-2 mb-2">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <MapPin size={12} className="text-emerald-500 shrink-0" /> {property.city}, {property.country}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-700 text-xs font-bold">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>{property.rating}</span>
            <span className="text-slate-400 font-normal">({property.reviewCount})</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-base font-bold text-slate-800 tracking-tight line-clamp-1 mb-1.5 group-hover:text-emerald-600 transition-colors">
          {property.name}
        </h3>

        {/* Brief description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed flex-1">
          {property.description}
        </p>

        {/* Selected Amenities Row (Top 3) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="text-[10px] items-center bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100">
              {amenity}
            </span>
          ))}
        </div>

        <hr className="border-slate-50 mb-4" />

        {/* Price & Action button */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Starting from</p>
            <p className="text-lg font-black text-slate-800">
              ${property.price}
              <span className="text-xs text-slate-400 font-normal"> / night</span>
            </p>
          </div>
          {onViewDetails && (
            <Button variant="primary" size="sm" onClick={onViewDetails} className="gap-1 shadow-xs hover:shadow-sm cursor-pointer">
              Book <ArrowRight size={14} />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
