import { Quote, Star, MessageCircle, Send, Heart, Sparkles } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import SectionNav from "../components/editor/SectionNav.jsx";
import EditorToolbar from "../components/editor/EditorToolbar.jsx";
import SharedBottomNote from "../components/editor/SharedBottomNote.jsx";
import Field from "../components/editor/Field.jsx";
import Toggle from "../components/editor/Toggle.jsx";
import ItemList from "../components/editor/ItemList.jsx";
import PhotoField from "../components/editor/PhotoField.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import EditorGrid from "../components/editor/EditorGrid.jsx";
import ReviewsPagePreview from "../components/editor/preview/ReviewsPagePreview.jsx";
import { ICONS, ICON_OPTIONS } from "../components/editor/icons.js";
import useSiteEditor from "../editor/useSiteEditor.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import { validateReviews } from "../editor/validateSite.js";
import { sumCounts, autoAverage } from "../editor/rating.js";
import { uid } from "../editor/imageTools.js";
import "../styles/editor.css";
import "../styles/siteEditor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const ORDER = ["hero", "summary", "testimonials", "messages", "values"];
const META = {
  hero:         { icon: Quote,         nav: "Intro",    title: "Page intro",       sub: () => "Heading & welcome text" },
  summary:      { icon: Star,          nav: "Rating",   title: "Rating summary",   sub: () => "Average, review counts & live bars" },
  testimonials: { icon: MessageCircle, nav: "Notes",    title: "Testimonials",     sub: (d) => `${d.testimonials.length} bride notes · photos & featured stories` },
  messages:     { icon: Send,          nav: "Messages", title: "WhatsApp messages", sub: (d) => `Chat cards · ${Math.min(6, d.messages.filter((m) => m.published).length)} shown on the site` },
  values:       { icon: Heart,         nav: "Values",   title: "Values strip",     sub: () => "Four reasons brides choose Saanjh" },
};
const NAV = ORDER.map((id) => ({ id, label: META[id].nav, icon: META[id].icon }));

// save se pehle: counts ko numbers banao, auto average nikalo
function prepare(d) {
  const dist = Object.fromEntries([5, 4, 3, 2, 1].map((n) => [n, Number(d.summary.distribution[n]) || 0]));
  return {
    ...d,
    summary: { ...d.summary, distribution: dist, total: Number(d.summary.total) || 0,
      average: d.summary.auto ? autoAverage(dist) : Number(d.summary.average) },
  };
}

