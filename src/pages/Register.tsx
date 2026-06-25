import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, Lock, CheckCircle } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function Register() {
  const navigate = useNavigate();
  const { setLoggedIn, updateUser } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: { [key: string]: string } = {};

    if (!fullName.trim()) tempErrors.fullName = 'Full Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Valid Email is required';
    if (!phone.trim()) tempErrors.phone = 'Phone number is required';
    if (password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Set logged-in context with customized mock user details
    updateUser({
      fullName,
      email,
      phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    });
    setLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-lg flex flex-col gap-6 bg-white border border-slate-100 p-8 rounded-3xl shadow-md">
        
        {/* Brand header */}
        <div className="text-center">
          <Link to="/" className="inline-flex w-10 h-10 bg-emerald-600 rounded-xl items-center justify-center text-white font-extrabold mb-3">
            Stay
          </Link>
          <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">Create Your Account</h2>
          <p className="text-xs text-slate-400 font-medium">Verify your email and unlock premium pricing filters instantly.</p>
        </div>

        {/* Inputs form */}
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
          <InputField
            label="Your Full Name"
            placeholder="e.g. Danish Phu"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            icon={<User size={16} />}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Email Address"
              type="email"
              placeholder="danish@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              icon={<Mail size={16} />}
              required
            />

            <InputField
              label="Phone Number"
              placeholder="+1 (555) 543-2101"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              icon={<Phone size={16} />}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              icon={<Lock size={16} />}
              required
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              icon={<Lock size={16} />}
              required
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-500 font-medium mt-1 select-none">
            <input type="checkbox" required className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 shrink-0 mt-0.5" />
            <span>I acknowledge and agree to the TravelStay standard Terms of Services, Privacy Policies, and Refund Rules.</span>
          </label>

          <Button type="submit" variant="primary" size="md" className="mt-2 font-black cursor-pointer">
            Create Free Account
          </Button>
        </form>

        <hr className="border-slate-50" />

        {/* Login redirect */}
        <div className="text-center text-xs font-medium text-slate-550">
          <span>Already registered of historical stays? </span>
          <Link to="/login" className="text-emerald-600 font-bold hover:text-emerald-700">
            Sign In Instantly
          </Link>
        </div>

      </div>
    </div>
  );
}
