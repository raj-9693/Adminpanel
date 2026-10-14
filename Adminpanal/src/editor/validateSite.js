const blank = (v) => !String(v ?? '').trim();

function bottomErrors(b, add) {
  if (blank(b.cta.title)) add('bottom', 'Call-to-action title is required.');
  if (blank(b.cta.button)) add('bottom', 'Call-to-action button text is required.');
  if (b.footer.email && !/^\S+@\S+\.\S+$/.test(b.footer.email.trim())) add('bottom', 'Footer email does not look right.');
}

const collect = () => {
  const e = {};
  return [e, (id, msg) => { (e[id] = e[id] || []).push(msg); }];
};

export function validateHome({ page: p, bottom }) {
  const [e, add] = collect();
  if (blank(p.hero.title)) add('hero', 'Main title is required.');
  if (blank(p.hero.primaryCta)) add('hero', 'Primary button text is required.');
  p.stats.items.forEach((s, i) => blank(s.value) && add('stats', `Statistic ${i + 1} needs a number.`));
  p.basics.items.forEach((s, i) => blank(s.title) && add('basics', `Service ${i + 1} needs a title.`));
  p.glimpse.items.forEach((g, i) => !g.image && add('glimpse', `Bride photo ${i + 1} needs an image.`));
  p.reviews.items.forEach((r, i) => (blank(r.quote) || blank(r.name)) && add('reviews', `Note ${i + 1} needs a quote and a name.`));
  bottomErrors(bottom, add);
  return e;
}

export function validateGallery({ page: p, bottom }) {
  const [e, add] = collect();
  if (blank(p.intro.title)) add('intro', 'Page title is required.');
  if (blank(p.filters.allLabel)) add('filters', 'The “all” tab needs a name.');
  p.filters.categories.forEach((c, i) => blank(c.label) && add('filters', `Category ${i + 1} needs a name.`));
  p.items.forEach((it, i) => {
    if (!it.published) return;
    if (blank(it.title)) add('items', `Look ${i + 1} needs a title.`);
    if (!it.image) add('items', `“${it.title || `Look ${i + 1}`}” needs an image (or hide it).`);
  });
  bottomErrors(bottom, add);
  return e;
}

export function validateAbout({ page: p, bottom }) {
  const [e, add] = collect();
  if (blank(p.hero.title)) add('hero', 'Page title is required.');
  if (blank(p.story.title)) add('story', 'Story title is required.');
  if (!p.story.image) add('story', 'Add a portrait photo.');
  p.numbers.items.forEach((n, i) => blank(n.value) && add('numbers', `Number ${i + 1} is empty.`));
  p.process.items.forEach((s, i) => blank(s.title) && add('process', `Step ${i + 1} needs a title.`));
  p.travel.cities.forEach((c, i) => blank(c.label) && add('travel', `City ${i + 1} is empty.`));
  p.kit.brands.forEach((b, i) => blank(b.label) && add('kit', `Brand ${i + 1} is empty.`));
  bottomErrors(bottom, add);
  return e;
}
