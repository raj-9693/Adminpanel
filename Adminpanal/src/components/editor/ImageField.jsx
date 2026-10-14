import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

const MAX = 5 * 1024 * 1024;
const OK = ["image/jpeg", "image/png", "image/webp"];
const size = (b) => (b ? `${(b / 1048576).toFixed(1)} MB` : "");

// value = { src, name, size } ya null.  onChange(value | null). File backend ko save ke waqt jaati hai (value.file).
export default function ImageField({ label, value, onChange, onPickGallery, hint }) {
  const input = useRef(null);
  const [err, setErr] = useState("");
  const [drag, setDrag] = useState(false);

  const take = (file) => {
    if (!file) return;
    if (!OK.includes(file.type)) return setErr("Please use a JPG, PNG or WebP image.");
    if (file.size > MAX) return setErr("Image must be under 5 MB.");
    setErr("");
    onChange({ src: URL.createObjectURL(file), name: file.name, size: file.size, file });
  };
  const pick = () => input.current?.click();
  const fileName = value?.name || (value?.src ? decodeURIComponent(value.src.split("/").pop().split("?")[0]) : "");

  return (
    <div className="fd">
      {label && <span className="fd-label">{label}</span>}
      <input ref={input} type="file" accept={OK.join(",")} hidden onChange={(e) => { take(e.target.files?.[0]); e.target.value = ""; }} />

      {value?.src ? (
        <div className="im-card">
          <img className="im-thumb" src={value.src} alt="" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
          <div className="im-meta">
            <b>{fileName}</b>
            <small>{[value.name?.split(".").pop()?.toUpperCase(), size(value.size)].filter(Boolean).join(" · ") || "Image"}</small>
          </div>
          <button type="button" className="im-replace" onClick={pick}>Replace</button>
        </div>
      ) : (
        <div
          className={`im-drop ${drag ? "over" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files?.[0]); }}
        >
          <ImagePlus size={22} strokeWidth={1.5} />
          <span>Drag a photo here, or</span>
        </div>
      )}

      <div className="im-links">
        <button type="button" onClick={pick}>Upload new</button>
        <button type="button" onClick={onPickGallery || (() => setErr("Media library is not connected yet."))}>Choose from gallery</button>
        {value?.src && <button type="button" className="muted" onClick={() => onChange(null)}>Remove</button>}
      </div>
      {hint && <div className="fd-foot"><span>{hint}</span></div>}
      {err && <em className="fd-err">{err}</em>}
    </div>
  );
}
