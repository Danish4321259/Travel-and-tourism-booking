import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const { setLoggedIn, updateUser } = useApp();

  const [email, setEmail] = useState('danishphu4321@gmail.com');
  const [password, setPassword] = useState('********');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide correct email and password configurations.');
      return;
    }

    setLoggedIn(true);
    // Simulating updates to default user matching this login name
    updateUser({ email });
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md flex flex-col gap-6 bg-white border border-slate-100 p-8 rounded-3xl shadow-md">
        
        {/* Brand header */}
        <div className="text-center">
          <Link to="/" className="inline-flex w-10 h-10 bg-emerald-600 rounded-xl items-center justify-center text-white font-extrabold mb-3">
            Stay
          </Link>
          <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">Welcome Back</h2>
          <p className="text-xs text-slate-400 font-medium">Log back into your TravelStay premium account.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-550 font-medium font-semibold text-center">
            {error}
          </div>
        )}

        {/* Inputs form */}
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <InputField
            label="Your Account Email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={16} />}
            required
          />

          <InputField
            label="Secure Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={16} />}
            required
          />

          {/* Remember me & forgot password */}
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-650 font-bold select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="font-bold text-emerald-600 hover:text-emerald-700">Forgot Password?</a>
          </div>

          <Button type="submit" variant="primary" size="md" className="mt-2 font-bold cursor-pointer">
            Sign In Account
          </Button>
        </form>

        <hr className="border-slate-50" />

        {/* Registration redirect */}
        <div className="text-center text-xs font-medium text-slate-500">
          <span>Don't own an account yet? </span>
          <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center justify-center gap-1 mt-1">
            Register for Free <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </div>
  );
}
