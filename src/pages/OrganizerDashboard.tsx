import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Plus,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Edit3,
  Trash2,
  Ticket,
  Mail,
  Phone,
  BarChart2,
  Sliders,
  CheckCircle,
  Eye,
  Briefcase
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import Button from '../components/Button';

export default function OrganizerDashboard() {
  const { events, eventBookings, deleteEvent, user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listings' | 'bookings'>('dashboard');

  // Filter out events belonging to this organizer (mocking that the user is the organizer for some events, let's treat any event created, or we can filter by organizerName, or simply let them manage all events in the system for complete control!)
  const myEvents = events;

  // Aggregate Metrics
  const totalEvents = myEvents.length;
  
  // Sum up tickets sold and revenue
  const totalTicketsSold = eventBookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.ticketCount, 0);

  const totalRevenue = eventBookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const handleDeleteEvent = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"? This cannot be undone.`)) {
      deleteEvent(id);
    }
  };

  // Prepare chart data based on event ticket sales
  const salesChartData = myEvents.map(evt => {
    // calculate bookings for this event
    const eventBookedCount = eventBookings
      .filter(b => b.eventId === evt.id && b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.ticketCount, 0);

    const eventRev = eventBookings
      .filter(b => b.eventId === evt.id && b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return {
      name: evt.title.slice(0, 15) + '...',
      tickets: eventBookedCount,
      revenue: eventRev
    };
  });

  // Prepare Category split chart data
  const categorySplitMap: Record<string, number> = {};
  myEvents.forEach(evt => {
    categorySplitMap[evt.category] = (categorySplitMap[evt.category] || 0) + 1;
  });
  const categoryChartData = Object.keys(categorySplitMap).map(cat => ({
    name: cat,
    value: categorySplitMap[cat]
  }));

  const COLORS = ['#059669', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-slate-50 flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-emerald-600 text-xs font-black tracking-wider uppercase">Organizer Hub</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">Creator Dashboard</h1>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1">
            Welcome back, {user.fullName}! Create, list, and monitor your local bookings
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/organizer/create')}
          className="font-black gap-1.5 text-xs py-3 shadow-md shadow-emerald-700/15 uppercase tracking-wider"
        >
          <Plus size={16} /> Create New Event
        </Button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Events active */}
        <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Published Events</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2.5">{totalEvents}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5">All experiences verified</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Calendar size={22} />
          </div>
        </div>

        {/* Tickets sold */}
        <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Tickets Booked</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2.5">{totalTicketsSold}</h3>
            <p className="text-[10px] text-emerald-650 font-black uppercase mt-1.5">Rising attendance rates</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>

        {/* Revenue earned */}
        <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Gross Ticket Revenue</p>
            <h3 className="text-3xl font-black text-slate-850 mt-2.5">${totalRevenue}</h3>
            <p className="text-[10px] text-emerald-650 font-black uppercase mt-1.5">100% Instant Payouts</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <DollarSign size={22} />
          </div>
        </div>

      </div>

      {/* Navigation tabs for portal */}
      <div className="flex border-b border-slate-200 bg-white p-1 rounded-xl border">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
            activeTab === 'dashboard'
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
          }`}
        >
          Analytics & Performance
        </button>
        <button
          onClick={() => setActiveTab('listings')}
          className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
            activeTab === 'listings'
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
          }`}
        >
          My Listings ({totalEvents})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
            activeTab === 'bookings'
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
          }`}
        >
          Attendee Bookings ({eventBookings.length})
        </button>
      </div>

      {/* --- RENDERED TABS --- */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-150 p-6 shadow-xs flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Revenue Breakdown by Event</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Comparing gross revenue sales in USD</p>
            </div>
            
            <div className="h-80 w-full mt-4">
              {salesChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 700 }} />
                    <YAxis tick={{ fontSize: 9, fontWeight: 700 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
                  Create events and complete sales to see data.
                </div>
              )}
            </div>
          </div>

          {/* Category distribution */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-150 p-6 shadow-xs flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Categories Distribution</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Spread of listings across segments</p>
            </div>

            <div className="h-60 w-full relative flex items-center justify-center mt-4">
              {categoryChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-slate-450 text-xs italic">No categorizations.</div>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-1.5 mt-2">
              {categoryChartData.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between text-xs font-bold text-slate-650">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="truncate max-w-[150px]">{item.name}</span>
                  </div>
                  <span>{item.value} Listings</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'listings' && (
        <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">My Active Event Listings</h3>
            <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">
              {totalEvents} Active
            </span>
          </div>

          {myEvents.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs flex flex-col items-center gap-3">
              <p className="italic">You haven't listed any events yet.</p>
              <Button size="sm" onClick={() => navigate('/organizer/create')} className="font-bold text-xs">
                List Your First Event
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px]">
                    <th className="py-3 px-2">Event Detail</th>
                    <th className="py-3 px-2">Category & City</th>
                    <th className="py-3 px-2">Price</th>
                    <th className="py-3 px-2">Seats Status</th>
                    <th className="py-3 px-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
                  {myEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex gap-3 items-center">
                          <img src={evt.banner} alt="" className="w-12 h-10 object-cover rounded-lg" />
                          <div>
                            <p className="text-xs font-black text-slate-800 line-clamp-1">{evt.title}</p>
                            <p className="text-[9px] text-slate-400 mt-0.5">{new Date(evt.date).toLocaleDateString()} at {evt.startTime}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <p className="text-slate-700">{evt.category}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{evt.city}</p>
                      </td>
                      <td className="py-3 px-2 text-slate-800 font-black">${evt.ticketPrice}</td>
                      <td className="py-3 px-2">
                        <p className="text-xs text-slate-800">{evt.availableSeats} / {evt.totalSeats} left</p>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full bg-emerald-650"
                            style={{ width: `${(evt.availableSeats / evt.totalSeats) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => navigate(`/events/${evt.id}`)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            title="View on site"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            onClick={() => navigate(`/organizer/edit/${evt.id}`)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-emerald-600 transition-colors cursor-pointer"
                            title="Edit Event"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id, evt.title)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                            title="Delete Event"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Bookings & Reservations Log</h3>
            <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">
              {eventBookings.length} Total Registered
            </span>
          </div>

          {eventBookings.length === 0 ? (
            <p className="text-center py-12 text-slate-400 text-xs italic">No bookings recorded yet for your events.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px]">
                    <th className="py-3 px-2">Booking ID</th>
                    <th className="py-3 px-2">Event Title</th>
                    <th className="py-3 px-2">Lead Customer</th>
                    <th className="py-3 px-2">Quantity</th>
                    <th className="py-3 px-2">Revenue</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
                  {eventBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-2 font-mono text-[10px] text-slate-400">{b.id}</td>
                      <td className="py-3 px-2 font-black text-slate-800 line-clamp-1 max-w-[200px]">{b.eventTitle}</td>
                      <td className="py-3 px-2">
                        <p className="text-slate-800 leading-none">{b.attendees.fullName}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{b.attendees.email}</p>
                      </td>
                      <td className="py-3 px-2 text-slate-655">{b.ticketCount} passes</td>
                      <td className="py-3 px-2 text-slate-800 font-black">${b.totalPrice}</td>
                      <td className="py-3 px-2">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          b.status === 'upcoming'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-250'
                            : b.status === 'past'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-red-50 text-red-750'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
