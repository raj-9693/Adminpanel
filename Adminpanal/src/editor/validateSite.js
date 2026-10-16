// Har validate*(page) us page ka data leta hai aur { sectionId: [messages] } lautata hai.
const blank = (v) => !String(v ?? '').trim();
const collect = () => {
  const e = {};
  return [e, (id, msg) => { (e[id] = e[id] || []).push(msg); }];
};

export function validateHome(p) {
  const [e, add] = collect();
  if (blank(p.hero.title)) add('hero', 'Main title is required.');
  if (blank(p.hero.primaryCta)) add('hero', 'Primary button text is required.');
  p.stats.items.forEach((s, i) => blank(s.value) && add('stats', `Statistic ${i + 1} needs a number.`));
  p.basics.items.forEach((s, i) => blank(s.title) && add('basics', `Service ${i + 1} needs a title.`));
  p.glimpse.items.forEach((g, i) => !g.image && add('glimpse', `Bride photo ${i + 1} needs an image.`));
  p.reviews.items.forEach((r, i) => (blank(r.quote) || blank(r.name)) && add('reviews', `Note ${i + 1} needs a quote and a name.`));
  return e;
}

export function validateGallery(p) {
  const [e, add] = collect();
  if (blank(p.intro.title)) add('intro', 'Page title is required.');
  if (blank(p.filters.allLabel)) add('filters', 'The “all” tab needs a name.');
  p.filters.categories.forEach((c, i) => blank(c.label) && add('filters', `Category ${i + 1} needs a name.`));
  p.items.forEach((it, i) => {
    if (!it.published) return;
    if (blank(it.title)) add('items', `Look ${i + 1} needs a title.`);
    if (!it.image) add('items', `“${it.title || `Look ${i + 1}`}” needs an image (or hide it).`);
  });
  return e;
}

export function validateAbout(p) {
  const [e, add] = collect();
  if (blank(p.hero.title)) add('hero', 'Page title is required.');
  if (blank(p.story.title)) add('story', 'Story title is required.');
  if (!p.story.image) add('story', 'Add a portrait photo.');
  p.numbers.items.forEach((n, i) => blank(n.value) && add('numbers', `Number ${i + 1} is empty.`));
  p.process.items.forEach((s, i) => blank(s.title) && add('process', `Step ${i + 1} needs a title.`));
  p.travel.cities.forEach((c, i) => blank(c.label) && add('travel', `City ${i + 1} is empty.`));
  p.kit.brands.forEach((b, i) => blank(b.label) && add('kit', `Brand ${i + 1} is empty.`));
  return e;
}

export function validateBottom(b) {
  const [e, add] = collect();
  if (blank(b.cta.title)) add('cta', 'Call-to-action title is required.');
  if (blank(b.cta.button)) add('cta', 'Call-to-action button text is required.');
  if (blank(b.footer.brand)) add('brand', 'Brand name is required.');
  b.footer.links.forEach((l, i) => blank(l.label) && add('brand', `Quick link ${i + 1} is empty.`));
  if (b.footer.email && !/^\S+@\S+\.\S+$/.test(b.footer.email.trim())) add('contact', 'Email does not look right.');
  return e;
}

export function validateServices(p) {
  const [e, add] = collect();
  if (blank(p.hero.title)) add('hero', 'Page title is required.');
  p.packages.items.forEach((x, i) => {
    if (blank(x.title)) add('packages', `Package ${i + 1} needs a title.`);
    if (blank(x.price)) add('packages', `“${x.title || `Package ${i + 1}`}” needs a price.`);
  });
  p.compare.rows.forEach((r, i) => blank(r.label) && add('compare', `Row ${i + 1} needs a name.`));
  p.faq.items.forEach((f, i) => (blank(f.q) || blank(f.a)) && add('faq', `Question ${i + 1} needs both a question and an answer.`));
  return e;
}

export function validateReviews(d) {
  const [e, add] = collect();
  if (blank(d.hero.title)) add('hero', 'Title is required.');
  if (blank(d.hero.intro)) add('hero', 'Intro text is required.');
  const s = d.summary;
  if (!s.auto && !(Number(s.average) >= 0 && Number(s.average) <= 5)) add('summary', 'Average must be between 0 and 5.');
  if (!(Number(s.total) >= 0)) add('summary', 'Total brides must be 0 or more.');
  [5, 4, 3, 2, 1].forEach((n) => {
    const v = Number(s.distribution[n]);
    if (!Number.isInteger(v) || v < 0) add('summary', `${n}-star count must be a whole number (0 or more).`);
  });
  d.testimonials.forEach((t, i) => (blank(t.name) || blank(t.quote)) && add('testimonials', `Testimonial ${i + 1}: name and quote are required.`));
  d.messages.forEach((m, i) => (blank(m.name) || blank(m.text)) && add('messages', `Message ${i + 1}: name and message are required.`));
  d.values.forEach((v, i) => blank(v.title) && add('values', `Value ${i + 1}: title is required.`));
  return e;
}

export function validateContact(p) {
  const [e, add] = collect();
  if (blank(p.hero.title)) add('hero', 'Page title is required.');
  p.reach.items.forEach((c, i) => (blank(c.label) || blank(c.value)) && add('reach', `Card ${i + 1} needs a label and a value.`));
  if (blank(p.map.title)) add('map', 'Map title is required.');
  if (blank(p.form.title)) add('form', 'Form title is required.');
  if (blank(p.form.button)) add('form', 'Send button text is required.');
  p.form.options.forEach((o, i) => blank(o.label) && add('form', `Option ${i + 1} is empty.`));
  return e;
}

export function validateBooking(p) {
  const [e, add] = collect();
  if (blank(p.hero.title)) add('hero', 'Page title is required.');
  p.steps.forEach((s, i) => (blank(s.tab) || blank(s.title)) && add('steps', `Step ${i + 1} needs a tab name and a title.`));
  p.services.forEach((s, i) => (blank(s.title) || blank(s.price)) && add('services', `Service ${i + 1} needs a name and a price.`));
  if (blank(p.summary.button)) add('summary', 'Confirm button text is required.');
  return e;
}
