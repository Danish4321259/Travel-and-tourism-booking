import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { PROPERTIES } from '../data/dummyData';
import { Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SearchBar from '../components/SearchBar';
import { SlidersHorizontal, ChevronRight, EyeOff, RotateCcw, Info, Star } from 'lucide-react';
import Button from '../components/Button';

export default function SearchResults() {
  const navigate = useNavigate();
  const { searchParams } = useApp();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc'>('rating');

  // Filter States
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);
  const [destinationSearch, setDestinationSearch] = useState(searchParams.destination);

  // Trigger loading effect when search parameter or filter shifts
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchParams, selectedTypes, maxPrice, minRating, sortBy, destinationSearch]);

  // Handle location query changes from the main search params
  useEffect(() => {
    setDestinationSearch(searchParams.destination);
  }, [searchParams.destination]);

  // Property type handler
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Filter logic
  const filteredProperties = PROPERTIES.filter(prop => {
    // 1. Destination Matching (Case Insensitive)
    if (destinationSearch.trim()) {
      const q = destinationSearch.toLowerCase();
      const matchCity = prop.city.toLowerCase().includes(q);
      const matchCountry = prop.country.toLowerCase().includes(q);
      const matchName = prop.name.toLowerCase().includes(q);
      if (!matchCity && !matchCountry && !matchName) return false;
    }

    // 2. Property type matching
    if (selectedTypes.length > 0 && !selectedTypes.includes(prop.type)) {
      return false;
    }

    // 3. Price Matching
    if (prop.price > maxPrice) {
      return false;
    }

    // 4. Rating Matching
    if (prop.rating < minRating) {
      return false;
    }

    return true;
  });

  // Sort logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    return b.rating - a.rating; // default: review rating
  });

  // Pagination bounds
  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(sortedProperties.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = sortedProperties.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSelectedTypes([]);
    setMaxPrice(500);
    setMinRating(0);
    setDestinationSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Search Header Container with mini compact search widget */}
      <section className="bg-slate-900 p-6 md:p-8 rounded-2xl shadow-md text-white">
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl font-black tracking-tight mb-1">Find Your Personalized Stay</h1>
          <p className="text-xs text-slate-300 font-medium">Over 1,200 hotels with free cancellations and flexible billing.</p>
        </div>
        <SearchBar compact={true} />
      </section>

      {/* Main split viewport layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* FILTERS COLUMN */}
        <aside className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col gap-6 self-start">
          <div className="flex justify-between items-center border-b border-slate-50 pb-3">
            <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-emerald-600" /> Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-[10px] text-slate-400 hover:text-emerald-650 flex items-center gap-1 font-bold uppercase tracking-wider cursor-pointer"
            >
              <RotateCcw size={10} /> Reset
            </button>
          </div>

          {/* 1. Property Type */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Property Type</h4>
            <div className="flex flex-col gap-2">
              {['hotel', 'resort', 'homestay'].map((type) => (
                <label key={type} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="capitalize">{type === 'homestay' ? 'Homestay / Loft' : type}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-slate-50" />

          {/* 2. Price Filter Range */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Max Budget</h4>
              <span className="text-xs font-black text-emerald-600 font-mono">${maxPrice} / night</span>
            </div>
            <input
              type="range"
              min="100"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
              <span>$100</span>
              <span>$300</span>
              <span>$500</span>
            </div>
          </div>

          <hr className="border-slate-50" />

          {/* 3. Rating Minimum Score */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Minimum Rating</h4>
            <div className="flex flex-col gap-1.5">
              {[4.9, 4.8, 4.7, 4.6].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`flex items-center gap-2 text-xs py-1.5 px-2.5 rounded-lg border text-left transition-colors font-medium
                    ${minRating === rating
                      ? 'bg-amber-50 border-amber-250 text-amber-800 font-bold'
                      : 'bg-transparent border-slate-100 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                  <span>{rating}+ stars</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RESULTS GRID COLUMN */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          {/* Top Sort & Statistics Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Showing {sortedProperties.length === 0 ? '0' : `${startIndex + 1} – ${Math.min(startIndex + itemsPerPage, sortedProperties.length)}`} of <strong className="text-slate-800">{sortedProperties.length} matches</strong>
                {destinationSearch && <span> for "<span className="text-emerald-700 italic font-semibold">{destinationSearch}</span>"</span>}
              </p>
            </div>

            {/* Sort Choices */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs py-1.5 px-3 rounded-lg outline-none focus:border-emerald-500 font-bold cursor-pointer"
              >
                <option value="rating">Top Rated & Popular</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* MAIN PROPERTIES DISPLAY */}
          {loading ? (
            <LoadingSkeleton type="card" count={3} />
          ) : paginatedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={() => navigate(`/property/${property.id}`)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <EyeOff size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">No Matching Properties Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't spot any results with your current filter settings. Try relaxing pricing sliders or clearing checks.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Clear All Filters
              </Button>
            </div>
          )}

          {/* PAGINATION PANEL */}
          {sortedProperties.length > itemsPerPage && !loading && (
            <div className="flex items-center justify-center gap-1 mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-3"
              >
                Back
              </Button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold leading-none select-none cursor-pointer border transition-colors
                    ${currentPage === idx + 1
                      ? 'bg-emerald-600 border-emerald-600 text-white font-extrabold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {idx + 1}
                </button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-3"
              >
                Next
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
