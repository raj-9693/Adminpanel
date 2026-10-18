import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import '../styles/dashboard.css';
import '../styles/responsive.css';

// Mobile par sidebar ek drawer ban jaata hai (hamburger se khulta hai).
export default function Layout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setNavOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle('nav-lock', navOpen);
    const onKey = (e) => { if (e.key === 'Escape') setNavOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('nav-lock'); window.removeEventListener('keydown', onKey); };
  }, [navOpen]);

  return (
    <div className="app">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />}
      <div className="main">
        <Topbar onMenu={() => setNavOpen(true)} />
        {children}
      </div>
    </div>
  );
}
