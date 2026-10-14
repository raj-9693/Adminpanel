import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { SITE_NAV } from "../../../data/editorData.js";

/* inline brand icons (lucide versions me brand icons hat gaye hain) */
const Insta = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" />
  </svg>
);
const Fb = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.3l.7-3.5H14V8.5z" />
  </svg>
);

const Yt = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="6" width="18" height="12" rx="4" /><path d="m10.5 9.5 4 2.5-4 2.5z" />
  </svg>
);

/** Photo ya (photo na ho to) halka placeholder tile */
export function Pic({ src, alt = "", i = 0, className = "" }) {
  return src ? (
    <img className={`sp-pic ${className}`} src={src} alt={alt} onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
  ) : (
    <div className={`sp-pic ph ph${i % 3} ${className}`} aria-hidden>
      <span>Add a photo</span>
    </div>
  );
}

export function SiteNav({ active, brand = "Saanjh" }) {
  return (
    <nav className="sp-nav">
      <span className="sp-logo"><i>स</i>{brand}</span>
      <span className="sp-links">
        {SITE_NAV.map((l) => <em key={l} className={l === active ? "on" : ""}>{l}</em>)}
      </span>
      <span className="sp-navr"><span className="sp-lang"><b>हिंदी</b> / EN</span><span className="sp-btn sm">Book now</span></span>
    </nav>
  );
}

/** SHARED bottom: CTA card + footer. Home aur Gallery dono yahi use karte hain. */
export function BottomPreview({ d }) {
  const { cta, footer: f } = d;
  return (
    <div data-sec="bottom">
      <section className="sp-sec sp-ctawrap">
        <div className="sp-cta">
          <p className="sp-eb dark">{cta.eyebrow}</p>
          <h2>{cta.title}</h2>
          <p className="sp-ctatext">{cta.text}</p>
          <span className="sp-btn">{cta.button} <ArrowRight size={15} /></span>
        </div>
      </section>

      <footer className="sp-foot">
        <div>
          <span className="sp-logo"><i>स</i>{f.brand}</span>
          <p className="sp-fblurb">{f.blurb}</p>
        </div>
        <div>
          <h5>{f.linksTitle}</h5>
          <ul>{f.links.map((l) => <li key={l.id}>{l.label}</li>)}</ul>
        </div>
        <div>
          <h5>{f.visitTitle}</h5>
          <ul className="icons">
            <li><MapPin size={14} /> <span style={{ whiteSpace: "pre-line" }}>{f.address}</span></li>
            <li><Mail size={14} /> {f.email}</li>
            <li><Phone size={14} /> {f.phone}</li>
          </ul>
        </div>
        <div>
          <h5>{f.followTitle}</h5>
          <p className="sp-fblurb">{f.followText}</p>
          <div className="sp-social"><span><Insta /></span><span><Fb /></span><span><Yt /></span></div>
        </div>
      </footer>
      <div className="sp-legal"><span>{f.copyright}</span><span>{f.madeWith}</span></div>
    </div>
  );
}
