import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { GridIcon, CalendarIcon, InboxIcon, UsersIcon, ChartIcon } from './Icons';
import { navItems, monthlyTarget } from '../data/dummyData';

const icons = { grid: GridIcon, calendar: CalendarIcon, inbox: InboxIcon, users: UsersIcon, chart: ChartIcon };

// Website group ke liye page icon
function PageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', marginLeft: 'auto' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

export default function Sidebar({ open = false, onClose }) {
  const location = useLocation();
  const isWebsiteActive = location.pathname.startsWith('/website');
  const [websiteOpen, setWebsiteOpen] = useState(isWebsiteActive);

  const topItems    = navItems.filter(i => !i.group && i.id !== 'bookings');
  const bookingItem = navItems.filter(i => !i.group && i.id === 'bookings');
  const websiteGroup = navItems.filter(i => i.group === 'website' && !i.isGroup);

  return (
    <aside className={'sidebar' + (open ? ' is-open' : '')} aria-label="Main menu">
      <div className="sidebar__top">
        <Logo />
        <button type="button" className="sidebar__close" onClick={onClose} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>
      <nav className="nav" onClick={(e) => { if (e.target.closest('a') && onClose) onClose(); }}>

        {/* Overview */}
        {topItems.map((item) => {
          const Icon = icons[item.icon];
          return item.path ? (
            <NavLink key={item.id} to={item.path}
              className={({ isActive }) => 'nav__item' + (isActive ? ' is-active' : '')}>
              <Icon /><span>{item.label}</span>
            </NavLink>
          ) : (
            <a key={item.id} href="#soon" className="nav__item">
              <Icon /><span>{item.label}</span>
            </a>
          );
        })}

        {/* Bookings */}
        {bookingItem.map((item) => {
          const Icon = icons[item.icon];
          return (
            <NavLink key={item.id} to={item.path}
              className={({ isActive }) => 'nav__item' + (isActive ? ' is-active' : '')}>
              <Icon />
              <span>{item.label}</span>
              {item.badge && <span className="nav__badge">{item.badge}</span>}
            </NavLink>
          );
        })}

        {/* Website Group - sabse neeche */}
        <button className="nav__item nav__group-header" onClick={() => setWebsiteOpen(o => isWebsiteActive ? true : !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
          <PageIcon />
          <span>Website</span>
          <ChevronIcon open={websiteOpen} />
        </button>

        {websiteOpen && (
          <div className="nav__group">
            {websiteGroup.map((item) => (
              <NavLink key={item.id} to={item.path}
                className={({ isActive }) => 'nav__sub-item' + (isActive ? ' is-active' : '')}>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}

      </nav>

      <div className="sidebar__target">
        <small>October target</small>
        <strong>
          {monthlyTarget.achieved} <span>of {monthlyTarget.goal}</span>
        </strong>
        <div className="progress">
          <div className="progress__bar" style={{ width: `${monthlyTarget.percent}%` }} />
        </div>
      </div>
    </aside>
  );
}
