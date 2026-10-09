import { TextField, TextArea, ImageUpload } from './Field';
import { CloseIcon, UploadIcon } from './EditorIcons';

/* helper: list ke ek item ko update karna */
const patchItem = (data, i, patch) => ({
  ...data,
  items: data.items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)),
});

export function HeroForm({ data, onChange }) {
  const set = (patch) => onChange({ ...data, ...patch });
  const pickImage = (files) =>
    Array.from(files).slice(0, 1).forEach((f) =>
      set({ image: { name: f.name, url: URL.createObjectURL(f) } })
    );

  return (
    <>
      <TextField label="Eyebrow" value={data.eyebrow} onChange={(v) => set({ eyebrow: v })} />
      <TextArea label="Headline" rows={4} value={data.headline} onChange={(v) => set({ headline: v })} />
      <TextArea label="Supporting text" rows={3} value={data.subtext} onChange={(v) => set({ subtext: v })} />
      <TextField label="Primary action" value={data.cta} onChange={(v) => set({ cta: v })} />
      <ImageUpload label="Hero image" fileName={data.image.name} onFiles={pickImage} />
    </>
  );
}

export function StatsForm({ data, onChange }) {
  return (
    <>
      {data.items.map((it, i) => (
        <div className="ed-group" key={i}>
          <p className="ed-group__title">Stat {i + 1}</p>
          <div className="ed-two">
            <TextField label="Number" value={it.value} onChange={(v) => onChange(patchItem(data, i, { value: v }))} />
            <TextField label="Label" value={it.label} onChange={(v) => onChange(patchItem(data, i, { label: v }))} />
          </div>
        </div>
      ))}
    </>
  );
}

export function ServicesForm({ data, onChange }) {
  return (
    <>
      <TextField label="Section heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      {data.items.map((it, i) => (
        <div className="ed-group" key={i}>
          <p className="ed-group__title">Ritual {i + 1}</p>
          <TextField label="Name" value={it.title} onChange={(v) => onChange(patchItem(data, i, { title: v }))} />
          <TextArea label="Description" rows={2} value={it.desc} onChange={(v) => onChange(patchItem(data, i, { desc: v }))} />
          <TextField label="Price" value={it.price} onChange={(v) => onChange(patchItem(data, i, { price: v }))} />
        </div>
      ))}
    </>
  );
}

export function GalleryForm({ data, onChange }) {
  const addImages = (files) =>
    onChange({
      ...data,
      images: [
        ...data.images,
        ...Array.from(files).map((f, i) => ({
          id: `${f.name}-${f.size}-${Date.now()}-${i}`,
          name: f.name,
          url: URL.createObjectURL(f),
        })),
      ],
    });
  const remove = (id) => onChange({ ...data, images: data.images.filter((im) => im.id !== id) });

  return (
    <>
      <TextField label="Section heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />

      <div className="ed-field">
        <span className="ed-label">Celebration images</span>
        <label className="ed-dropzone">
          <UploadIcon />
          <span>Upload images</span>
          <small>PNG or JPG, you can pick more than one</small>
          <input type="file" accept="image/*" multiple hidden onChange={(e) => addImages(e.target.files)} />
        </label>
      </div>

      <div className="ed-thumbs">
        {data.images.map((im) => (
          <div className="ed-thumb" key={im.id}>
            <img src={im.url} alt={im.name} />
            <button type="button" className="ed-thumb__x" aria-label={`Remove ${im.name}`} onClick={() => remove(im.id)}>
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export function ReviewsForm({ data, onChange }) {
  return (
    <>
      <TextField label="Section heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      {data.items.map((it, i) => (
        <div className="ed-group" key={i}>
          <p className="ed-group__title">Review {i + 1}</p>
          <TextField label="Bride name" value={it.name} onChange={(v) => onChange(patchItem(data, i, { name: v }))} />
          <TextArea label="Her note" rows={3} value={it.quote} onChange={(v) => onChange(patchItem(data, i, { quote: v }))} />
        </div>
      ))}
    </>
  );
}

export function ValuesForm({ data, onChange }) {
  return (
    <>
      <TextField label="Section heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      {data.items.map((it, i) => (
        <div className="ed-group" key={i}>
          <p className="ed-group__title">Value {i + 1}</p>
          <TextField label="Title" value={it.title} onChange={(v) => onChange(patchItem(data, i, { title: v }))} />
          <TextArea label="Description" rows={2} value={it.text} onChange={(v) => onChange(patchItem(data, i, { text: v }))} />
        </div>
      ))}
    </>
  );
}

export const formMap = {
  hero: HeroForm, stats: StatsForm, services: ServicesForm,
  gallery: GalleryForm, reviews: ReviewsForm, values: ValuesForm,
};
