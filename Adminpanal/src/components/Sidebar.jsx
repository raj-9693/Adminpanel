import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { GridIcon, CalendarIcon, InboxIcon, UsersIcon, ChartIcon } from './Icons';
import { navItems, monthlyTarget } from '../data/dummyData';

const icons = { grid: GridIcon, calendar: CalendarIcon, inbox: InboxIcon, users: UsersIcon, chart: ChartIcon };

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Logo />
      <nav className="nav">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          const inner = (
            <>
              <Icon />
              <span>{item.label}</span>
              <span className="nav__badge" style={{ display: item.badge ? 'grid' : 'none' }}>{item.badge}</span>
            </>
          );
          // jinke pages abhi nahi bane (path null) wo normal link rahenge
          return item.path ? (
            <NavLink
              key={item.id} to={item.path}
              className={({ isActive }) => 'nav__item' + (isActive ? ' is-active' : '')}
            >
              {inner}
            </NavLink>
          ) : (
            <a key={item.id} href="#soon" className="nav__item">{inner}</a>
          );
        })}
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
