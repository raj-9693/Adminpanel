import { ImageIcon } from './EditorIcons';

export function TextField({ label, value, onChange, placeholder }) {
  return (
    <label className="ed-field">
      <span className="ed-label">{label}</span>
      <input
        className="ed-input" value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <label className="ed-field">
      <span className="ed-label">{label}</span>
      <textarea
        className="ed-input ed-textarea" rows={rows} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/* Single image (Hero) – file name dikhata hai, "Replace" par click se naya image */
export function ImageUpload({ label, fileName, onFiles }) {
  return (
    <div className="ed-field">
      <span className="ed-label">{label}</span>
      <label className="ed-upload">
        <span className="ed-upload__icon"><ImageIcon /></span>
        <span className="ed-upload__name">{fileName}</span>
        <span className="ed-upload__action">Replace</span>
        <input type="file" accept="image/*" hidden onChange={(e) => onFiles(e.target.files)} />
      </label>
    </div>
  );
}
