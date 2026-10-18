import { Sparkles, ListOrdered, Layers, Calendar, UserRound, ShieldCheck } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import SectionNav from "../components/editor/SectionNav.jsx";
import EditorToolbar from "../components/editor/EditorToolbar.jsx";
import SharedBottomNote from "../components/editor/SharedBottomNote.jsx";
import Field from "../components/editor/Field.jsx";
import ItemList from "../components/editor/ItemList.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import EditorGrid from "../components/editor/EditorGrid.jsx";
import BookingPreview from "../components/editor/preview/BookingPreview.jsx";
import { ICONS, ICON_OPTIONS } from "../components/editor/icons.js";
import useSiteEditor from "../editor/useSiteEditor.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import { validateBooking } from "../editor/validateSite.js";
import "../styles/editor.css";
import "../styles/siteEditor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const ORDER = ["hero", "steps", "services", "event", "you", "summary"];
const META = {
  hero:     { icon: Sparkles,    nav: "Intro",    title: "Page intro",          sub: "Heading & welcome text" },
  steps:    { icon: ListOrdered, nav: "Steps",    title: "Steps",               sub: "The 3 step names, headings & buttons" },
  services: { icon: Layers,      nav: "Services", title: "Step 1 · service choices", sub: "Name, description & starting price" },
  event:    { icon: Calendar,    nav: "Event",    title: "Step 2 · event details", sub: "Field names for date, venue, guests & trial" },
  you:      { icon: UserRound,   nav: "About you", title: "Step 3 · about you", sub: "Field names for name, phone & notes" },
  summary:  { icon: ShieldCheck, nav: "Summary",  title: "Booking summary card", sub: "Side card wording & confirm button" },
};
const NAV = ORDER.map((id) => ({ id, label: META[id].nav, icon: META[id].icon }));

