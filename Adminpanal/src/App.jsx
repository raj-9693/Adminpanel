import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import './styles/theme.css';
import HomePageEditor from './pages/HomePageEditor';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/enquiries" element={<HomePageEditor />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
