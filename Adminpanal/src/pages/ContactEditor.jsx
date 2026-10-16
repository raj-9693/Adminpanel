import { Sparkles, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import SectionNav from "../components/editor/SectionNav.jsx";
import EditorToolbar from "../components/editor/EditorToolbar.jsx";
import SharedBottomNote from "../components/editor/SharedBottomNote.jsx";
import Field from "../components/editor/Field.jsx";
import Toggle from "../components/editor/Toggle.jsx";
import ItemList from "../components/editor/ItemList.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import ContactPreview from "../components/editor/preview/ContactPreview.jsx";
import { CONTACT_ICONS, CONTACT_ICON_OPTIONS } from "../components/editor/contactIcons.jsx";
import useSiteEditor from "../editor/useSiteEditor.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import { validateContact } from "../editor/validateSite.js";
import { uid } from "../editor/imageTools.js";
import "../styles/editor.css";
import "../styles/siteEditor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const ORDER = ["hero", "reach", "map", "form", "quick"];
const META = {
  hero:  { icon: Sparkles,      nav: "Intro",   title: "Page intro",          sub: "Heading & welcome text" },
  reach: { icon: Phone,         nav: "Reach us", title: "Contact cards",      sub: "Phone, WhatsApp, Instagram, address & hours" },
  map:   { icon: MapPin,        nav: "Map",     title: "Studio map",          sub: "Map card text & “Open map” link" },
  form:  { icon: Send,          nav: "Form",    title: "Enquiry form",        sub: "Form heading, field names & options" },
  quick: { icon: MessageCircle, nav: "Quick hello", title: "Quick hello strip", sub: "“Chat on WhatsApp” strip" },
};
const NAV = ORDER.map((id) => ({ id, label: META[id].nav, icon: META[id].icon }));

export default function ContactEditor() {
  const ed = useSiteEditor({ pageKey: "contact", order: ORDER, validate: validateContact });
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
  const f = p.form;

  const body = {
    hero: (
      <>
        <Field label="Small heading" caps max={50} value={p.hero.eyebrow} onChange={(v) => upd("hero", { eyebrow: v })} />
        <Field label="Page title" as="textarea" rows={2} max={80} hint="Press Enter for a line break" value={p.hero.title} onChange={(v) => upd("hero", { title: v })} />
        <Field label="Intro text" as="textarea" rows={3} max={220} value={p.hero.text} onChange={(v) => upd("hero", { text: v })} />
      </>
    ),

    reach: (
      <>
        <Field label="Small heading" caps max={40} value={p.reach.eyebrow} onChange={(v) => upd("reach", { eyebrow: v })} />
        <Field label="Section title" max={50} value={p.reach.title} onChange={(v) => upd("reach", { title: v })} />
        <div className="fd">
          <span className="fd-label">Cards · {p.reach.items.length}</span>
          <ItemList
            items={p.reach.items}
            onChange={(l) => upd("reach", { items: l })}
            addLabel="Add card"
            canAdd={p.reach.items.length < 8}
            canDelete={p.reach.items.length > 1}
            makeNew={() => ({ id: uid(), icon: "phone", label: "", value: "", note: "", href: "", arrow: false })}
            summary={(c) => {
              const I = CONTACT_ICONS[c.icon] || Phone;
              return { thumb: <I size={18} />, title: c.label || "New card", subtitle: (c.value || "").split("\n")[0] || "Add details" };
            }}
            editor={(c, pt) => edit("reach", `card-${c.id}`, (
              <>
                <div className="fd-row">
                  <Field label="Icon" as="select" options={CONTACT_ICON_OPTIONS} value={c.icon} onChange={(v) => pt({ icon: v })} />
                  <Field label="Small label" caps max={24} placeholder="Studio line" value={c.label} onChange={(v) => pt({ label: v })} />
                </div>
                <Field label="Main text" as="textarea" rows={2} max={90} hint="Press Enter for a second line" value={c.value} onChange={(v) => pt({ value: v })} />
                <Field label="Small note (optional)" max={60} value={c.note} onChange={(v) => pt({ note: v })} />
                <Field label="Link (optional)" max={160} placeholder="tel:+919876543210 or https://wa.me/919876543210"
                  hint="Where the card goes when tapped" value={c.href} onChange={(v) => pt({ href: v })} />
                <Toggle label="Show the arrow ↗ (for links)" checked={c.arrow} onChange={(v) => pt({ arrow: v })} />
              </>
            ))}
          />
        </div>
      </>
    ),

    map: (
      <>
        <div className="fd-row">
          <Field label="Pin label" caps max={24} value={p.map.pinLabel} onChange={(v) => upd("map", { pinLabel: v })} />
          <Field label="Pin place" max={40} value={p.map.pinPlace} onChange={(v) => upd("map", { pinPlace: v })} />
        </div>
        <Field label="Card title" max={40} value={p.map.title} onChange={(v) => upd("map", { title: v })} />
        <Field label="Card text" max={90} value={p.map.text} onChange={(v) => upd("map", { text: v })} />
        <div className="fd-row">
          <Field label="Button text" max={20} hint="Leave empty to hide" value={p.map.button} onChange={(v) => upd("map", { button: v })} />
          <Field label="Map link" max={300} placeholder="https://maps.google.com/…" hint="Paste the Google Maps share link" value={p.map.url} onChange={(v) => upd("map", { url: v })} />
        </div>
      </>
    ),

    form: (
      <>
        <Field label="Small heading" caps max={30} value={f.eyebrow} onChange={(v) => upd("form", { eyebrow: v })} />
        <div className="fd-row">
          <Field label="Form title" max={40} value={f.title} onChange={(v) => upd("form", { title: v })} />
          <Field label="Note beside the title" max={70} value={f.note} onChange={(v) => upd("form", { note: v })} />
        </div>
        <h4 className="sx-sub">Field names</h4>
        <div className="fd-row">
          <Field label="Name · label" max={24} value={f.nameLabel} onChange={(v) => upd("form", { nameLabel: v })} />
          <Field label="Name · hint inside" max={40} value={f.namePh} onChange={(v) => upd("form", { namePh: v })} />
        </div>
        <div className="fd-row">
          <Field label="Phone · label" max={24} value={f.phoneLabel} onChange={(v) => upd("form", { phoneLabel: v })} />
          <Field label="Phone · hint inside" max={40} value={f.phonePh} onChange={(v) => upd("form", { phonePh: v })} />
        </div>
        <div className="fd-row">
          <Field label="Date · label" max={24} value={f.dateLabel} onChange={(v) => upd("form", { dateLabel: v })} />
          <Field label="Date · hint inside" max={40} value={f.datePh} onChange={(v) => upd("form", { datePh: v })} />
        </div>
        <div className="fd-row">
          <Field label="Message · label" max={30} value={f.messageLabel} onChange={(v) => upd("form", { messageLabel: v })} />
          <Field label="Message · hint inside" max={90} value={f.messagePh} onChange={(v) => upd("form", { messagePh: v })} />
        </div>
        <h4 className="sx-sub">“I’m looking for” choices</h4>
        <Field label="Dropdown label" max={30} value={f.lookingLabel} onChange={(v) => upd("form", { lookingLabel: v })} />
        <div className="fd">
          <span className="fd-label">Choices · {f.options.length}</span>
          <ItemList
            items={f.options}
            onChange={(l) => upd("form", { options: l })}
            addLabel="Add choice"
            canAdd={f.options.length < 10}
            canDelete={f.options.length > 1}
            makeNew={() => ({ id: uid(), label: "" })}
            summary={(o) => ({ thumb: <Send size={18} />, title: o.label || "New choice", subtitle: "Dropdown choice" })}
            editor={(o, pt) => <Field label="Choice" max={40} value={o.label} onChange={(v) => pt({ label: v })} />}
          />
        </div>
        <h4 className="sx-sub">Bottom of the form</h4>
        <Field label="Privacy line" as="textarea" rows={2} max={140} value={f.privacy} onChange={(v) => upd("form", { privacy: v })} />
        <Field label="Send button text" max={24} value={f.button} onChange={(v) => upd("form", { button: v })} />
        <p className="fd-note">Enquiries sent through this form arrive in the Bookings area. Only the wording is edited here.</p>
      </>
    ),

    quick: (
      <>
        <Field label="Small heading" caps max={40} value={p.quick.eyebrow} onChange={(v) => upd("quick", { eyebrow: v })} />
        <Field label="Title" max={60} value={p.quick.title} onChange={(v) => upd("quick", { title: v })} />
        <div className="fd-row">
          <Field label="Button text" max={24} hint="Leave empty to hide" value={p.quick.button} onChange={(v) => upd("quick", { button: v })} />
          <Field label="Button link" max={200} placeholder="https://wa.me/919876543210" value={p.quick.href} onChange={(v) => upd("quick", { href: v })} />
        </div>
      </>
    ),
  };

  return (
    <Layout>
      <div className="ed-page sx">
        <EditorToolbar
          crumb="Contact" title="Contact page editor"
          dirty={ed.dirty} saving={ed.saving} savedText={ago}
          onSave={ed.save} onReset={ed.reset} siteUrl={`${SITE}/contact`}
        />

        <div className="sx-grid">
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

          <LivePreview url="saanjhbeauty.in/contact" active={ed.active}>
            {(device) => <ContactPreview d={p} bottom={bottom} device={device} />}
          </LivePreview>
        </div>

        {ed.toast && <div className="ed-toast sx-toast" role="status">{ed.toast}</div>}
      </div>
    </Layout>
  );
}