export default function BookingEditor() {
  const ed = useSiteEditor({ pageKey: "booking", order: ORDER, validate: validateBooking });
  const ago = useTimeAgo(ed.lastSaved);

  if (ed.loadState === "loading") return <Layout><div className="ed-page"><div className="ed-skel" /></div></Layout>;
  if (ed.loadState === "error" || !ed.draft)
    return (
      <Layout><div className="ed-page"><div className="ed-state">
        <p>This page could not be loaded right now.</p>
        <button type="button" className="ed-btn" onClick={ed.load}>Try again</button>
      </div></div></Layout>
    );

  const p = ed.draft;
  const bottom = ed.bottom;
  const upd = (key, patch) => ed.setPage((d) => ({ ...d, [key]: { ...d[key], ...patch } }));
  const edit = (sec, itemKey, node) => <div onFocusCapture={() => ed.focusSection(sec, itemKey ? [itemKey] : [])}>{node}</div>;
  const ev = p.event, yo = p.you, su = p.summary;

  const body = {
    hero: (
      <>
        <Field label="Breadcrumb name" max={20} hint="Shown as Home › … at the top" value={p.hero.crumb} onChange={(v) => upd("hero", { crumb: v })} />
        <Field label="Small heading" caps max={40} value={p.hero.eyebrow} onChange={(v) => upd("hero", { eyebrow: v })} />
        <Field label="Page title" as="textarea" rows={2} max={80} hint="Press Enter for a line break" value={p.hero.title} onChange={(v) => upd("hero", { title: v })} />
        <Field label="Intro text" as="textarea" rows={3} max={240} value={p.hero.text} onChange={(v) => upd("hero", { text: v })} />
      </>
    ),

    steps: (
      <>
        <p className="fd-note">The booking always has these 3 steps. You can rename them and change their wording.</p>
        <ItemList
          items={p.steps}
          onChange={(l) => ed.setPage((d) => ({ ...d, steps: l }))}
          canAdd={false}
          canDelete={false}
          reorder={false}
          summary={(s, i) => ({ thumb: <b>{p.steps.indexOf(s) + 1}</b>, title: s.tab || "Step", subtitle: s.title })}
          editor={(s, pt) => edit("steps", "steps", (
            <>
              <Field label="Name in the progress bar" max={22} value={s.tab} onChange={(v) => pt({ tab: v })} />
              <Field label="Step heading" max={60} value={s.title} onChange={(v) => pt({ title: v })} />
              {s.id === "s1" && <Field label="Short text under the heading" as="textarea" rows={2} max={160} value={s.text} onChange={(v) => pt({ text: v })} />}
              {s.id !== "s3" && <Field label="“Next” button text" max={30} value={s.button} onChange={(v) => pt({ button: v })} />}
            </>
          ))}
        />
      </>
    ),

    services: (
      <>
        <ItemList
          items={p.services}
          onChange={(l) => ed.setPage((d) => ({ ...d, services: l }))}
          canAdd={false}
          canDelete={false}
          summary={(v) => {
            const I = ICONS[v.icon] || Sparkles;
            return { thumb: <I size={18} />, title: v.title || "Service", subtitle: v.price };
          }}
          editor={(v, pt) => edit("services", `svc-${v.id}`, (
            <>
              <Field label="Icon" as="select" options={ICON_OPTIONS} value={v.icon} onChange={(x) => pt({ icon: x })} />
              <Field label="Service name" max={30} value={v.title} onChange={(x) => pt({ title: x })} />
              <Field label="Short description" as="textarea" rows={2} max={110} value={v.desc} onChange={(x) => pt({ desc: x })} />
              <Field label="Starting price" max={24} placeholder="From ₹18,000" hint="Keep this in line with the Services page" value={v.price} onChange={(x) => pt({ price: x })} />
            </>
          ))}
        />
        <p className="fd-note">If you rename a service, new bookings use the new name. Bookings that already exist keep the name they were made with.</p>
      </>
    ),

    event: (
      <>
        <Field label="Date · label" max={30} value={ev.dateLabel} onChange={(v) => upd("event", { dateLabel: v })} />
        <Field label="Note under the calendar" max={80} hint="The calendar’s held dates come from your bookings and are not edited here" value={ev.calendarNote} onChange={(v) => upd("event", { calendarNote: v })} />
        <div className="fd-row">
          <Field label="Venue · label" max={30} value={ev.venueLabel} onChange={(v) => upd("event", { venueLabel: v })} />
          <Field label="Venue · hint inside" max={50} value={ev.venuePh} onChange={(v) => upd("event", { venuePh: v })} />
        </div>
        <div className="fd-row">
          <Field label="Guests · label" max={30} value={ev.guestsLabel} onChange={(v) => upd("event", { guestsLabel: v })} />
          <Field label="Guests · hint inside" max={50} value={ev.guestsPh} onChange={(v) => upd("event", { guestsPh: v })} />
        </div>
        <Field label="Trial session · title" max={40} value={ev.trialTitle} onChange={(v) => upd("event", { trialTitle: v })} />
        <Field label="Trial session · text" max={80} value={ev.trialText} onChange={(v) => upd("event", { trialText: v })} />
      </>
    ),

    you: (
      <>
        <div className="fd-row">
          <Field label="Name · label" max={30} value={yo.nameLabel} onChange={(v) => upd("you", { nameLabel: v })} />
          <Field label="Name · hint inside" max={50} value={yo.namePh} onChange={(v) => upd("you", { namePh: v })} />
        </div>
        <div className="fd-row">
          <Field label="Phone · label" max={30} value={yo.phoneLabel} onChange={(v) => upd("you", { phoneLabel: v })} />
          <Field label="Phone · hint inside" max={50} value={yo.phonePh} onChange={(v) => upd("you", { phonePh: v })} />
        </div>
        <Field label="Notes · label" max={60} value={yo.notesLabel} onChange={(v) => upd("you", { notesLabel: v })} />
        <Field label="Notes · hint inside" as="textarea" rows={2} max={140} value={yo.notesPh} onChange={(v) => upd("you", { notesPh: v })} />
      </>
    ),

    summary: (
      <>
        <div className="fd-row">
          <Field label="Card title" max={30} value={su.title} onChange={(v) => upd("summary", { title: v })} />
          <Field label="Status tag" max={20} value={su.status} onChange={(v) => upd("summary", { status: v })} />
        </div>
        <div className="fd-row">
          <Field label="Service · label" caps max={24} value={su.serviceLabel} onChange={(v) => upd("summary", { serviceLabel: v })} />
          <Field label="Date · label" caps max={24} value={su.dateLabel} onChange={(v) => upd("summary", { dateLabel: v })} />
        </div>
        <div className="fd-row">
          <Field label="Celebration · label" caps max={24} value={su.celebrationLabel} onChange={(v) => upd("summary", { celebrationLabel: v })} />
          <Field label="Text before venue is added" max={40} value={su.venueFallback} onChange={(v) => upd("summary", { venueFallback: v })} />
        </div>
        <Field label="Note above the button" as="textarea" rows={2} max={140} value={su.note} onChange={(v) => upd("summary", { note: v })} />
        <Field label="Confirm button text" max={30} hint="This button opens WhatsApp with the booking details" value={su.button} onChange={(v) => upd("summary", { button: v })} />
        <Field label="Privacy line" as="textarea" rows={2} max={110} value={su.privacy} onChange={(v) => upd("summary", { privacy: v })} />
        <p className="fd-note">The WhatsApp number it opens comes from the Contact page.</p>
      </>
    ),
  };

  return (
    <Layout>
      <div className="ed-page sx">
        <EditorToolbar
          crumb="Booking" title="Booking page editor"
          dirty={ed.dirty} saving={ed.saving} savedText={ago}
          onSave={ed.save} onReset={ed.reset} siteUrl={`${SITE}/booking`}
        />

        <EditorGrid>
          <div className="sx-left">
            <SectionNav items={NAV} current={ed.open} onPick={ed.jump} />
            {ORDER.map((id) => {
              const m = META[id];
              return (
                <div key={id} onFocusCapture={() => ed.focusSection(id)}>
                  <SectionCard
                    id={id} icon={m.icon} title={m.title} subtitle={m.sub}
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

          <LivePreview url="saanjhbeauty.in/booking" active={ed.active}>
            {(device) => <BookingPreview d={p} bottom={bottom} device={device} />}
          </LivePreview>
        </EditorGrid>

        {ed.toast && <div className="ed-toast sx-toast" role="status">{ed.toast}</div>}
      </div>
    </Layout>
  );
}
