import { needsAction } from '../data/dummyData';

export default function NeedsAction() {
  return (
    <section className="card">
      <div className="card__head">
        <div>
          <h3 className="card__title">Needs action</h3>
          <p className="card__sub">Pending for more than 24 hours</p>
        </div>
        <span className="chip chip--strong">6 urgent</span>
      </div>

      <div className="list">
        {needsAction.map((n) => (
          <div className="list__item" key={n.id}>
            <div>
              <div className="list__name">{n.name}</div>
              <div className="list__meta">{n.meta}</div>
            </div>
            <button className="link">Follow up</button>
          </div>
        ))}
      </div>
    </section>
  );
}
