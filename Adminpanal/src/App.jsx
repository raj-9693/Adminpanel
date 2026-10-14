import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import HomePageEditor from './pages/HomePageEditor';
import GalleryEditor from './pages/GalleryEditor';
import ServicesEditor from './pages/ServicesEditor';
import AboutEditor from './pages/AboutEditor';
import BookingEditor from './pages/BookingEditor';
import ContactEditor from './pages/ContactEditor';
import './styles/theme.css';

// ReviewsEditor alag lazy load — taaki isme error ho to baaki app nahi toote
const ReviewsEditor = lazy(() => import('./pages/ReviewsEditor'));

function ErrorFallback() {
  return (
    <div style={{ padding: '2rem', color: 'red' }}>
      <h2>ReviewsEditor load nahi hua.</h2>
      <p>Browser console mein error dekho (F12).</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings" element={<Bookings />} />

      {/* Website section routes */}
      <Route path="/website/home"     element={<HomePageEditor />} />
      <Route path="/website/gallery"  element={<GalleryEditor />} />
      <Route path="/website/services" element={<ServicesEditor />} />
      <Route path="/website/reviews"  element={
        <Suspense fallback={<div style={{padding:'2rem'}}>Loading...</div>}>
          <ReviewsEditor />
        </Suspense>
      } />
      <Route path="/website/about"    element={<AboutEditor />} />
      <Route path="/website/booking"  element={<BookingEditor />} />
      <Route path="/website/contact"  element={<ContactEditor />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
