import { servicesBooked } from '../data/dummyData';

export default function ServicesDonut() {
  const r = 40;
  const c = 2 * Math.PI * r;
  const total = servicesBooked.reduce((s, x) => s + x.value, 0);
  let offset = 0;

  return (
    <section className="card">
      <div className="card__head">
        <div>
          <h3 className="card__title">Services booked</h3>
          <p className="card__sub">October mix</p>
        </div>
      </div>

      <div className="donut-wrap">
        <svg width="190" height="190" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          {servicesBooked.map((s) => {
            const len = (s.value / total) * c;
            const el = (
              <circle
                key={s.id} cx="50" cy="50" r={r} fill="none"
                stroke={s.color} strokeWidth="14"
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="legend">
          {servicesBooked.map((s) => (
            <span key={s.id}><i style={{ background: s.color }} />{s.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
