import { useState } from 'react';
import Layout from '../components/Layout';
import {
  SearchIcon, PlusIcon, DownloadIcon, LayersIcon, CalendarIcon, FilterIcon,
  ListIcon, DotsIcon, ChatIcon, ChevronDownIcon,
} from '../components/Icons';
import { bookingsPage as page, bookingTabs, bookingRows, pagination } from '../data/dummyData';
import '../styles/bookings.css';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('all');
  const [view, setView] = useState('table');
  const [activePage, setActivePage] = useState(pagination.current);

  return (
    <Layout>
      <main className="content">
        {/* Hero / heading */}
        <div className="page-head page-head--end">
          <div>
            <p className="page-head__date">{page.eyebrow}</p>
            <h1 className="page-head__title">{page.title}</h1>
            <p className="page-head__sub">{page.subtitle}</p>
          </div>
          <div className="page-head__actions">
            <button className="btn-outline"><DownloadIcon /> Export CSV</button>
            <button className="btn-add"><PlusIcon width="18" height="18" /> Add booking</button>
          </div>
        </div>

        {/* Filters */}
        <section className="card filters">
          <div className="filters__row">
            <label className="search search--wide">
              <SearchIcon />
              <input type="text" placeholder="Search by bride, reference, venue or phone" />
            </label>
            <button className="select-btn"><LayersIcon /> All services <ChevronDownIcon width="16" height="16" /></button>
            <button className="select-btn"><CalendarIcon /> Wedding date <ChevronDownIcon width="16" height="16" /></button>
            <button className="icon-btn" aria-label="More filters"><FilterIcon /></button>
          </div>

          <div className="filters__row filters__row--tabs">
            <div className="tabs">
              {bookingTabs.map((t) => (
                <button
                  key={t.id}
                  className={'tab' + (activeTab === t.id ? ' is-active' : '')}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label} <span className="tab__count">{t.count}</span>
                </button>
              ))}
            </div>

            <div className="segmented">
              <button className={'segmented__btn' + (view === 'table' ? ' is-active' : '')} onClick={() => setView('table')}>
                <ListIcon /> Table
              </button>
              <button className={'segmented__btn' + (view === 'kanban' ? ' is-active' : '')} onClick={() => setView('kanban')}>
                <LayersIcon /> Kanban
              </button>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="card table-card">
          <div className="table-toolbar">
            <label className="check-label">
              <input type="checkbox" className="check" /> <b>Select all</b>
            </label>
            <span className="table-toolbar__count">{page.total} bookings</span>
            <button className="select-btn select-btn--sm">Bulk actions <ChevronDownIcon width="16" height="16" /></button>
          </div>

          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th className="col-check"><input type="checkbox" className="check" aria-label="Select all rows" /></th>
                  <th>Reference</th>
                  <th>Bride</th>
                  <th>Service</th>
                  <th>Wedding date</th>
                  <th>Venue</th>
                  <th>Phone</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bookingRows.map((r) => (
                  <tr key={r.id}>
                    <td className="col-check"><input type="checkbox" className="check" aria-label={`Select ${r.bride}`} /></td>
                    <td data-label="Reference"><span className="ref">{r.ref}</span></td>
                    <td data-label="Bride">
                      <div className="cell-strong">{r.bride}</div>
                      <div className="cell-muted">{r.type}</div>
                    </td>
                    <td data-label="Service">{r.service}</td>
                    <td data-label="Wedding date">
                      <div className="cell-strong">{r.date}</div>
                      <div className="cell-muted">{r.day}</div>
                    </td>
                    <td className="cell-soft" data-label="Venue">{r.venue}</td>
                    <td data-label="Phone">
                      <a href="#chat" className="phone"><ChatIcon /> <span>{r.phone}</span></a>
                    </td>
                    <td className="cell-soft" data-label="Created">{r.created}</td>
                    <td data-label="Status">
                      <button className={`pill pill--${r.tone}`}>
                        {r.status} <ChevronDownIcon width="14" height="14" />
                      </button>
                    </td>
                    <td className="col-actions">
                      <button className="dots-btn" aria-label="Row actions"><DotsIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pager">
            <p className="pager__info">Showing <b>{page.showing}</b> of {page.total} bookings</p>
            <div className="pager__btns">
              <button className="pager__btn pager__btn--wide">Previous</button>
              {pagination.pages.map((n) => (
                <button
                  key={n}
                  className={'pager__btn pager__num' + (activePage === n ? ' is-active' : '')}
                  onClick={() => setActivePage(n)}
                >
                  {n}
                </button>
              ))}
              <button className="pager__btn pager__btn--wide">Next</button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
