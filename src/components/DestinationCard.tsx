import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Destination } from '../types';
import { motion } from 'motion/react';

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
  key?: React.Key;
}

export default function DestinationCard({ destination, onClick }: DestinationCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6 }}
      className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Dimmer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

      {/* Top Tag: Rating */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm text-xs font-semibold text-slate-800">
        <Star size={13} className="fill-amber-400 text-amber-400" />
        <span>{destination.rating}</span>
      </div>

      {/* Card Content at Bottom */}
      <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end text-white">
        <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1 flex items-center gap-1">
          <MapPin size={12} /> {destination.propertyCount}+ Places
        </span>
        <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-emerald-350 transition-colors">
          {destination.name}
        </h3>
        <p className="text-xs text-slate-200 line-clamp-2 font-medium">
          {destination.description}
        </p>
      </div>
    </motion.div>
  );
}
