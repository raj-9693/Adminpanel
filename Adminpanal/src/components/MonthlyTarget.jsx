import { monthlyTarget as t } from '../data/dummyData';

export default function MonthlyTarget() {
  const r = 56;
  const c = 2 * Math.PI * r;
  return (
    <section className="card">
      <div className="card__head">
        <div>
          <h3 className="card__title">Monthly target</h3>
          <p className="card__sub">October revenue</p>
        </div>
      </div>

      <div className="target">
        <div className="ring">
          <svg width="132" height="132" viewBox="0 0 132 132">
            <circle cx="66" cy="66" r={r} fill="none" stroke="#f3e4d9" strokeWidth="12" />
            <circle
              cx="66" cy="66" r={r} fill="none" stroke="#a8732a" strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - t.percent / 100)}
            />
          </svg>
          <div className="ring__label">{t.percent}%</div>
        </div>
        <div>
          <div className="target__value">{t.achieved}</div>
          <div className="target__goal">of {t.goal} goal</div>
          <div className="target__left">{t.remaining} to go</div>
        </div>
      </div>
    </section>
  );
}
