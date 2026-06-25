import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Heart, Calendar, User, Search, LayoutDashboard, LogIn, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import Button from './Button';

export default function Navbar() {
  const { user, isLoggedIn, setLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login');
  };

  const navItems = [
    { label: 'Explore', path: '/', icon: <Globe size={16} /> },
    { label: 'Search', path: '/search', icon: <Search size={16} /> },
    { label: 'My Bookings', path: '/bookings', icon: <Calendar size={16} /> },
    { label: 'Wishlist', path: '/wishlist', icon: <Heart size={16} /> },
    { label: 'Reviews', path: '/reviews', icon: <MessageSquare size={16} /> },
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-45 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black group-hover:scale-105 transition-transform">
              <Globe size={18} />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-800 group-hover:text-emerald-600 transition-colors">
              Travel<span className="text-emerald-650">Stay</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${isActive
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop User Section */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 border-l border-slate-100 pl-4">
                <Link to="/profile" className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer text-sm font-semibold">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <span className="max-w-[100px] truncate">{user.fullName.split(' ')[0]}</span>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs">
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-50 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${isActive
                      ? 'text-emerald-700 bg-emerald-55/15 font-bold'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}

              <hr className="border-slate-100/80 my-1" />

              {/* Mobile Auth/Profile Actions */}
              {isLoggedIn ? (
                <div className="flex flex-col gap-3 pt-1">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded-xl"
                  >
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none mb-0.5">{user.fullName}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2.5 pt-1">
                  <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" fullWidth>Login</Button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="sm" fullWidth>Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
