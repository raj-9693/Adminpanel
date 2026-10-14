import { ArrowRight, ChevronRight, Quote } from "lucide-react";
import { ICONS } from "../icons.js";
import { Pic, SiteNav, BottomPreview } from "./SiteChrome.jsx";

// Website ke Home page ka live mock. d = home draft, bottom = shared CTA+footer draft.
// data-sec = LivePreview isi se "jis section ko edit kar rahe ho" wahan scroll + highlight karta hai.
export default function HomePreview({ d, bottom, device }) {
  const { hero, stats, basics, glimpse, reviews, promises } = d;

  return (
    <div className={`sp ${device === "mobile" ? "m" : ""}`}>
      <SiteNav active="Home" />

      {/* HERO (+ stats) */}
      <section className="sp-hero" data-sec="hero">
        <div className="sp-hero-t">
          <p className="sp-eb line">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="sp-sub">{hero.subtitle}</p>
          <div className="sp-ctas">
            {hero.primaryCta && <span className="sp-btn">{hero.primaryCta} <ArrowRight size={15} /></span>}
            {hero.secondaryCta && <span className="sp-btn ghost">{hero.secondaryCta}</span>}
          </div>
          <div className="sp-stats" data-sec="stats">
            {stats.items.map((s) => (
              <div key={s.id} className="sp-stat"><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>
        <div className="sp-arch">
          <Pic src={hero.image} alt="" />
          {hero.badge && <span className="sp-badge"><i />{hero.badge}</span>}
        </div>
      </section>

      {/* SAANJH BASICS */}
      <section className="sp-band" data-sec="basics">
        <div className="sp-sechead">
          <div>
            <p className="sp-eb">{basics.eyebrow}</p>
            <h2>{basics.title}</h2>
          </div>
          {basics.linkText && <span className="sp-link">{basics.linkText} <ChevronRight size={14} /></span>}
        </div>
        <div className="sp-cards4">
          {basics.items.map((it) => {
            const I = ICONS[it.icon] || ICONS.sparkles;
            return (
              <article key={it.id} className="sp-card" data-sec={`basic-${it.id}`}>
                <span className="sp-ic"><I size={18} strokeWidth={1.6} /></span>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
                <span className="sp-price">{it.price} <ChevronRight size={12} /></span>
              </article>
            );
          })}
        </div>
      </section>

      {/* REAL RADIANCE */}
      <section className="sp-sec sp-center" data-sec="glimpse">
        <p className="sp-eb mid">{glimpse.eyebrow}</p>
        <h2>{glimpse.title}</h2>
        <div className="sp-trio">
          {glimpse.items.map((g, i) => (
            <figure key={g.id} data-sec={`glimpse-${g.id}`}>
              <Pic src={g.image} alt={g.name} i={i} />
              <figcaption><b>{g.name}</b>{g.caption && <span> · {g.caption}</span>}</figcaption>
            </figure>
          ))}
        </div>
        {glimpse.buttonText && <span className="sp-btn ghost">{glimpse.buttonText}</span>}
      </section>

      {/* LOVE NOTES */}
      <section className="sp-dark" data-sec="reviews">
        <div className="sp-sechead">
          <div>
            <p className="sp-eb">{reviews.eyebrow}</p>
            <h2>{reviews.title}</h2>
          </div>
          <span className="sp-count">{reviews.items.length} featured {reviews.items.length === 1 ? "note" : "notes"}</span>
        </div>
        <div className="sp-notes">
          {reviews.items.map((r) => (
            <article key={r.id} className="sp-note" data-sec={`review-${r.id}`}>
              <Quote size={20} strokeWidth={1.5} />
              <p className="sp-q">{r.quote}</p>
              <div className="sp-by"><b>{r.name}</b><small>{r.meta}</small></div>
            </article>
          ))}
        </div>
      </section>

      {/* PROMISES STRIP */}
      <section className="sp-sec tight" data-sec="promises">
        <div className="sp-panel">
          {promises.items.map((p) => {
            const I = ICONS[p.icon] || ICONS.sparkles;
            return (
              <div key={p.id} data-sec={`promise-${p.id}`}>
                <span className="sp-ic"><I size={18} strokeWidth={1.6} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SHARED CTA + FOOTER */}
      <BottomPreview d={bottom} />
    </div>
  );
}