function StarPick({ value, onChange }) {
  return (
    <div className="fd">
      <span className="fd-label">Rating</span>
      <div className="starpick" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" role="radio" aria-checked={value === n} className={n <= value ? "on" : ""} onClick={() => onChange(n)} aria-label={`${n} star`}>
            <Star size={20} strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReviewsEditor() {
  const ed = useSiteEditor({ pageKey: "reviews", order: ORDER, validate: validateReviews, prepare });
  const ago = useTimeAgo(ed.lastSaved);

  if (ed.loadState === "loading") return <Layout><div className="ed-page"><div className="ed-skel" /></div></Layout>;
  if (ed.loadState === "error" || !ed.draft)
    return (
      <Layout><div className="ed-page"><div className="ed-state">
        <p>This page could not be loaded right now.</p>
        <button type="button" className="ed-btn" onClick={ed.load}>Try again</button>
      </div></div></Layout>
    );

  const d = ed.draft;
  const bottom = ed.bottom;
  const upd = (key, patch) => ed.setPage((x) => ({ ...x, [key]: { ...x[key], ...patch } }));
  const setList = (key, list) => ed.setPage((x) => ({ ...x, [key]: list }));
  const edit = (sec, itemKey, node) => <div onFocusCapture={() => ed.focusSection(sec, itemKey ? [itemKey] : [])}>{node}</div>;

  const body = {
    hero: (
      <>
        <Field label="Small heading" caps max={60} value={d.hero.eyebrow} onChange={(v) => upd("hero", { eyebrow: v })} />
        <Field label="Title" as="textarea" rows={2} max={90} value={d.hero.title} onChange={(v) => upd("hero", { title: v })} />
        <Field label="Intro text" as="textarea" rows={3} max={220} value={d.hero.intro} onChange={(v) => upd("hero", { intro: v })} />
      </>
    ),

    summary: (() => {
      const s = d.summary;
      const sum = sumCounts(s.distribution);
      const avg = s.auto ? autoAverage(s.distribution) : s.average;
      return (
        <>
          <div className="fd-row">
            <Field label="Average rating" type="number" step="0.1" min="0" disabled={s.auto} value={avg}
              hint={s.auto ? "Calculated from the counts below" : "Between 0 and 5"} onChange={(v) => upd("summary", { average: v })} />
            <Field label="Total brides shown" type="number" min="0" value={s.total}
              hint="Shown as “Loved by N+ brides”" onChange={(v) => upd("summary", { total: v })} />
          </div>
          <Toggle label="Calculate average automatically" checked={s.auto} onChange={(v) => upd("summary", { auto: v })} />
          <div className="fd">
            <span className="fd-label">Reviews by stars</span>
            <div className="counts">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="count-row">
                  <span className="count-n">{n}<Star size={13} strokeWidth={1.6} /></span>
                  <input className="fd-ctl sm" type="number" min="0" aria-label={`${n} star reviews`} value={s.distribution[n]}
                    onChange={(e) => upd("summary", { distribution: { ...s.distribution, [n]: e.target.value } })} />
                  <span className="count-bar"><span style={{ width: `${sum ? ((Number(s.distribution[n]) || 0) / sum) * 100 : 0}%` }} /></span>
                </div>
              ))}
            </div>
          </div>
          <Field label="Text beside the rating" as="textarea" rows={2} max={120} value={s.text} onChange={(v) => upd("summary", { text: v })} />
          <Field label="Note under the bars" max={90} value={s.note} onChange={(v) => upd("summary", { note: v })} />
        </>
      );
    })(),

    testimonials: (
      <>
        <Field label="Small heading" caps max={50} value={d.testimonialsSection.eyebrow} onChange={(v) => upd("testimonialsSection", { eyebrow: v })} />
        <Field label="Section title" max={70} value={d.testimonialsSection.title} onChange={(v) => upd("testimonialsSection", { title: v })} />
        <Field label="Note (top right)" as="textarea" rows={2} max={140} value={d.testimonialsSection.note} onChange={(v) => upd("testimonialsSection", { note: v })} />
        <div className="fd">
          <span className="fd-label">Testimonials · {d.testimonials.length}</span>
          <ItemList
            items={d.testimonials}
            onChange={(l) => setList("testimonials", l)}
            addLabel="Add testimonial"
            makeNew={() => ({ id: uid(), name: "", meta: "", quote: "", rating: 5, image: "", imageName: "", published: true, featured: false })}
            summary={(t) => ({
              thumb: t.image ? <img src={t.image} alt="" /> : <Quote size={18} />,
              title: t.name || "New testimonial",
              subtitle: t.meta || "Wedding place & date",
            })}
            toggles={(t, pt) => (
              <>
                <Toggle label="Published" checked={t.published} onChange={(v) => pt({ published: v })} />
                <Toggle label="Featured" checked={t.featured} onChange={(v) => pt({ featured: v })} />
              </>
            )}
            editor={(t, pt) => edit("testimonials", `t-${t.id}`, (
              <>
                <div className="fd-row">
                  <Field label="Bride’s name" max={50} value={t.name} onChange={(v) => pt({ name: v })} />
                  <Field label="Wedding place & date" max={60} placeholder="Jaipur wedding · March 2025" value={t.meta} onChange={(v) => pt({ meta: v })} />
                </div>
                <Field label="Quote" as="textarea" rows={3} max={220} value={t.quote} onChange={(v) => pt({ quote: v })} />
                <StarPick value={t.rating} onChange={(v) => pt({ rating: v })} />
                <PhotoField label="Photo (optional)" hint="Cards with a photo are shown as photo cards" src={t.image} name={t.imageName}
                  onChange={(v) => pt({ image: v.src, imageName: v.name })} />
              </>
            ))}
          />
          <p className="fd-note">Featured notes are shown first. The website shows up to 6 published notes.</p>
        </div>
      </>
    ),

    messages: (
      <>
        <Field label="Small heading" caps max={50} value={d.messagesSection.eyebrow} onChange={(v) => upd("messagesSection", { eyebrow: v })} />
        <Field label="Section title" max={70} value={d.messagesSection.title} onChange={(v) => upd("messagesSection", { title: v })} />
        <Field label="Intro text" as="textarea" rows={2} max={180} value={d.messagesSection.text} onChange={(v) => upd("messagesSection", { text: v })} />
        <div className="fd">
          <span className="fd-label">Messages · {d.messages.length}</span>
          <ItemList
            items={d.messages}
            onChange={(l) => setList("messages", l)}
            addLabel="Add message"
            makeNew={() => ({ id: uid(), name: "", time: "10:00 AM", text: "", published: true })}
            summary={(m) => ({ thumb: <Send size={18} />, title: m.name || "New message", subtitle: m.text || "Message text" })}
            toggles={(m, pt) => <Toggle label="Published" checked={m.published} onChange={(v) => pt({ published: v })} />}
            editor={(m, pt) => edit("messages", `m-${m.id}`, (
              <>
                <div className="fd-row">
                  <Field label="Name" max={50} value={m.name} onChange={(v) => pt({ name: v })} />
                  <Field label="Time shown" max={12} placeholder="11:42 AM" value={m.time} onChange={(v) => pt({ time: v })} />
                </div>
                <Field label="Message" as="textarea" rows={3} max={220} hint="Emojis are welcome 🤍" value={m.text} onChange={(v) => pt({ text: v })} />
              </>
            ))}
          />
          <p className="fd-note">The website shows the first 6 published messages, 3 on top and 3 below.</p>
        </div>
      </>
    ),

    values: (
      <ItemList
        items={d.values}
        onChange={(l) => setList("values", l)}
        canAdd={false}
        canDelete={false}
        summary={(v) => {
          const I = ICONS[v.icon] || Sparkles;
          return { thumb: <I size={18} />, title: v.title || "Value", subtitle: v.text };
        }}
        editor={(v, pt) => edit("values", `val-${v.id}`, (
          <>
            <Field label="Icon" as="select" options={ICON_OPTIONS} value={v.icon} onChange={(x) => pt({ icon: x })} />
            <Field label="Title" max={30} value={v.title} onChange={(x) => pt({ title: x })} />
            <Field label="Text" as="textarea" rows={2} max={90} value={v.text} onChange={(x) => pt({ text: x })} />
          </>
        ))}
      />
    ),
  };

  return (
    <Layout>
      <div className="ed-page sx">
        <EditorToolbar
          crumb="Reviews" title="Reviews page editor"
          dirty={ed.dirty} saving={ed.saving} savedText={ago}
          onSave={ed.save} onReset={ed.reset} siteUrl={`${SITE}/reviews`}
        />

        <EditorGrid>
          <div className="sx-left">
            <SectionNav items={NAV} current={ed.open} onPick={ed.jump} />
            {ORDER.map((id) => {
              const m = META[id];
              return (
                <div key={id} onFocusCapture={() => ed.focusSection(id)}>
                  <SectionCard
                    id={id} icon={m.icon} title={m.title} subtitle={m.sub(d)}
                    open={ed.open === id} onToggle={() => ed.toggle(id)}
                    issues={ed.errs[id]?.length || 0}
                  >
                    {ed.errs[id] && <ul className="sc-errs">{ed.errs[id].map((msg) => <li key={msg}>{msg}</li>)}</ul>}
                    {body[id]}
                  </SectionCard>
                </div>
              );
            })}
            <SharedBottomNote />
          </div>

          <LivePreview url="saanjhbeauty.in/reviews" active={ed.active}>
            {(device) => <ReviewsPagePreview d={d} bottom={bottom} device={device} />}
          </LivePreview>
        </EditorGrid>

        {ed.toast && <div className="ed-toast sx-toast" role="status">{ed.toast}</div>}
      </div>
    </Layout>
  );
}
