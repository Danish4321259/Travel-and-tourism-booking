import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROPERTIES, TOUR_PACKAGES } from '../data/dummyData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line, Legend } from 'recharts';
import { Users, Building2, AlertCircle, TrendingUp, DollarSign, Receipt, Briefcase, Trash2 } from 'lucide-react';
import Button from '../components/Button';

// Mock chart statistical data over half-year limits
const ANALYTICS_DATA = [
  { month: 'Jan', revenue: 4500, bookings: 12, users: 40 },
  { month: 'Feb', revenue: 5900, bookings: 18, users: 55 },
  { month: 'Mar', revenue: 8000, bookings: 24, users: 80 },
  { month: 'Apr', revenue: 9800, bookings: 29, users: 102 },
  { month: 'May', revenue: 12500, bookings: 36, users: 125 },
  { month: 'Jun', revenue: 15400, bookings: 45, users: 142 },
];

export default function AdminDashboard() {
  const { bookings, user } = useApp();
  const [activeTableTab, setActiveTableTab] = useState<'bookings' | 'properties' | 'users'>('bookings');

  // Local state inventory lists allowing interactive mock removal
  const [localProperties, setLocalProperties] = useState(PROPERTIES);
  const [localBookings, setLocalBookings] = useState(bookings);

  // Mocked users directory list
  const [localUsers, setLocalUsers] = useState([
    { id: 'usr_1', name: 'Danish Phu', email: 'danishphu4321@gmail.com', status: 'verified', joined: '2026-03-24' },
    { id: 'usr_2', name: 'Alissa Vance', email: 'alissa.v@google.com', status: 'verified', joined: '2026-04-10' },
    { id: 'usr_3', name: 'Akira Watanabe', email: 'akira.w@kyoto.jp', status: 'invited', joined: '2026-05-18' },
    { id: 'usr_4', name: 'Sophia Laurent', email: 'sophia@laurent.fr', status: 'verified', joined: '2026-06-01' },
  ]);

  const handleDeleteProperty = (id: string) => {
    setLocalProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleDeleteUser = (id: string) => {
    setLocalUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
          Admin Portal <span className="text-xs bg-red-150 text-red-700 px-2.5 py-1 rounded-full uppercase font-black border border-red-200">System Live</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Verify system directories, oversee monthly accounting sheets, or review server listings.</p>
      </div>

      {/* 1. Dashboard Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Rev */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Yield</span>
            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight mt-0.5">$15,400</h3>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5"><TrendingUp size={10} /> +24% vs Last Q</span>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Receipt size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Active Bookings</span>
            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight mt-0.5">{localBookings.length}</h3>
            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Real-time stats</span>
          </div>
        </div>

        {/* Properties count */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Listed Properties</span>
            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight mt-0.5">{localProperties.length}</h3>
            <span className="text-[10px] text-purple-600 font-semibold block mt-0.5">3 on waiting queues</span>
          </div>
        </div>

        {/* Users */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Shoppers</span>
            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight mt-0.5">{localUsers.length}</h3>
            <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">14 active sessions</span>
          </div>
        </div>
      </div>

      {/* 2. Revenue Analytics Charts UI */}
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-4 mb-6">
          <div>
            <h3 className="text-base font-black text-slate-800 tracking-tight leading-none">Earnings Performance</h3>
            <p className="text-[10px] text-slate-400 mt-1">Simulated operational stats from Jan 2026 to Jun 2026</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-600 rounded-full" /> Revenue ($)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full" /> Bookings</span>
          </div>
        </div>

        {/* Chart Viewport Wrapper */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold', fill: '#94A3B8' }} />
              <YAxis tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold', fill: '#94A3B8' }} />
              <Tooltip
                contentStyle={{ background: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px', color: '#FFF' }}
                itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Manage Entities List with Tabs */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
        {/* Tabs switcher row */}
        <div className="flex border-b border-slate-50 bg-slate-50/50 p-2 gap-2">
          <button
            onClick={() => setActiveTableTab('bookings')}
            className={`py-2 px-4 rounded-lg text-xs font-bold transition-all select-none cursor-pointer
              ${activeTableTab === 'bookings' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Manage Bookings ({localBookings.length})
          </button>
          <button
            onClick={() => setActiveTableTab('properties')}
            className={`py-2 px-4 rounded-lg text-xs font-bold transition-all select-none cursor-pointer
              ${activeTableTab === 'properties' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Manage Properties ({localProperties.length})
          </button>
          <button
            onClick={() => setActiveTableTab('users')}
            className={`py-2 px-4 rounded-lg text-xs font-bold transition-all select-none cursor-pointer
              ${activeTableTab === 'users' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Manage Users ({localUsers.length})
          </button>
        </div>

        {/* Tab content renderer */}
        <div className="p-4 overflow-x-auto">
          {activeTableTab === 'bookings' && (
            <table className="w-full text-xs text-left text-slate-650 min-w-[650px]">
              <thead className="bg-[#f8fafc] text-slate-500 uppercase tracking-wider text-[10px] font-black border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Booking ID</th>
                  <th className="px-4 py-3">Traveler Display</th>
                  <th className="px-4 py-3">Listing Name</th>
                  <th className="px-4 py-3">Check-In</th>
                  <th className="px-4 py-3">Pricing Detail</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {localBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-bold font-mono">{b.id}</td>
                    <td className="px-4 py-3.5">{b.travelerInfo.fullName}</td>
                    <td className="px-4 py-3.5 max-w-xs truncate">{b.itemName}</td>
                    <td className="px-4 py-3.5 font-semibold font-mono text-slate-450">{b.checkIn}</td>
                    <td className="px-4 py-3.5 font-black text-slate-800">${b.totalPrice}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border
                        ${b.status === 'upcoming' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : (b.status === 'past' ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-red-50 border-red-100 text-red-650')}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTableTab === 'properties' && (
            <table className="w-full text-xs text-left text-slate-650 min-w-[650px]">
              <thead className="bg-[#f8fafc] text-slate-500 uppercase tracking-wider text-[10px] font-black border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Property Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 font-right">Room Rates</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {localProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-2 shrink-0">
                      <img src={p.image} alt={p.name} className="w-10 h-7 object-cover rounded-md" referrerPolicy="no-referrer" />
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-800 max-w-xs truncate">{p.name}</td>
                    <td className="px-4 py-3.5 uppercase text-[9px] font-black text-slate-400 tracking-wider font-mono">{p.type}</td>
                    <td className="px-4 py-3.5 font-black text-emerald-600">${p.price} / night</td>
                    <td className="px-4 py-3.5">★ {p.rating} ({p.reviewCount})</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDeleteProperty(p.id)}
                        className="p-1 px-2.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 cursor-pointer font-bold uppercase tracking-wider text-[10px]"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTableTab === 'users' && (
            <table className="w-full text-xs text-left text-slate-650 min-w-[650px]">
              <thead className="bg-[#f8fafc] text-slate-500 uppercase tracking-wider text-[10px] font-black border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Accredited Name</th>
                  <th className="px-4 py-3">Associated Email</th>
                  <th className="px-4 py-3">Member Since</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium font-semibold">
                {localUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-slate-400">{u.id}</td>
                    <td className="px-4 py-3.5 font-bold text-slate-800">{u.name}</td>
                    <td className="px-4 py-3.5">{u.email}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-400">{u.joined}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        disabled={u.email === user.email}
                        className="p-1 px-2.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 cursor-pointer font-bold uppercase tracking-wider text-[10px] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
