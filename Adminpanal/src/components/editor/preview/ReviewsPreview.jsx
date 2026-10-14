import { Fragment } from "react";
import { Star, Quote } from "lucide-react";
import { ICONS } from "../icons.js";
import { sumCounts, autoAverage } from "../../../editor/rating.js";

const Stars = ({ n = 5, size = 14 }) => (
  <span className="pv-stars">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={size} strokeWidth={1.5} style={{ opacity: i < n ? 1 : 0.28 }} />)}
  </span>
);

// Website ke Reviews page ka draft-based mock. d = editor ka draft.
export default function ReviewsPreview({ d, device }) {
  const s = d.summary;
  const sum = sumCounts(s.distribution) || 1;
  const avg = s.auto ? autoAverage(s.distribution) : Number(s.average) || 0;
  const tests = d.testimonials.filter((t) => t.published);
  const msgs = d.messages.filter((m) => m.published).slice(0, 6);

  const sections = {
    hero: (
      <section className="pv-hero">
        <p className="pv-eb">{d.hero.eyebrow}</p>
        <h1>{d.hero.title}</h1>
        <p className="pv-lead">{d.hero.intro}</p>
        <div className="pv-orn"><span>❧</span></div>
      </section>
    ),
    summary: (
      <section className="pv-band">
        <div className="pv-rate">
          <div className="pv-rate-l">
            <Stars n={5} size={20} />
            <div className="pv-num">{avg.toFixed(1)}</div>
            <b>Loved by {s.total || 0}+ brides</b>
            <p>{s.text}</p>
          </div>
          <div className="pv-rate-r">
            {[5, 4, 3, 2, 1].map((n) => (
              <div key={n} className="pv-bar">
                <span>{n}</span>
                <span className="pv-track"><span style={{ width: `${((Number(s.distribution[n]) || 0) / sum) * 100}%` }} /></span>
                <span>{Number(s.distribution[n]) || 0}</span>
              </div>
            ))}
            <small>{s.note}</small>
          </div>
        </div>
      </section>
    ),
    testimonials: (
      <section className="pv-sec">
        <div className="pv-head">
          <div>
            <p className="pv-eb">{d.testimonialsSection.eyebrow}</p>
            <h2>{d.testimonialsSection.title}</h2>
          </div>
          <p className="pv-note">{d.testimonialsSection.note}</p>
        </div>
        <div className="pv-tcards">
          {tests.map((t, i) => {
            const photo = Boolean(t.image);
            const tint = !photo && i % 2 === 1;
            return (
              <article key={t.id} className={`pv-tcard ${photo ? "photo" : ""} ${tint ? "tint" : ""}`}>
                {photo && <img src={t.image} alt="" />}
                <div className="pv-tbody">
                  {!photo && <span className="pv-qm">“</span>}
                  <Stars n={t.rating} size={13} />
                  <p className="pv-q">{photo ? `“${t.quote}”` : t.quote}</p>
                  <div className="pv-by"><b>{t.name}</b><small>{t.meta}</small></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    ),
    messages: (
      <section className="pv-band proof">
        <div className="pv-center">
          <p className="pv-eb dark">{d.messagesSection.eyebrow}</p>
          <h2>{d.messagesSection.title}</h2>
          <p className="pv-lead">{d.messagesSection.text}</p>
        </div>
        <div className="pv-chats">
          {msgs.map((m) => (
            <article key={m.id} className="pv-chat">
              <header><span className="pv-av"><Quote size={11} /></span><div><b>{m.name}</b><small>online</small></div></header>
              <div className="pv-bubble">{m.text}</div>
              <time>{m.time} ✓✓</time>
            </article>
          ))}
        </div>
      </section>
    ),
    values: (
      <section className="pv-sec tight">
        <div className="pv-values">
          {d.values.map((v) => {
            const I = ICONS[v.icon] || ICONS.sparkles;
            return (
              <div key={v.id}>
                <span className="pv-ic"><I size={18} strokeWidth={1.6} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    ),
    cta: (
      <section className="pv-sec">
        <div className={`pv-cta ${d.cta.tone === "dark" ? "dark" : ""}`}>
          <p className="pv-eb">{d.cta.eyebrow}</p>
          <h2>{d.cta.title}</h2>
          <p>{d.cta.text}</p>
          <span className="pv-btn">{d.cta.button} →</span>
        </div>
      </section>
    ),
  };

  return (
    <div className={`pv ${device === "mobile" ? "m" : ""}`}>
      <nav className="pv-nav">
        <span className="pv-logo"><i>स</i>Saanjh</span>
        <span className="pv-links">
          {["Home", "Gallery", "Services", "Reviews", "About", "Booking", "Contact"].map((l) => (
            <em key={l} className={l === "Reviews" ? "on" : ""}>{l}</em>
          ))}
        </span>
        <span className="pv-btn sm">Book now</span>
      </nav>
      {d.sectionOrder.map((id) => <Fragment key={id}>{sections[id]}</Fragment>)}
    </div>
  );
}
