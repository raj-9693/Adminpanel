import { ArrowUpRight, Heart, MapPin, Send, MessageCircle } from "lucide-react";
import { CONTACT_ICONS } from "../contactIcons.jsx";
import { SiteNav, BottomPreview } from "./SiteChrome.jsx";

const Field = ({ label, ph, children }) => (
  <div className="sp-fld">
    <span>{label}</span>
    <div className="sp-inp">{children || <em>{ph}</em>}</div>
  </div>
);

// Website ke Contact page ka live mock (sirf footer neeche — is page par CTA card nahi hota).
export default function ContactPreview({ d, bottom, device }) {
  const { hero, reach, map, form, quick } = d;

  return (
    <div className={`sp ${device === "mobile" ? "m" : ""}`}>
      <SiteNav active="Contact" />

      <section className="sp-ghero sp-lines" data-sec="hero">
        <p className="sp-eb mid">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="sp-lead">{hero.text}</p>
        <div className="sp-orn"><span>❧</span></div>
      </section>

      <section className="sp-contact">
        <div className="sp-reach" data-sec="reach">
          <div className="sp-reach-h">
            <div>
              <p className="sp-eb dark">{reach.eyebrow}</p>
              <h2>{reach.title}</h2>
            </div>
            <span className="sp-heart"><Heart size={18} /></span>
          </div>
          {reach.items.map((c) => {
            const I = CONTACT_ICONS[c.icon] || CONTACT_ICONS.phone;
            return (
              <div key={c.id} className="sp-ccard" data-sec={`card-${c.id}`}>
                <span className="sp-ic big"><I size={20} strokeWidth={1.6} /></span>
                <div>
                  <small>{c.label}</small>
                  <b>{c.value}</b>
                  {c.note && <em>{c.note}</em>}
                </div>
                {c.arrow && <ArrowUpRight size={15} className="sp-arr" />}
              </div>
            );
          })}
        </div>

        <div className="sp-right">
          <div className="sp-map" data-sec="map">
            <div className="sp-map-art">
              <span className="sp-road a" /><span className="sp-road b" />
              <span className="sp-pin"><MapPin size={26} /></span>
              <div className="sp-maplabel"><small>{map.pinLabel}</small><b>{map.pinPlace}</b></div>
            </div>
            <div className="sp-map-b">
              <div><h3>{map.title}</h3><p>{map.text}</p></div>
              {map.button && <span className="sp-btn ghost sm2">{map.button} <ArrowUpRight size={14} /></span>}
            </div>
          </div>

          <div className="sp-formcard" data-sec="form">
            <div className="sp-form-h">
              <div><p className="sp-eb">{form.eyebrow}</p><h2>{form.title}</h2></div>
              <p>{form.note}</p>
            </div>
            <div className="sp-formgrid">
              <Field label={form.nameLabel} ph={form.namePh} />
              <Field label={form.phoneLabel} ph={form.phonePh} />
              <Field label={form.dateLabel} ph={form.datePh} />
              <Field label={form.lookingLabel}><b>{form.options[0]?.label}</b></Field>
              <div className="sp-fld full">
                <span>{form.messageLabel}</span>
                <div className="sp-inp tall"><em>{form.messagePh}</em></div>
              </div>
            </div>
            <div className="sp-form-f">
              <p>{form.privacy}</p>
              <span className="sp-btn">{form.button} <Send size={15} /></span>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-quick" data-sec="quick">
        <div><p className="sp-eb dark">{quick.eyebrow}</p><h2>{quick.title}</h2></div>
        {quick.button && <span className="sp-btn">{quick.button} <MessageCircle size={15} /></span>}
      </section>

      <BottomPreview d={bottom} cta={false} />
    </div>
  );
}
