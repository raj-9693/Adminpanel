import { Link } from 'react-router-dom';
import { pipeline } from '../data/dummyData';

export default function BookingPipeline() {
  return (
    <section className="card">
      <div className="card__head">
        <div>
          <h3 className="card__title">Booking pipeline</h3>
          <p className="card__sub">This month’s confirmation flow</p>
        </div>
        <Link to="/bookings" className="link">View bookings</Link>
      </div>

      <div className="pipeline__bar">
        {pipeline.map((p) => (
          <div key={p.id} style={{ flex: p.weight, background: p.color }} />
        ))}
      </div>

      <div className="pipeline__labels">
        {pipeline.map((p) => (
          <div key={p.id}>
            <b>{p.label}</b>
            <span>{p.count} bookings</span>
          </div>
        ))}
      </div>
    </section>
  );
}
