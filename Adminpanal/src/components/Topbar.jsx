import { SearchIcon, BellIcon, ChevronDownIcon } from './Icons';
import { user } from '../data/dummyData';

export default function Topbar({ onMenu }) {
  return (
    <header className="topbar">
      <button type="button" className="menu-btn" onClick={onMenu} aria-label="Open menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      <label className="search">
        <SearchIcon />
        <input type="text" placeholder="Search brides, bookings, or enquiries" />
      </label>

      <div className="topbar__right">
        <button className="bell" aria-label="Notifications">
          <BellIcon />
          <span className="bell__dot" />
        </button>
        <div className="user">
          <div className="avatar">{user.initials}</div>
          <div>
            <div className="user__name">{user.name}</div>
            <div className="user__role">{user.role}</div>
          </div>
          <ChevronDownIcon />
        </div>
      </div>
    </header>
  );
}
