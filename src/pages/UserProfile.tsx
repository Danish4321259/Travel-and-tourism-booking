import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, Edit3, Save, CheckCircle2, ShieldAlert } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function UserProfile() {
  const { user, updateUser } = useApp();

  // Local form states
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [avatar, setAvatar] = useState(user.avatar);

  const [savingDone, setSavingDone] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      fullName,
      email,
      phone,
      avatar
    });
    setSavingDone(true);
    setEditMode(false);
    setTimeout(() => setSavingDone(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">My Profile Settings</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Configure personal contact records, billing handles, and avatars.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Profile Card Sidebar */}
        <div className="md:col-span-1 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <img
              src={avatar}
              alt={user.fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-50 shadow-md"
              referrerPolicy="no-referrer"
            />
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  // Cycle mock illustrations for cute change options
                  const idx = Math.floor(Math.random() * 5);
                  const avatars = [
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                  ];
                  setAvatar(avatars[idx]);
                }}
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-600 text-white border border-white hover:bg-emerald-700 cursor-pointer shadow"
                title="Cycle mock photos"
              >
                <Edit3 size={11} />
              </button>
            )}
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800 leading-tight">{user.fullName}</h3>
            <p className="text-xs text-slate-400 font-medium">{user.email}</p>
          </div>

          <div className="flex gap-2 w-full text-left text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 flex-col gap-1.5 font-medium leading-none">
            <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Authorization</span>
            <span className="flex items-center gap-1.5 text-emerald-700">✓ Email Verified</span>
            <span className="flex items-center gap-1.5 text-blue-700">✓ SMS Connected</span>
          </div>
        </div>

        {/* Form panel */}
        <div className="md:col-span-2 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-slate-55/15 pb-3">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Profile Details</h3>
            {!editMode ? (
              <Button variant="outline" size="sm" onClick={() => setEditMode(true)} className="gap-1 font-bold text-xs">
                <Edit3 size={12} /> Edit Details
              </Button>
            ) : (
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest animate-pulse">Editing Mode Active</span>
            )}
          </div>

          {savingDone && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-3.5 rounded-xl text-xs flex items-center gap-2 font-semibold">
              <CheckCircle2 size={15} />
              <span>Settings updated successfully in context! All files are synchronised.</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <InputField
              label="Accredited Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!editMode}
              icon={<User size={16} />}
              required
            />

            <InputField
              label="Email Link Point"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editMode}
              icon={<Mail size={16} />}
              required
            />

            <InputField
              label="SMS Notification Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editMode}
              icon={<Phone size={16} />}
              required
            />

            {editMode && (
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-50 mt-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => {
                  setFullName(user.fullName);
                  setEmail(user.email);
                  setPhone(user.phone);
                  setAvatar(user.avatar);
                  setEditMode(false);
                }} className="text-slate-500 font-bold">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-bold">
                  <Save size={14} /> Save Profile
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
