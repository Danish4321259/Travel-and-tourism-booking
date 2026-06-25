import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import PropertyDetails from './pages/PropertyDetails';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import MyBookings from './pages/MyBookings';
import Wishlist from './pages/Wishlist';
import ReviewsPage from './pages/ReviewsPage';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

// Simple Protected Route wrapper to simulate secure segments
function Protect({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="property/:id" element={<PropertyDetails />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected Segment Simulation */}
            <Route
              path="booking-form"
              element={
                <Protect>
                  <BookingPage />
                </Protect>
              }
            />
            <Route
              path="booking-payment"
              element={
                <Protect>
                  <CheckoutPage />
                </Protect>
              }
            />
            <Route
              path="bookings"
              element={
                <Protect>
                  <MyBookings />
                </Protect>
              }
            />
            <Route
              path="wishlist"
              element={
                <Protect>
                  <Wishlist />
                </Protect>
              }
            />
            <Route
              path="profile"
              element={
                <Protect>
                  <UserProfile />
                </Protect>
              }
            />
            <Route
              path="admin"
              element={
                <Protect>
                  <AdminDashboard />
                </Protect>
              }
            />

            {/* Fallback routing back to safety */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
