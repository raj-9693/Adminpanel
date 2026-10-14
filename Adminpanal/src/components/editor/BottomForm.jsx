import { Link2 } from "lucide-react";
import Field from "./Field.jsx";
import ItemList from "./ItemList.jsx";
import { uid } from "../../editor/imageTools.js";

/**
 * SHARED bottom section (CTA + footer) ka form.
 * Home aur Gallery dono yahi component use karte hain, aur data "bottom" key me alag save hota hai.
 * data = { cta, footer },  onChange(newData)
 */
export default function BottomForm({ data, onChange }) {
  const { cta, footer: f } = data;
  const setCta = (patch) => onChange({ ...data, cta: { ...cta, ...patch } });
  const setF = (patch) => onChange({ ...data, footer: { ...f, ...patch } });

  return (
    <>
      <p className="sx-shared"><Link2 size={15} /> Shared section — it appears at the bottom of every page. Edit it here and Home and Gallery both update.</p>

      <h4 className="sx-sub">Call-to-action</h4>
      <Field label="Small heading above" caps max={50} value={cta.eyebrow} onChange={(v) => setCta({ eyebrow: v })} />
      <Field label="Title" as="textarea" rows={2} max={90} hint="Press Enter for a line break" value={cta.title} onChange={(v) => setCta({ title: v })} />
      <Field label="Text" as="textarea" rows={3} max={220} value={cta.text} onChange={(v) => setCta({ text: v })} />
      <Field label="Button text" max={30} value={cta.button} onChange={(v) => setCta({ button: v })} />

      <h4 className="sx-sub">Footer · brand</h4>
      <div className="fd-row">
        <Field label="Brand name" max={30} value={f.brand} onChange={(v) => setF({ brand: v })} />
        <Field label="Quick links heading" max={24} value={f.linksTitle} onChange={(v) => setF({ linksTitle: v })} />
      </div>
      <Field label="Short description" as="textarea" rows={2} max={140} value={f.blurb} onChange={(v) => setF({ blurb: v })} />
      <div className="fd">
        <span className="fd-label">Quick links · {f.links.length}</span>
        <ItemList
          items={f.links}
          onChange={(l) => setF({ links: l })}
          addLabel="Add link"
          canAdd={f.links.length < 6}
          canDelete={f.links.length > 1}
          makeNew={() => ({ id: uid(), label: "" })}
          summary={(l) => ({ thumb: <Link2 size={18} />, title: l.label || "New link", subtitle: "Footer link" })}
          editor={(l, p) => <Field label="Link text" max={30} value={l.label} onChange={(v) => p({ label: v })} />}
        />
      </div>

      <h4 className="sx-sub">Footer · contact</h4>
      <div className="fd-row">
        <Field label="“Visit us” heading" max={24} value={f.visitTitle} onChange={(v) => setF({ visitTitle: v })} />
        <Field label="Phone" max={24} value={f.phone} onChange={(v) => setF({ phone: v })} />
      </div>
      <Field label="Address" as="textarea" rows={2} max={120} hint="Press Enter for a second line" value={f.address} onChange={(v) => setF({ address: v })} />
      <Field label="Email" type="email" max={60} value={f.email} onChange={(v) => setF({ email: v })} />

      <h4 className="sx-sub">Footer · social & legal</h4>
      <div className="fd-row">
        <Field label="“Stay close” heading" max={24} value={f.followTitle} onChange={(v) => setF({ followTitle: v })} />
        <Field label="Short line" max={80} value={f.followText} onChange={(v) => setF({ followText: v })} />
      </div>
      <div className="fd-row">
        <Field label="Instagram link" placeholder="https://instagram.com/…" value={f.instagram} onChange={(v) => setF({ instagram: v })} />
        <Field label="Facebook link" placeholder="https://facebook.com/…" value={f.facebook} onChange={(v) => setF({ facebook: v })} />
      </div>
      <Field label="YouTube link" placeholder="https://youtube.com/…" value={f.youtube} onChange={(v) => setF({ youtube: v })} />
      <div className="fd-row">
        <Field label="Copyright line" max={80} value={f.copyright} onChange={(v) => setF({ copyright: v })} />
        <Field label="Closing line" max={60} value={f.madeWith} onChange={(v) => setF({ madeWith: v })} />
      </div>
    </>
  );
}
