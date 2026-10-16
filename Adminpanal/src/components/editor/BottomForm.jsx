import { Link2 } from "lucide-react";
import Field from "./Field.jsx";
import ItemList from "./ItemList.jsx";
import { uid } from "../../editor/imageTools.js";

// Bottom section (CTA + footer) ke form-parts. Sirf "Website → Bottom" page inhe use karta hai.
// data = poora bottom object { cta, footer },  onChange(newData)
// edit(sectionId, previewId, node) = preview ko us hisse tak le jaane ke liye (optional)

const noEdit = (_s, _k, node) => node;

export function CtaFields({ data, onChange }) {
  const { cta } = data;
  const set = (patch) => onChange({ ...data, cta: { ...cta, ...patch } });
  return (
    <>
      <Field label="Small heading above" caps max={50} value={cta.eyebrow} onChange={(v) => set({ eyebrow: v })} />
      <Field label="Title" as="textarea" rows={2} max={90} hint="Press Enter for a line break" value={cta.title} onChange={(v) => set({ title: v })} />
      <Field label="Text" as="textarea" rows={3} max={220} value={cta.text} onChange={(v) => set({ text: v })} />
      <Field label="Button text" max={30} value={cta.button} onChange={(v) => set({ button: v })} />
    </>
  );
}

export function BrandFields({ data, onChange, edit = noEdit }) {
  const f = data.footer;
  const set = (patch) => onChange({ ...data, footer: { ...f, ...patch } });
  return (
    <>
      {edit("brand", "f-brand", (
        <>
          <Field label="Brand name" max={30} value={f.brand} onChange={(v) => set({ brand: v })} />
          <Field label="Short description" as="textarea" rows={2} max={140} value={f.blurb} onChange={(v) => set({ blurb: v })} />
        </>
      ))}
      {edit("brand", "f-links", (
        <>
          <Field label="Quick links heading" max={24} value={f.linksTitle} onChange={(v) => set({ linksTitle: v })} />
          <div className="fd">
            <span className="fd-label">Quick links · {f.links.length}</span>
            <ItemList
              items={f.links}
              onChange={(l) => set({ links: l })}
              addLabel="Add link"
              canAdd={f.links.length < 6}
              canDelete={f.links.length > 1}
              makeNew={() => ({ id: uid(), label: "" })}
              summary={(l) => ({ thumb: <Link2 size={18} />, title: l.label || "New link", subtitle: "Footer link" })}
              editor={(l, p) => <Field label="Link text" max={30} value={l.label} onChange={(v) => p({ label: v })} />}
            />
          </div>
        </>
      ))}
    </>
  );
}

export function ContactFields({ data, onChange }) {
  const f = data.footer;
  const set = (patch) => onChange({ ...data, footer: { ...f, ...patch } });
  return (
    <>
      <Field label="Heading" max={24} value={f.visitTitle} onChange={(v) => set({ visitTitle: v })} />
      <Field label="Address" as="textarea" rows={2} max={120} hint="Press Enter for a second line" value={f.address} onChange={(v) => set({ address: v })} />
      <div className="fd-row">
        <Field label="Email" type="email" max={60} value={f.email} onChange={(v) => set({ email: v })} />
        <Field label="Phone" max={24} value={f.phone} onChange={(v) => set({ phone: v })} />
      </div>
    </>
  );
}

export function SocialFields({ data, onChange, edit = noEdit }) {
  const f = data.footer;
  const set = (patch) => onChange({ ...data, footer: { ...f, ...patch } });
  return (
    <>
      <Field label="Heading" max={24} value={f.followTitle} onChange={(v) => set({ followTitle: v })} />
      <Field label="Short line" as="textarea" rows={2} max={100} value={f.followText} onChange={(v) => set({ followText: v })} />
      <Field label="Instagram link" placeholder="https://instagram.com/…" value={f.instagram} onChange={(v) => set({ instagram: v })} />
      <div className="fd-row">
        <Field label="Facebook link" placeholder="https://facebook.com/…" value={f.facebook} onChange={(v) => set({ facebook: v })} />
        <Field label="YouTube link" placeholder="https://youtube.com/…" value={f.youtube} onChange={(v) => set({ youtube: v })} />
      </div>
      {edit("social", "f-legal", (
        <div className="fd-row">
          <Field label="Copyright line" max={80} value={f.copyright} onChange={(v) => set({ copyright: v })} />
          <Field label="Closing line" max={60} value={f.madeWith} onChange={(v) => set({ madeWith: v })} />
        </div>
      ))}
    </>
  );
}
