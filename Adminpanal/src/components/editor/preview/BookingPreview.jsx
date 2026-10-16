import { ArrowRight, Calendar, Check, ChevronLeft, ChevronRight, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { ICONS } from "../icons.js";
import { SiteNav, BottomPreview } from "./SiteChrome.jsx";

// Calendar sirf dikhane ke liye (asli held dates backend se aati hain)
const DAYS = Array.from({ length: 21 }, (_, i) => i + 1);
const HELD = [6, 13, 19];

// Website ke Booking page ka live mock. Sirf text/labels edit hote hain; booking ka data nahi.
export default function BookingPreview({ d, bottom, device }) {
  const { hero, steps, services, event, you, summary } = d;
  const picked = services[0];

  return (
    <div className={`sp ${device === "mobile" ? "m" : ""}`}>
      <SiteNav active="Booking" />

      <section className="sp-bhero" data-sec="hero">
        <p className="sp-crumb">Home <ChevronRight size={12} /> <b>{hero.crumb}</b></p>
        <p className="sp-eb dark">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="sp-body">{hero.text}</p>
      </section>

      <section className="sp-bmain">
        <div className="sp-bleft">
          <div className="sp-stepper" data-sec="steps">
            <div className="sp-stepper-row">
              {steps.map((s, i) => (
                <div key={s.id} className={`sp-st ${i === 0 ? "on" : ""}`}>
                  <span>{i + 1}</span><b>{s.tab}</b>
                  {i < steps.length - 1 && <i />}
                </div>
              ))}
            </div>
            <div className="sp-track"><u /></div>
          </div>

          {/* STEP 1 */}
          <div className="sp-bcard" data-sec="step-s1">
            <p className="sp-eb">Step 1 of {steps.length}</p>
            <h3>{steps[0].title}</h3>
            <p className="sp-bsub">{steps[0].text}</p>
            <div className="sp-opts" data-sec="services">
              {services.map((v, i) => {
                const I = ICONS[v.icon] || ICONS.sparkles;
                return (
                  <div key={v.id} className={`sp-opt ${i === 0 ? "on" : ""}`} data-sec={`svc-${v.id}`}>
                    <span className="sp-opt-ic"><I size={17} strokeWidth={1.6} /></span>
                    {i === 0 && <span className="sp-opt-ck"><Check size={11} strokeWidth={3} /></span>}
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                    <b>{v.price}</b>
                  </div>
                );
              })}
            </div>
            {steps[0].button && <div className="sp-brow"><span className="sp-btn">{steps[0].button} <ArrowRight size={15} /></span></div>}
          </div>

          {/* STEP 2 */}
          <div className="sp-bcard" data-sec="event">
            <p className="sp-eb">Step 2 of {steps.length}</p>
            <h3 data-sec="step-s2">{steps[1].title}</h3>
            {steps[1].text && <p className="sp-bsub">{steps[1].text}</p>}
            <div className="sp-evgrid">
              <div>
                <span className="sp-bl">{event.dateLabel}</span>
                <div className="sp-cal">
                  <div className="sp-cal-h"><ChevronLeft size={16} /><b>February 2026</b><ChevronRight size={16} /></div>
                  <div className="sp-cal-g">
                    {["S", "M", "T", "W", "T", "F", "S"].map((x, i) => <em key={i}>{x}</em>)}
                    {DAYS.map((n) => <span key={n} className={n === 10 ? "sel" : HELD.includes(n) ? "held" : ""}>{n}</span>)}
                  </div>
                  <p className="sp-cal-n"><i />{event.calendarNote}</p>
                </div>
              </div>
              <div className="sp-evr">
                <span className="sp-bl">{event.venueLabel}</span>
                <div className="sp-binp"><MapPin size={14} /><em>{event.venuePh}</em></div>
                <span className="sp-bl">{event.guestsLabel}</span>
                <div className="sp-binp"><em>{event.guestsPh}</em></div>
                <div className="sp-trial">
                  <div><b>{event.trialTitle}</b><small>{event.trialText}</small></div>
                  <span className="sp-tog"><u /></span>
                </div>
              </div>
            </div>
            {steps[1].button && <div className="sp-brow"><span className="sp-btn">{steps[1].button} <ArrowRight size={15} /></span></div>}
          </div>

          {/* STEP 3 */}
          <div className="sp-bcard" data-sec="you">
            <p className="sp-eb">Step 3 of {steps.length}</p>
            <h3 data-sec="step-s3">{steps[2].title}</h3>
            {steps[2].text && <p className="sp-bsub">{steps[2].text}</p>}
            <div className="sp-yougrid">
              <div><span className="sp-bl">{you.nameLabel}</span><div className="sp-binp"><em>{you.namePh}</em></div></div>
              <div><span className="sp-bl">{you.phoneLabel}</span><div className="sp-binp"><em>{you.phonePh}</em></div></div>
            </div>
            <span className="sp-bl">{you.notesLabel}</span>
            <div className="sp-binp tall"><em>{you.notesPh}</em></div>
          </div>
        </div>

        <aside className="sp-sum" data-sec="summary">
          <div className="sp-sum-h"><h3>{summary.title}</h3><span>{summary.status}</span></div>
          <div className="sp-sum-rows">
            <div><span className="sp-sum-ic">{(() => { const I = ICONS[picked?.icon] || ICONS.sparkles; return <I size={16} strokeWidth={1.5} />; })()}</span>
              <div><small>{summary.serviceLabel}</small><b>{picked?.title}</b><em>{picked?.price}</em></div></div>
            <div><span className="sp-sum-ic"><Calendar size={16} strokeWidth={1.5} /></span>
              <div><small>{summary.dateLabel}</small><b>10 February 2026</b></div></div>
            <div><span className="sp-sum-ic"><MapPin size={16} strokeWidth={1.5} /></span>
              <div><small>{summary.celebrationLabel}</small><b>{summary.venueFallback}</b></div></div>
          </div>
          <p className="sp-sum-note">{summary.note}</p>
          <span className="sp-btn block"><MessageCircle size={15} /> {summary.button}</span>
          <p className="sp-sum-priv"><ShieldCheck size={14} /> {summary.privacy}</p>
        </aside>
      </section>

      <BottomPreview d={bottom} cta={false} />
    </div>
  );
}
