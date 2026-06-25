import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import Button from './Button';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Row */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer inline-flex">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black group-hover:scale-105 transition-transform">
                <Globe size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Travel<span className="text-emerald-500">Stay</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Book your next flight, holiday resort, urban boutique hotel, or immersive heritage escape with complete confidence. Beautiful vacations, simplified.
            </p>
            {/* Contact Details */}
            <div className="flex flex-col gap-2.5 mt-2 text-xs text-slate-350 font-medium">
              <span className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-500" /> +919876543210
              </span>
              <span className="flex items-center gap-2">
                <Mail size={13} className="text-emerald-500" /> support@travelstayema.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-emerald-500" /> Imphal,Manipur India
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore More</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link to="/search?type=hotel" className="hover:text-emerald-450 transition-colors">Luxury Hotels</Link></li>
              <li><Link to="/search?type=resort" className="hover:text-emerald-450 transition-colors">Seaside Resorts</Link></li>
              <li><Link to="/search?type=homestay" className="hover:text-emerald-450 transition-colors">Quiet Homestays</Link></li>
              <li><Link to="/" className="hover:text-emerald-450 transition-colors">Special Tour Packages</Link></li>
              <li><Link to="/wishlist" className="hover:text-emerald-450 transition-colors">Saved Wishlist</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Our Company</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link to="/" className="hover:text-emerald-450 transition-colors">About TravelStay</Link></li>
              <li><Link to="/" className="hover:text-emerald-450 transition-colors">Press & Newsroom</Link></li>
              <li><Link to="/" className="hover:text-emerald-450 transition-colors">Careers & Internships</Link></li>
              <li><Link to="/" className="hover:text-emerald-450 transition-colors">Partner with Us</Link></li>
              <li><Link to="/" className="hover:text-emerald-450 transition-colors">Global Affiliates</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Newsletter</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Join 50k+ travelers receiving secret promotional codes and seasonal guides!
            </p>
            {subscribed ? (
              <div className="bg-emerald-900/35 border border-emerald-800/60 rounded-xl p-3 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative mt-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700/80 rounded-xl py-2.5 pl-3.5 pr-10 text-xs text-white outline-none focus:border-emerald-500 placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 text-emerald-500 hover:text-emerald-400 top-1.5 p-1.5 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        <hr className="border-slate-800/80 mb-8" />

        {/* Brand Bottom metadata */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 TravelStay Inc. All rights reserved. Created By EMASOFT TEAM.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
