// Save se pehle check. Return: { sectionId: ["message", ...] }
export default function validateReviews(d) {
  const e = {};
  const add = (sec, msg) => { (e[sec] = e[sec] || []).push(msg); };

  if (!d.hero.title.trim()) add("hero", "Title is required.");
  if (!d.hero.intro.trim()) add("hero", "Intro text is required.");

  const s = d.summary;
  if (!s.auto) {
    const a = Number(s.average);
    if (!(a >= 0 && a <= 5)) add("summary", "Average must be between 0 and 5.");
  }
  if (!(Number(s.total) >= 0)) add("summary", "Total brides must be 0 or more.");
  [5, 4, 3, 2, 1].forEach((n) => {
    const v = Number(s.distribution[n]);
    if (!Number.isInteger(v) || v < 0) add("summary", `${n}-star count must be a whole number (0 or more).`);
  });

  d.testimonials.forEach((t, i) => {
    if (!t.name.trim() || !t.quote.trim()) add("testimonials", `Testimonial ${i + 1}: name and quote are required.`);
  });
  d.messages.forEach((m, i) => {
    if (!m.name.trim() || !m.text.trim()) add("messages", `Message ${i + 1}: name and message are required.`);
  });
  d.values.forEach((v, i) => {
    if (!v.title.trim()) add("values", `Value ${i + 1}: title is required.`);
  });
  if (!d.cta.title.trim()) add("cta", "CTA title is required.");
  return e;
}
