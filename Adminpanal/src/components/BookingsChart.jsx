import { bookingsByMonth } from '../data/dummyData';

export default function BookingsChart() {
  const W = 760, H = 330;
  const left = 46, right = 10, top = 12, bottom = 36;
  const plotW = W - left - right;
  const plotH = H - top - bottom;
  const max = 80;
  const ticks = [0, 20, 40, 60, 80];
  const slot = plotW / bookingsByMonth.length;
  const barW = slot * 0.72;

  return (
    <section className="card">
      <div className="card__head">
        <div>
          <h3 className="card__title">Bookings by month</h3>
          <p className="card__sub">Confirmed wedding bookings</p>
        </div>
        <span className="chip">May – Oct</span>
      </div>

      <svg className="bars" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bookings by month">
        {ticks.map((tk) => {
          const y = top + plotH - (tk / max) * plotH;
          return (
            <g key={tk}>
              <line x1={left} x2={W - right} y1={y} y2={y} stroke="#eadccf" strokeWidth="1" />
              <text x={left - 12} y={y + 4} textAnchor="end" fontSize="13" fill="#7a6462">{tk}</text>
            </g>
          );
        })}
        {bookingsByMonth.map((b, i) => {
          const h = (b.value / max) * plotH;
          const x = left + slot * i + (slot - barW) / 2;
          return (
            <g key={b.month}>
              <rect x={x} y={top + plotH - h} width={barW} height={h} rx="6" fill="#7b3442" />
              <text x={x + barW / 2} y={H - 8} textAnchor="middle" fontSize="13" fill="#7a6462">{b.month}</text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}
