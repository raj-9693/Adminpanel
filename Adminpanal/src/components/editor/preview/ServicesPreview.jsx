import { useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { Pic, SiteNav, BottomPreview } from "./SiteChrome.jsx";

const lines = (t) => String(t || "").split("\n").map((x) => x.trim()).filter(Boolean);

// Website ke Services page ka live mock. d = services draft, bottom = shared CTA+footer.
export default function ServicesPreview({ d, bottom, device }) {
  const { hero, packages, compare, faq } = d;
  const pk = packages.items;
  const [openQ, setOpenQ] = useState(faq.items[0]?.id);

  return (
    <div className={`sp ${device === "mobile" ? "m" : ""}`}>
      <SiteNav active="Services" />

      <section className="sp-ghero" data-sec="hero">
        <p className="sp-eb mid">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="sp-lead">{hero.text}</p>
        <div className="sp-orn"><span>❧</span></div>
      </section>

      <section className="sp-pkgs-wrap" data-sec="packages">
        <div className="sp-pkgs">
          {pk.map((x, i) => (
            <article key={x.id} className={`sp-pkg ${x.popular ? "pop" : ""}`} data-sec={`pkg-${x.id}`}>
              <div className="sp-pkg-img">
                <Pic src={x.image} alt={x.title} i={i} />
                {x.popular && packages.badge && <span className="sp-flag">{packages.badge}</span>}
              </div>
              <div className="sp-pkg-b">
                <p className="sp-pkg-eb">{x.eyebrow}</p>
                <h3>{x.title || "Untitled"}</h3>
                <p className="sp-price2"><b>{x.price}</b> <small>{x.priceNote}</small></p>
                <ul>{lines(x.features).map((f) => <li key={f}><Check size={13} /> {f}</li>)}</ul>
                {x.button && <span className={`sp-btn ${x.popular ? "" : "ghost"} block`}>{x.button}</span>}
              </div>
            </article>
          ))}
        </div>
        {packages.note && <p className="sp-fine">{packages.note}</p>}
      </section>

      <section className="sp-band" data-sec="compare">
        <div className="sp-sechead">
          <div>
            <p className="sp-eb">{compare.eyebrow}</p>
            <h2>{compare.title}</h2>
          </div>
          <p className="sp-aside">{compare.note}</p>
        </div>
        <div className="sp-tablewrap">
          <table className="sp-table">
            <thead>
              <tr>
                <th>{compare.tableLabel}</th>
                {pk.map((x) => <th key={x.id} className={x.popular ? "pop" : ""}>{x.title}</th>)}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((r) => (
                <tr key={r.id} data-sec={`row-${r.id}`}>
                  <td>{r.label}</td>
                  {pk.map((x) => (
                    <td key={x.id} className={x.popular ? "pop" : ""}>
                      {r.inc?.[x.id] ? <span className="sp-tick"><Check size={11} strokeWidth={2.4} /></span> : <span className="sp-dash">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="sum">
                <td>{compare.priceRowLabel}</td>
                {pk.map((x) => <td key={x.id} className={x.popular ? "pop" : ""}>{x.price}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="sp-faq" data-sec="faq">
        <div>
          <p className="sp-eb">{faq.eyebrow}</p>
          <h2>{faq.title}</h2>
          <p className="sp-body">{faq.text}</p>
          {faq.button && <span className="sp-btn ghost">{faq.button} <ArrowRight size={15} /></span>}
        </div>
        <div className="sp-faqbox">
          {faq.items.map((f) => {
            const on = f.id === openQ;
            return (
              <div key={f.id} className={`sp-q2 ${on ? "on" : ""}`} data-sec={`faq-${f.id}`}>
                <button type="button" onClick={() => setOpenQ(on ? null : f.id)}>
                  <span>{f.q || "Untitled question"}</span>
                  {on ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {on && <p>{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <BottomPreview d={bottom} />
    </div>
  );
}
