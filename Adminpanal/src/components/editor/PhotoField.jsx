import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ImageField from "./ImageField.jsx";
import Field from "./Field.jsx";
import { compressImage } from "../../editor/imageTools.js";
import { getSiteContent } from "../../api/siteContent.js";

// "Choose from gallery" — Gallery editor me jo photos save hain unme se chuno.
function GalleryPicker({ onClose, onPick }) {
  const [imgs, setImgs] = useState(null);
  useEffect(() => {
    getSiteContent("gallery")
      .then(({ page }) => setImgs(page.items.filter((i) => i.image).map((i) => ({ id: i.id, src: i.image, name: i.title }))))
      .catch(() => setImgs([]));
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="sx-modal" role="dialog" aria-modal="true" aria-label="Choose from gallery" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sx-modal-card">
        <div className="sx-modal-head">
          <b>Choose from gallery</b>
          <button type="button" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        {imgs === null && <p className="fd-note">Loading…</p>}
        {imgs && !imgs.length && <p className="fd-note">No gallery photos yet. Add photos in the Gallery editor first.</p>}
        <div className="sx-pick">
          {imgs?.map((i) => (
            <button key={i.id} type="button" onClick={() => onPick(i)} title={i.name}>
              <img src={i.src} alt={i.name} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Upload + "paste image link" + gallery picker, sab ek jagah.
 * src / name = abhi ki image, onChange({ src, name }).
 * Upload ki hui photo automatically optimise (resize) hoti hai.
 */
export default function PhotoField({ label, src, name, onChange, hint }) {
  const [busy, setBusy] = useState(false);
  const [picker, setPicker] = useState(false);
  const isData = src?.startsWith("data:");

  const take = async (v) => {
    if (!v) return onChange({ src: "", name: "" });
    setBusy(true);
    try {
      onChange({ src: await compressImage(v.file), name: v.name });
    } catch {
      onChange({ src: v.src, name: v.name });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fd">
      <ImageField
        label={label}
        hint={hint}
        value={src ? { src, name: name || (isData ? "Uploaded photo" : "Image link") } : null}
        onChange={take}
        onPickGallery={() => setPicker(true)}
      />
      {busy && <p className="fd-note">Optimising photo…</p>}
      <Field
        label="Or paste an image link"
        placeholder="https://…"
        value={isData ? "" : src || ""}
        onChange={(v) => onChange({ src: v.trim(), name: "" })}
      />
      {picker && <GalleryPicker onClose={() => setPicker(false)} onPick={(i) => { onChange({ src: i.src, name: i.name }); setPicker(false); }} />}
    </div>
  );
}
