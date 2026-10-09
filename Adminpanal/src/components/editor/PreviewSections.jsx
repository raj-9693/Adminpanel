import { ImageIcon } from './EditorIcons';

function StatsRow({ items }) {
  return (
    <div className="pv-statsrow">
      {items.map((s, i) => (
        <div key={i}>
          <div className="pv-statsrow__value">{s.value}</div>
          <div className="pv-statsrow__label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function HeroPreview({ data, stats }) {
  return (
    <section className="pv-hero">
      <div className="pv-hero__grid">
        <div className="pv-hero__text">
          <p className="pv-eyebrow">{data.eyebrow}</p>
          <h2 className="pv-hero__title">{data.headline}</h2>
          <p className="pv-hero__sub">{data.subtext}</p>
          <button className="pv-cta">{data.cta}</button>
        </div>

        <div
          className="pv-hero__image"
          style={data.image.url ? { backgroundImage: `url("${data.image.url}")` } : undefined}
        >
          <div className="pv-hero__card">
            <b>{data.cardTitle}</b>
            <span>{data.cardText}</span>
          </div>
        </div>
      </div>
      <StatsRow items={stats.items} />
    </section>
  );
}

export function StatsPreview({ data }) {
  return (
    <section className="pv-section pv-stats">
      {data.items.map((s, i) => (
        <div className="pv-stats__card" key={i}>
          <div className="pv-stats__value">{s.value}</div>
          <div className="pv-stats__label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}

export function ServicesPreview({ data }) {
  return (
    <section className="pv-section">
      <h3 className="pv-heading">{data.heading}</h3>
      <div className="pv-cards">
        {data.items.map((it, i) => (
          <article className="pv-card" key={i}>
            <h4>{it.title}</h4>
            <p>{it.desc}</p>
            <span className="pv-card__price">{it.price}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GalleryPreview({ data }) {
  const tiles = data.images.length ? data.images : [null, null, null, null, null, null];
  return (
    <section className="pv-section">
      <h3 className="pv-heading">{data.heading}</h3>
      <div className="pv-gallery">
        {tiles.map((im, i) =>
          im ? (
            <img key={im.id} src={im.url} alt={im.name} />
          ) : (
            <div className="pv-gallery__empty" key={i}><ImageIcon /></div>
          )
        )}
      </div>
    </section>
  );
}

export function ReviewsPreview({ data }) {
  return (
    <section className="pv-section">
      <h3 className="pv-heading">{data.heading}</h3>
      <div className="pv-cards">
        {data.items.map((it, i) => (
          <article className="pv-card" key={i}>
            <div className="pv-stars">{'★'.repeat(it.rating)}</div>
            <p className="pv-quote">“{it.quote}”</p>
            <span className="pv-card__name">{it.name}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ValuesPreview({ data }) {
  return (
    <section className="pv-section">
      <h3 className="pv-heading">{data.heading}</h3>
      <div className="pv-values">
        {data.items.map((it, i) => (
          <div key={i}>
            <i className="pv-values__dot" />
            <h4>{it.title}</h4>
            <p>{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
