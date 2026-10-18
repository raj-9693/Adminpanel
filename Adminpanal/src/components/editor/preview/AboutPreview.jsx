import { ArrowRight } from "lucide-react";
import { Pic, SiteNav, BottomPreview } from "./SiteChrome.jsx";

const pad = (n) => String(n).padStart(2, "0");

// Website ke About page ka live mock. d = about draft, bottom = shared CTA+footer.
export default function AboutPreview({ d, bottom, device }) {
  const { hero, story, numbers, process, artists, travel, kit } = d;

  return (
    <div className={`sp ${device === "mobile" ? "m" : ""}`}>
      <SiteNav active="About" />

      <section className="sp-ghero sp-ahero" data-sec="hero">
        <p className="sp-eb mid">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="sp-lead">{hero.text}</p>
      </section>

      <section className="sp-story" data-sec="story">
        <div className="sp-aarch">
          <Pic src={story.image} alt="" />
          {story.quote && <div className="sp-qcard">{story.quote}</div>}
        </div>
        <div className="sp-story-t">
          <p className="sp-eb">{story.eyebrow}</p>
          <h2>{story.title}</h2>
          <p className="sp-body">{story.p1}</p>
          <p className="sp-body">{story.p2}</p>
          <div className="sp-meta">
            {story.stats.map((s) => (
              <div key={s.id}><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </div>
          {story.button && <span className="sp-btn">{story.button} <ArrowRight size={15} /></span>}
        </div>
      </section>

      <section className="sp-numbers" data-sec="numbers">
        {numbers.items.map((n) => (
          <div key={n.id} data-sec={`num-${n.id}`}><b>{n.value}</b><span>{n.label}</span></div>
        ))}
      </section>

      <section className="sp-sec sp-center" data-sec="process">
        <p className="sp-eb mid">{process.eyebrow}</p>
        <h2>{process.title}</h2>
        <div className="sp-steps">
          {process.items.map((s, i) => (
            <article key={s.id} className="sp-step" data-sec={`step-${s.id}`}>
              <span className="sp-num">{pad(i + 1)}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sp-sec sp-artists" data-sec="artists">
        <div className="sp-sechead">
          <div>
            <p className="sp-eb">{artists.eyebrow}</p>
            <h2>{artists.title}</h2>
          </div>
          <p className="sp-aside">{artists.note}</p>
        </div>
        <div className="sp-agrid">
          {artists.items.map((a, i) => (
            <article key={a.id} className="sp-acard" data-sec={`artist-${a.id}`}>
              <div className="sp-acard-img">
                <Pic src={a.image} alt={a.name} i={i} />
                {a.years && <span className="sp-years">{a.years}</span>}
              </div>
              <div className="sp-acard-b">
                <p className="sp-acard-role">{a.role}</p>
                <h3>{a.name || "Artist name"}</h3>
                <p className="sp-acard-bio">{a.bio}</p>
                <div className="sp-tags">
                  {String(a.tags || "").split(",").map((t) => t.trim()).filter(Boolean).map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sp-band sp-travel">
        <div data-sec="travel">
          <p className="sp-eb">{travel.eyebrow}</p>
          <h2>{travel.title}</h2>
          <p className="sp-body">{travel.text}</p>
          <div className="sp-pills">
            {travel.cities.map((c) => <span key={c.id}>{c.label}</span>)}
          </div>
        </div>
        <div className="sp-kit" data-sec="kit">
          <p className="sp-eb">{kit.eyebrow}</p>
          <h3>{kit.title}</h3>
          <p className="sp-kit-text">{kit.text}</p>
          <div className="sp-brands">
            {kit.brands.map((b) => <span key={b.id}>{b.label}</span>)}
          </div>
          <small>{kit.note}</small>
        </div>
      </section>

      <BottomPreview d={bottom} />
    </div>
  );
}
