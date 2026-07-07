import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Image,
  Tag,
  DollarSign,
  Users,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Settings
} from 'lucide-react';
import Button from '../components/Button';
import { EventCategory } from '../types';

export default function CreateEvent() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent, isLoggedIn } = useApp();

  const isEditMode = !!id;
  const existingEvent = isEditMode ? events.find(e => e.id === id) : null;

  // Form Field States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Music Concerts');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('');
  const [galleryInput, setGalleryInput] = useState(''); // Comma separated URLs
  const [city, setCity] = useState('Bali');
  const [venue, setVenue] = useState('');
  const [mapLocation, setMapLocation] = useState('');
  const [date, setDate] = useState('2026-07-20');
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('21:00');
  const [ticketPrice, setTicketPrice] = useState<number>(35);
  const [totalSeats, setTotalSeats] = useState<number>(100);
  const [tagsInput, setTagsInput] = useState(''); // Comma separated tags
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isIndoor, setIsIndoor] = useState(false);
  const [isFamilyFriendly, setIsFamilyFriendly] = useState(true);
  const [artist, setArtist] = useState('');

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Pre-populate fields if in Edit Mode
  useEffect(() => {
    if (isEditMode && existingEvent) {
      setTitle(existingEvent.title);
      setCategory(existingEvent.category);
      setDescription(existingEvent.description);
      setBanner(existingEvent.banner);
      setGalleryInput(existingEvent.gallery.join(', '));
      setCity(existingEvent.city);
      setVenue(existingEvent.venue);
      setMapLocation(existingEvent.mapLocation);
      setDate(existingEvent.date);
      setStartTime(existingEvent.startTime);
      setEndTime(existingEvent.endTime);
      setTicketPrice(existingEvent.ticketPrice);
      setTotalSeats(existingEvent.totalSeats);
      setTagsInput(existingEvent.tags.join(', '));
      setPhone(existingEvent.contactInfo.phone);
      setEmail(existingEvent.contactInfo.email);
      setIsIndoor(existingEvent.isIndoor);
      setIsFamilyFriendly(existingEvent.isFamilyFriendly);
      setArtist(existingEvent.artist || '');
    }
  }, [isEditMode, existingEvent]);

  // Set default organizer emails if not filled
  useEffect(() => {
    if (!email && !isEditMode) {
      setEmail('organizer@travelstay.com');
      setPhone('+1 (555) 987-6543');
    }
  }, [email, isEditMode]);

  const categories: EventCategory[] = [
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
  ];

  const cities = ['Bali', 'Kyoto', 'Paris', 'Rome', 'Swiss Alps', 'New York'];

  // Presets of beautiful event images from Unsplash to offer quick setups
  const bannerPresets = [
    { label: 'Concert/Music', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80' },
    { label: 'Festival/Lights', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80' },
    { label: 'Standup/Microphone', url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80' },
    { label: 'Food/Dining', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80' },
    { label: 'Adventure/Outdoor', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Form Validations
    if (!title.trim() || !description.trim() || !venue.trim() || !phone.trim() || !email.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (!banner.trim()) {
      setFormError('Please select or paste an event banner cover URL.');
      return;
    }

    // Process comma separated lists
    const gallery = galleryInput
      ? galleryInput.split(',').map(u => u.trim()).filter(Boolean)
      : [banner];

    const tags = tagsInput
      ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : [category.split(' ')[0], city];

    const payload = {
      title: title.trim(),
      category,
      description: description.trim(),
      banner: banner.trim(),
      gallery,
      city,
      venue: venue.trim(),
      mapLocation: mapLocation.trim() || '40.7589, -73.9851 (Times Square Coordinates)',
      date,
      startTime,
      endTime,
      ticketPrice: Number(ticketPrice),
      totalSeats: Number(totalSeats),
      availableSeats: isEditMode && existingEvent ? Math.min(Number(totalSeats), existingEvent.availableSeats) : Number(totalSeats),
      tags,
      contactInfo: {
        phone: phone.trim(),
        email: email.trim()
      },
      organizerName: isEditMode && existingEvent ? existingEvent.organizerName : 'Custom Host Platform',
      isIndoor,
      isFamilyFriendly,
      artist: artist.trim() || undefined
    };

    if (isEditMode && id) {
      updateEvent(id, payload);
    } else {
      addEvent(payload);
    }

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      navigate('/organizer');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-slate-50">
      
      {/* Back button */}
      <button
        onClick={() => navigate('/organizer')}
        className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-emerald-600 uppercase tracking-wider mb-6 cursor-pointer"
      >
        <ArrowLeft size={14} /> Back to dashboard
      </button>

      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-8">
        <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">
          {isEditMode ? 'Modify Listing' : 'Publish Experience'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
          {isEditMode ? 'Edit Experience Details' : 'Create New Event'}
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold uppercase">
          Describe your upcoming event and set up your tickets to start selling
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-150 p-6 md:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {formError && (
            <div className="p-4 bg-red-50 border border-red-250 rounded-xl text-red-750 text-xs font-bold flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="p-5 bg-emerald-50 border border-emerald-250 rounded-xl text-emerald-800 text-sm font-black flex flex-col items-center gap-2 text-center">
              <CheckCircle2 size={28} className="text-emerald-600 animate-bounce" />
              <span>{isEditMode ? 'Experience updated successfully!' : 'Experience published successfully! Redirecting...'}</span>
            </div>
          )}

          {/* 1. Basic Details */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <FileText size={14} className="text-emerald-600" /> 1. Basic Experience Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acoustic Sunset Jungle Sessions"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EventCategory)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-emerald-500 font-bold"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">Featured Artist / Host / Performer</label>
                <input
                  type="text"
                  placeholder="e.g. Marcus Brody, Nika"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase">Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide a detailed description of what attendees will enjoy, what is included, schedule details, dietary policies, or rules."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            </div>
          </section>

          {/* 2. Visuals & Artworks */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Image size={14} className="text-emerald-600" /> 2. Experience Artworks
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">Cover Banner Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={banner}
                  onChange={(e) => setBanner(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              {/* Quick Preset Pickers */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[9px] font-bold text-slate-400 uppercase">Or select a standard cover artwork template:</p>
                <div className="flex flex-wrap gap-2">
                  {bannerPresets.map(preset => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setBanner(preset.url)}
                      className={`px-3 py-1.5 border rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer ${
                        banner === preset.url
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-650'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">Gallery Images (Comma-separated URLs)</label>
                <input
                  type="text"
                  placeholder="https://url1.jpg, https://url2.jpg..."
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
          </section>

          {/* 3. Date, Time & Seating Capacity */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Calendar size={14} className="text-emerald-600" /> 3. Schedule & Tickets Pricing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">Event Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold text-slate-700"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">Start Time *</label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold text-slate-700"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">End Time *</label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold text-slate-700"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1">
                  <DollarSign size={11} /> Price per Ticket ($ USD) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="500"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1">
                  <Users size={11} /> Total Seating Seats *
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  max="1000"
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(Number(e.target.value))}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="jazz, fun, outdoor, wine..."
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
          </section>

          {/* 4. Location Details */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <MapPin size={14} className="text-emerald-600" /> 4. Location & Venue details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">City *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-emerald-500 font-bold"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase">Venue Address / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Green School Canopy, Ubud"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase">Google Map Coordinate Location / Mock Details</label>
                <input
                  type="text"
                  placeholder="e.g. -8.5194, 115.2631 (Ubud Canopy Stage)"
                  value={mapLocation}
                  onChange={(e) => setMapLocation(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
          </section>

          {/* 5. Toggles Setting */}
          <section className="flex flex-col gap-4 border-t border-slate-100 pt-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Sliders size={14} className="text-emerald-600" /> 5. Setting Rules
            </h3>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Indoor toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsIndoor(!isIndoor)}
                  className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${
                    isIndoor ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isIndoor ? 'right-1' : 'left-1'}`} />
                </button>
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase leading-none">Indoor Setting</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold">Is this event inside a hall/cellar/studio?</p>
                </div>
              </div>

              {/* Family friendly toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFamilyFriendly(!isFamilyFriendly)}
                  className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${
                    isFamilyFriendly ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isFamilyFriendly ? 'right-1' : 'left-1'}`} />
                </button>
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase leading-none">Family Friendly</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold">Suitable for all age groups and children?</p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Organizer Contact Details */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Phone size={14} className="text-emerald-600" /> 6. Organizer Contacts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1">
                  <Mail size={11} /> Support Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@organizer.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1">
                  <Phone size={11} /> Hotline Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
          </section>

          {/* Action buttons */}
          <div className="flex gap-4 border-t border-slate-100 pt-6 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/organizer')}
              className="flex-1 font-bold text-sm py-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 font-black text-sm py-3 uppercase tracking-wider"
            >
              {isEditMode ? 'Update Event Listing' : 'Publish Experience'}
            </Button>
          </div>

        </form>
      </div>

    </div>
  );
}
