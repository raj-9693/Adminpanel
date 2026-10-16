import { Check, Quote, Star } from "lucide-react";
import { ICONS } from "../icons.js";
import { Pic, SiteNav, BottomPreview } from "./SiteChrome.jsx";
import { sumCounts, autoAverage } from "../../../editor/rating.js";

const Stars = ({ n = 5, size = 15 }) => (
  <span className="sp-stars" aria-label={`${n} stars`}>
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={size} strokeWidth={1.5} fill={i <= n ? "currentColor" : "none"} />)}
  </span>
);

// Website ke Reviews page ka live mock. d = reviews draft, bottom = shared CTA+footer.
export default function ReviewsPagePreview({ d, bottom, device }) {
  const { hero, summary: s, testimonialsSection: ts, messagesSection: ms, values } = d;
  const total = sumCounts(s.distribution);
  const avg = s.auto ? autoAverage(s.distribution) : Number(s.average) || 0;
  const tests = d.testimonials.filter((t) => t.published).sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 6);
  const msgs = d.messages.filter((m) => m.published).slice(0, 6);

  return (
    <div className={`sp ${device === "mobile" ? "m" : ""}`}>
      <SiteNav active="Reviews" />

      <section className="sp-ghero" data-sec="hero">
        <p className="sp-eb mid">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="sp-lead">{hero.intro}</p>
        <div className="sp-orn short"><span>❧</span></div>
      </section>

      <section className="sp-band sp-rating" data-sec="summary">
        <div className="sp-rate-l">
          <Stars n={Math.round(avg)} size={20} />
          <b className="sp-avg">{avg.toFixed(1)}</b>
          <p className="sp-loved">Loved by {Number(s.total) || 0}+ Saanjh brides</p>
          <p className="sp-small">{s.text}</p>
        </div>
        <div className="sp-rate-r">
          {[5, 4, 3, 2, 1].map((n) => {
            const c = Number(s.distribution[n]) || 0;
            return (
              <div key={n} className="sp-bar">
                <span>{n}</span>
                <i><u style={{ width: `${total ? (c / total) * 100 : 0}%` }} /></i>
                <em>{c}</em>
              </div>
            );
          })}
          <p className="sp-small">{s.note}</p>
        </div>
      </section>

      <section className="sp-sec" data-sec="testimonials">
        <div className="sp-sechead">
          <div>
            <p className="sp-eb">{ts.eyebrow}</p>
            <h2>{ts.title}</h2>
          </div>
          <p className="sp-aside">{ts.note}</p>
        </div>
        <div className="sp-tgrid">
          {tests.map((t, i) => (
            <article key={t.id} className={`sp-tcard ${t.image ? "photo" : i % 2 ? "tint" : ""}`} data-sec={`t-${t.id}`}>
              {t.image && <div className="sp-tcard-img"><Pic src={t.image} alt={t.name} i={i} /></div>}
              <div className="sp-tcard-b">
                {!t.image && <Quote size={18} className="sp-qm" />}
                <Stars n={t.rating} size={14} />
                <p className="sp-tq">{t.image ? `“${t.quote}”` : t.quote}</p>
                <div className="sp-by"><b>{t.name}</b><small>{t.meta}</small></div>
              </div>
            </article>
          ))}
          {!tests.length && <p className="sp-empty">No published testimonials yet.</p>}
        </div>
      </section>

      <section className="sp-band sp-center" data-sec="messages">
        <p className="sp-eb mid dark">{ms.eyebrow}</p>
        <h2>{ms.title}</h2>
        <p className="sp-lead">{ms.text}</p>
        <div className="sp-chats">
          {msgs.map((m) => (
            <article key={m.id} className="sp-chat" data-sec={`m-${m.id}`}>
              <header>
                <span className="sp-av"><Quote size={13} /></span>
                <div><b>{m.name}</b><small>online</small></div>
              </header>
              <p className="sp-bubble">{m.text}</p>
              <time>{m.time} <Check size={11} /><Check size={11} className="b" /></time>
            </article>
          ))}
        </div>
      </section>

      <section className="sp-sec tight" data-sec="values">
        <div className="sp-panel flat">
          {values.map((v) => {
            const I = ICONS[v.icon] || ICONS.sparkles;
            return (
              <div key={v.id} data-sec={`val-${v.id}`}>
                <span className="sp-ic"><I size={18} strokeWidth={1.6} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <BottomPreview d={bottom} />
    </div>
  );
}
