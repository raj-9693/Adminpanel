import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Pic, SiteNav, BottomPreview } from "./SiteChrome.jsx";

const pad = (n) => String(n).padStart(2, "0");

/* "In focus" panel: arrows se looks badal sakte ho (sirf preview me). Description live edit hoti hai. */
function FocusPanel({ list, startId, focus, catLabel }) {
  const start = Math.max(0, list.findIndex((x) => x.id === startId));
  const [idx, setIdx] = useState(start);
  const i = Math.min(idx, list.length - 1);
  const it = list[i];
  const go = (n) => setIdx((i + n + list.length) % list.length);

  return (
    <div className="sp-focus">
      <div className="sp-focus-img">
        <Pic src={it.image} alt={it.title} i={i} />
        {list.length > 1 && (
          <>
            <button type="button" className="sp-arrow l" onClick={() => go(-1)} aria-label="Previous look"><ChevronLeft size={18} /></button>
            <button type="button" className="sp-arrow r" onClick={() => go(1)} aria-label="Next look"><ChevronRight size={18} /></button>
          </>
        )}
      </div>
      <div className="sp-focus-t">
        <p className="sp-eb">Look {pad(i + 1)} of {pad(list.length)} · {catLabel(it.category)}</p>
        <h3>{it.title}</h3>
        <p className="sp-desc">{it.description}</p>
        {it.details && (
          <div className="sp-edit"><small>{focus.detailsLabel}</small><b>{it.details}</b></div>
        )}
        {focus.buttonText && <span className="sp-btn">{focus.buttonText} <ArrowRight size={15} /></span>}
      </div>
    </div>
  );
}

// Website ke Gallery page ka live mock.
export default function GalleryPreview({ d, bottom, device }) {
  const { intro, filters, items, focus } = d;
  const [cat, setCat] = useState("all");
  const live = items.filter((x) => x.published);
  const cats = filters.categories;
  const current = cats.some((c) => c.id === cat) ? cat : "all";
  const shown = current === "all" ? live : live.filter((x) => x.category === current);
  const catLabel = (id) => cats.find((c) => c.id === id)?.label || "";
  const startId = live.some((x) => x.id === focus.itemId) ? focus.itemId : live[0]?.id;

  return (
    <div className={`sp ${device === "mobile" ? "m" : ""}`}>
      <SiteNav active="Gallery" />

      <section className="sp-ghero" data-sec="intro">
        <p className="sp-eb mid">{intro.eyebrow}</p>
        <h1>{intro.title}</h1>
        <p className="sp-lead">{intro.text}</p>
      </section>

      <div className="sp-chips" data-sec="filters">
        {[{ id: "all", label: filters.allLabel }, ...cats].map((c) => (
          <button key={c.id} type="button" className={`sp-chip ${current === c.id ? "on" : ""}`} onClick={() => setCat(c.id)}>
            {c.label || "Untitled"}
          </button>
        ))}
      </div>
      <div className="sp-orn"><span>❧</span></div>

      <section className="sp-grid" data-sec="items">
        {shown.map((it, i) => (
          <figure key={it.id} className="sp-tile" data-sec={`item-${it.id}`}>
            <Pic src={it.image} alt={it.title} i={i} />
            <figcaption>
              <small>{catLabel(it.category)}</small>
              <b>{it.title || "Untitled look"}</b>
            </figcaption>
          </figure>
        ))}
        {!shown.length && <p className="sp-empty">No looks in this category yet.</p>}
      </section>

      {live.length > 0 && (
        <section className="sp-band" data-sec="focus">
          <div className="sp-center">
            <p className="sp-eb mid">{focus.eyebrow}</p>
            <h2>{focus.title}</h2>
          </div>
          <FocusPanel key={startId} list={live} startId={startId} focus={focus} catLabel={catLabel} />
        </section>
      )}

      <BottomPreview d={bottom} />
    </div>
  );
}
