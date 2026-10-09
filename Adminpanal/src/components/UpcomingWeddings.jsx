import { upcomingWeddings } from '../data/dummyData';

export default function UpcomingWeddings() {
  return (
    <section className="card">
      <div className="card__head">
        <div>
          <h3 className="card__title">Upcoming weddings</h3>
          <p className="card__sub">Next 30 days</p>
        </div>
        <a href="#calendar" className="link">Calendar</a>
      </div>

      <div className="list">
        {upcomingWeddings.map((w) => (
          <div className="wedding" key={w.id}>
            <div className="date-box">
              <b>{w.day}</b>
              <span>{w.month}</span>
            </div>
            <div>
              <div className="list__name">{w.name}</div>
              <div className="list__meta">{w.meta}</div>
              <span className={`status status--${w.tone}`}>{w.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
