import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Quote, Star, MessageCircle, Send, Heart, Sparkles, ExternalLink, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import Field from "../components/editor/Field.jsx";
import Toggle from "../components/editor/Toggle.jsx";
import ImageField from "../components/editor/ImageField.jsx";
import ItemList from "../components/editor/ItemList.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import ReviewsPreview from "../components/editor/preview/ReviewsPreview.jsx";
import { ICONS, ICON_OPTIONS } from "../components/editor/icons.js";
import useDragReorder from "../editor/useDragReorder.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import validateReviews from "../editor/validateReviews.js";
import { useSetEditorBar } from "../editor/EditorBarContext.jsx";
import { sumCounts, autoAverage } from "../editor/rating.js";
import { getReviewsPage, saveReviewsPage } from "../api/reviewsAdmin.js";
import "../styles/editor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";
const uid = () => `n${Math.random().toString(36).slice(2, 9)}`;

const META = {
  hero: { icon: Quote, title: "Page hero", sub: () => "Opening copy for your brides’ stories" },
  summary: { icon: Star, title: "Rating summary", sub: () => "Average, review counts & live bars" },
  testimonials: { icon: MessageCircle, title: "Testimonials", sub: () => "Bride notes, photos & featured stories" },
  messages: {
    icon: Send,
    title: "WhatsApp messages",
    sub: (d) => {
      const n = d.messages.filter((m) => m.published).length;
      return `Warm notes shown as chat cards · ${Math.min(6, n)} of ${n}`;
    },
  },
  values: { icon: Heart, title: "Values strip", sub: () => "Four reasons brides choose Saanjh" },
  cta: { icon: Sparkles, title: "Page CTA", sub: () => "Final invitation, button & tone" },
};

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
  const setBar = useSetEditorBar();
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState(null);
  const [loadState, setLoadState] = useState("loading"); // loading | ready | error
  const [open, setOpen] = useState("hero");
  const [reorder, setReorder] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [toast, setToast] = useState("");
  const ago = useTimeAgo(lastSaved);
  const saveRef = useRef(null);
  const discardRef = useRef(null);

  const order = draft?.sectionOrder ?? [];
  const { bind, over, move } = useDragReorder(order, (o) => setDraft((d) => ({ ...d, sectionOrder: o })));

  const load = useCallback(() => {
    setLoadState("loading");
    getReviewsPage()
      .then(({ page, savedAt }) => { setDraft(page); setSaved(page); setLastSaved(savedAt); setLoadState("ready"); })
      .catch((err) => { console.error("ReviewsEditor load error:", err); setLoadState("error"); });
  }, []);
  useEffect(() => { load(); }, [load]);

  const dirty = useMemo(() => Boolean(draft && saved && JSON.stringify(draft) !== JSON.stringify(saved)), [draft, saved]);
  const errs = useMemo(() => (showErrors && draft ? validateReviews(draft) : {}), [showErrors, draft]);

  // ---- save / discard ----
  saveRef.current = async () => {
    const e = validateReviews(draft);
    if (Object.keys(e).length) {
      const first = draft.sectionOrder.find((id) => e[id]);
      setShowErrors(true);
      setReorder(false);
      setOpen(first);
      setToast("Please fix the highlighted fields.");
      setTimeout(() => document.getElementById(`sec-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
      return;
    }
    setSaving(true);
    try {
      const { page, savedAt } = await saveReviewsPage(draft);
      setDraft(page); setSaved(page); setLastSaved(savedAt); setShowErrors(false);
      setToast(page.status === "published" ? "Saved and published." : "Saved as draft.");
    } catch {
      setToast("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  discardRef.current = () => {
    if (!dirty) return;
    if (window.confirm("Discard all unsaved changes?")) { setDraft(saved); setShowErrors(false); }
  };

  // sticky bottom bar ko state bhejna (EditorBarProvider ho to)
  useEffect(() => {
    if (!setBar || !draft) return;
    setBar({
      dirty, saving, status: draft.status, lastSaved,
      save: () => saveRef.current(),
      discard: () => discardRef.current(),
      setStatus: (s) => setDraft((d) => ({ ...d, status: s })),
    });
  }, [setBar, dirty, saving, draft?.status, lastSaved]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { if (setBar) setBar(null); }, [setBar]);

  // unsaved changes ke saath tab band karne par chetavni
  useEffect(() => {
    if (!dirty) return;
    const h = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  if (loadState === "loading") return <Layout><div className="ed-page"><div className="ed-skel" /></div></Layout>;
  if (loadState === "error" || !draft)
    return (
      <Layout><div className="ed-page"><div className="ed-state">
        <p>This page could not be loaded right now.</p>
        <button type="button" className="ed-btn" onClick={load}>Try again</button>
      </div></div></Layout>
    );

  const d = draft;
  const upd = (key, patch) => setDraft((x) => ({ ...x, [key]: { ...x[key], ...patch } }));
  const setList = (key, list) => setDraft((x) => ({ ...x, [key]: list }));
  const photoOf = (t) => (t.image ? { src: t.image, name: t.imageName, size: t.imageSize } : null);

  const body = {
    hero: (
      <>
        <Field label="Eyebrow" caps max={60} value={d.hero.eyebrow} onChange={(v) => upd("hero", { eyebrow: v })} />
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
        <Field label="Section eyebrow" caps max={50} value={d.testimonialsSection.eyebrow} onChange={(v) => upd("testimonialsSection", { eyebrow: v })} />
        <Field label="Section title" max={70} value={d.testimonialsSection.title} onChange={(v) => upd("testimonialsSection", { title: v })} />
        <Field label="Section note" as="textarea" rows={2} max={140} value={d.testimonialsSection.note} onChange={(v) => upd("testimonialsSection", { note: v })} />
        <div className="fd">
          <span className="fd-label">Testimonials · {d.testimonials.length}</span>
          <ItemList
            items={d.testimonials}
            onChange={(l) => setList("testimonials", l)}
            addLabel="Add testimonial"
            makeNew={() => ({ id: uid(), name: "", meta: "", quote: "", rating: 5, image: "", published: true, featured: false })}
            summary={(t) => ({
              thumb: t.image ? <img src={t.image} alt="" /> : <Quote size={18} />,
              title: t.name || "New testimonial",
              subtitle: t.meta || "Wedding place & date",
            })}
            toggles={(t, p) => (
              <>
                <Toggle label="Published" checked={t.published} onChange={(v) => p({ published: v })} />
                <Toggle label="Featured" checked={t.featured} onChange={(v) => p({ featured: v })} />
              </>
            )}
            editor={(t, p) => (
              <>
                <div className="fd-row">
                  <Field label="Bride’s name" max={50} value={t.name} onChange={(v) => p({ name: v })} />
                  <Field label="Wedding place & date" max={60} placeholder="Jaipur wedding · March 2025" value={t.meta} onChange={(v) => p({ meta: v })} />
                </div>
                <Field label="Quote" as="textarea" rows={3} max={220} value={t.quote} onChange={(v) => p({ quote: v })} />
                <StarPick value={t.rating} onChange={(v) => p({ rating: v })} />
                <ImageField
                  label="Photo (optional)"
                  hint="Cards with a photo are shown as photo cards"
                  value={photoOf(t)}
                  onChange={(v) => p({ image: v?.src || "", imageName: v?.name, imageSize: v?.size, _file: v?.file })}
                />
              </>
            )}
          />
        </div>
      </>
    ),

    messages: (
      <>
        <Field label="Section eyebrow" caps max={50} value={d.messagesSection.eyebrow} onChange={(v) => upd("messagesSection", { eyebrow: v })} />
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
            toggles={(m, p) => <Toggle label="Published" checked={m.published} onChange={(v) => p({ published: v })} />}
            editor={(m, p) => (
              <>
                <div className="fd-row">
                  <Field label="Name" max={50} value={m.name} onChange={(v) => p({ name: v })} />
                  <Field label="Time shown" max={12} placeholder="11:42 AM" value={m.time} onChange={(v) => p({ time: v })} />
                </div>
                <Field label="Message" as="textarea" rows={3} max={220} hint="Emojis are welcome 🤍" value={m.text} onChange={(v) => p({ text: v })} />
              </>
            )}
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
        editor={(v, p) => (
          <>
            <Field label="Icon" as="select" options={ICON_OPTIONS} value={v.icon} onChange={(x) => p({ icon: x })} />
            <Field label="Title" max={30} value={v.title} onChange={(x) => p({ title: x })} />
            <Field label="Text" as="textarea" rows={2} max={90} value={v.text} onChange={(x) => p({ text: x })} />
          </>
        )}
      />
    ),

    cta: (
      <>
        <Field label="Eyebrow" caps max={50} value={d.cta.eyebrow} onChange={(v) => upd("cta", { eyebrow: v })} />
        <Field label="Title" as="textarea" rows={2} max={80} hint="Press Enter for a line break" value={d.cta.title} onChange={(v) => upd("cta", { title: v })} />
        <Field label="Text" as="textarea" rows={3} max={180} value={d.cta.text} onChange={(v) => upd("cta", { text: v })} />
        <Field label="Button text" max={30} value={d.cta.button} onChange={(v) => upd("cta", { button: v })} />
        <div className="fd">
          <span className="fd-label">Tone</span>
          <div className="seg" role="radiogroup" aria-label="CTA tone">
            {["light", "dark"].map((t) => (
              <button key={t} type="button" role="radio" aria-checked={d.cta.tone === t} className={d.cta.tone === t ? "on" : ""} onClick={() => upd("cta", { tone: t })}>
                {t === "light" ? "Light (sand)" : "Dark (maroon)"}
              </button>
            ))}
          </div>
        </div>
      </>
    ),
  };

  return (
    <Layout>
    <div className="ed-page">
      <div className="ed-crumbs"><span>Website</span><ChevronRight size={14} /><b>Reviews</b></div>

      <div className="ed-head">
        <h1 className="ed-title">Reviews page editor</h1>
        <div className="ed-head-r">
          <span className="ed-saved">Last saved {ago}</span>
          <a className="ed-btn" href={`${SITE}/reviews`} target="_blank" rel="noreferrer"><ExternalLink size={18} strokeWidth={1.7} /> View live site</a>
        </div>
      </div>

      <div className="ed-grid">
        <div className="ed-left">
          <div className="ed-sechead">
            <h2>Page sections <span>· {order.length}</span></h2>
            <button type="button" className="ed-link" onClick={() => setReorder((r) => !r)}>{reorder ? "Done" : "Reorder sections"}</button>
          </div>

          {order.map((id, i) => {
            const m = META[id];
            return (
              <SectionCard
                key={id}
                id={id}
                icon={m.icon}
                title={m.title}
                subtitle={m.sub(d)}
                open={!reorder && open === id}
                onToggle={() => setOpen(open === id ? null : id)}
                issues={errs[id]?.length || 0}
                reorder={reorder}
                canUp={i > 0}
                canDown={i < order.length - 1}
                onUp={() => move(i, i - 1)}
                onDown={() => move(i, i + 1)}
                drag={bind(i)}
                dragOver={over === i}
              >
                {errs[id] && <ul className="sc-errs">{errs[id].map((msg) => <li key={msg}>{msg}</li>)}</ul>}
                {body[id]}
              </SectionCard>
            );
          })}
        </div>

        <LivePreview url="saanjhbeauty.in/reviews">
          {(device) => <ReviewsPreview d={d} device={device} />}
        </LivePreview>
      </div>

      {toast && <div className="ed-toast" role="status">{toast}</div>}
    </div>
    </Layout>
  );
}
