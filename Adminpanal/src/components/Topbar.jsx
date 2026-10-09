import { SearchIcon, BellIcon, ChevronDownIcon } from './Icons';
import { user } from '../data/dummyData';

export default function Topbar() {
  return (
    <header className="topbar">
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
